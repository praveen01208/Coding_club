const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const todayStr = () =>
  new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

// POST /api/attendance/mark  — student submits OTP to mark attendance
router.post('/mark', protect, async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ message: 'OTP is required.' });

    const session = await Session.findOne({ active: true, expiresAt: { $gt: new Date() } });
    if (!session) return res.status(400).json({ message: 'No active session. Ask admin to generate OTP.' });
    if (session.otp !== otp.trim())
      return res.status(400).json({ message: 'Invalid OTP. Please check and try again.' });

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });

    const today = todayStr();
    const existing = await Attendance.findOne({ studentId: req.user.id, sessionDate: today });
    if (existing)
      return res.status(400).json({ message: 'Attendance already marked for today.' });

    const record = new Attendance({
      studentId: req.user.id,
      studentName: student.name,
      username: student.username,
      group: student.group,
      sessionId: session._id,
      sessionDate: today,
    });
    await record.save();

    res.json({
      record: {
        name: student.name,
        group: student.group,
        date: today,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      },
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Attendance already marked for today.' });
    console.error('Mark attendance error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/attendance/today  — admin: all today's records (optionally filtered by group)
router.get('/today', protect, adminOnly, async (req, res) => {
  try {
    const query = { sessionDate: todayStr() };
    if (req.query.group) query.group = Number(req.query.group);
    const records = await Attendance.find(query).sort({ markedAt: -1 });
    res.json({ records });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/attendance/group-summary  — admin: per-group present/absent/% for today
router.get('/group-summary', protect, adminOnly, async (req, res) => {
  try {
    const today = todayStr();
    const [students, presentRecords] = await Promise.all([
      User.find({ role: 'student', active: true }),
      Attendance.find({ sessionDate: today }),
    ]);

    const presentSet = new Set(presentRecords.map((r) => r.studentId.toString()));
    const groupMap = {};

    for (const s of students) {
      const g = s.group || 0;
      if (!groupMap[g]) groupMap[g] = { total: 0, present: 0 };
      groupMap[g].total++;
      if (presentSet.has(s._id.toString())) groupMap[g].present++;
    }

    const summary = Object.entries(groupMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([group, data]) => ({
        group: Number(group),
        totalMembers: data.total,
        present: data.present,
        absent: data.total - data.present,
        percentage: data.total > 0 ? Math.round((data.present / data.total) * 100) : 0,
      }));

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/attendance/my-history  — student: their own last 30 records
router.get('/my-history', protect, async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.user.id })
      .sort({ markedAt: -1 })
      .limit(30);
    res.json({ records });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/attendance/export  — admin: download Excel with 3 sheets
router.get('/export', protect, adminOnly, async (req, res) => {
  try {
    const today = todayStr();
    const [presentRecords, allStudents] = await Promise.all([
      Attendance.find({ sessionDate: today }).sort({ group: 1, studentName: 1 }),
      User.find({ role: 'student', active: true }).sort({ group: 1, name: 1 }),
    ]);

    const presentSet = new Set(presentRecords.map((r) => r.studentId.toString()));
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CodeClub Magnus';

    // Sheet 1 — Individual Records (present only)
    const s1 = workbook.addWorksheet('Present Records');
    s1.columns = [
      { header: '#', key: 'no', width: 6 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Username', key: 'username', width: 18 },
      { header: 'Group', key: 'group', width: 10 },
      { header: 'Time', key: 'time', width: 14 },
      { header: 'Status', key: 'status', width: 12 },
    ];
    presentRecords.forEach((r, i) => {
      s1.addRow({
        no: i + 1,
        name: r.studentName,
        username: r.username,
        group: `Group ${r.group}`,
        time: new Date(r.markedAt).toLocaleTimeString('en-IN'),
        status: 'Present',
      });
    });

    // Sheet 2 — Full Attendance (all students)
    const s2 = workbook.addWorksheet('Full Attendance');
    s2.columns = [
      { header: '#', key: 'no', width: 6 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Username', key: 'username', width: 18 },
      { header: 'Group', key: 'group', width: 10 },
      { header: 'Status', key: 'status', width: 12 },
    ];
    allStudents.forEach((s, i) => {
      const row = s2.addRow({
        no: i + 1,
        name: s.name,
        username: s.username,
        group: `Group ${s.group}`,
        status: presentSet.has(s._id.toString()) ? 'Present' : 'Absent',
      });
      if (!presentSet.has(s._id.toString())) {
        row.getCell('status').font = { color: { argb: 'FFFF6B6B' } };
      }
    });

    // Sheet 3 — Group Summary
    const s3 = workbook.addWorksheet('Group Summary');
    s3.columns = [
      { header: 'Group', key: 'group', width: 12 },
      { header: 'Members', key: 'members', width: 12 },
      { header: 'Present', key: 'present', width: 12 },
      { header: 'Absent', key: 'absent', width: 12 },
      { header: 'Attendance %', key: 'pct', width: 15 },
    ];
    const gMap = {};
    for (const s of allStudents) {
      if (!gMap[s.group]) gMap[s.group] = { total: 0, present: 0 };
      gMap[s.group].total++;
      if (presentSet.has(s._id.toString())) gMap[s.group].present++;
    }
    Object.entries(gMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([g, d]) => {
        s3.addRow({
          group: `Group ${g}`,
          members: d.total,
          present: d.present,
          absent: d.total - d.present,
          pct: `${Math.round((d.present / d.total) * 100)}%`,
        });
      });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=CodeClub_Attendance_${today.replace(/\//g, '-')}.xlsx`
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ message: 'Export failed.' });
  }
});

module.exports = router;
