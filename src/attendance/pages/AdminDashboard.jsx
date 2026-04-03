import React, { useState, useEffect, useRef } from 'react';
import API from '../utils/api';

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState('session');
  const [session, setSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [stats, setStats] = useState({ total: 0, groups: 0 });
  const [records, setRecords] = useState([]);
  const [groupSummary, setGroupSummary] = useState([]);
  const [students, setStudents] = useState([]);
  const [filterGroup, setFilterGroup] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', username: '', password: '', group: '' });
  const [addMsg, setAddMsg] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    loadSession();
    loadRecords();
    loadGroupSummary();
    loadStudents();
  }, []);

  useEffect(() => {
    if (session && session.active) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const left = Math.max(0, new Date(session.session.expiresAt) - Date.now());
        setTimeLeft(left);
        if (left === 0) { clearInterval(timerRef.current); setSession(null); }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [session]);

  const loadSession = async () => {
    try {
      const { data } = await API.get('/sessions/active-admin');
      setSession(data);
      if (data.active) setTimeLeft(Math.max(0, new Date(data.session.expiresAt) - Date.now()));
    } catch {}
  };

  const loadRecords = async () => {
    try {
      const params = filterGroup ? { group: filterGroup } : {};
      const { data } = await API.get('/attendance/today', { params });
      setRecords(data.records || []);
      const groups = new Set((data.records || []).map(r => r.group)).size;
      setStats({ total: data.records?.length || 0, groups });
    } catch {}
  };

  const loadGroupSummary = async () => {
    try {
      const { data } = await API.get('/attendance/group-summary');
      setGroupSummary(data.summary || []);
    } catch {}
  };

  const loadStudents = async (g) => {
    try {
      const params = g ? { group: g } : {};
      const { data } = await API.get('/auth/students', { params });
      setStudents(data.students || []);
    } catch {}
  };

  const generateOTP = async () => {
    try {
      const { data } = await API.post('/sessions/generate', { title: sessionTitle || 'Coding Club Session', durationMinutes: 5 });
      setSession({ active: true, session: data.session });
      loadRecords();
    } catch (err) { alert(err.response?.data?.message || 'Failed to generate OTP.'); }
  };

  const revokeOTP = async () => {
    if (!window.confirm('Revoke active session?')) return;
    try {
      await API.post('/sessions/revoke');
      setSession({ active: false });
      clearInterval(timerRef.current);
    } catch {}
  };

  const exportExcel = async () => {
    try {
      const res = await API.get('/attendance/export', { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CodeClub_Attendance_${new Date().toLocaleDateString('en-IN').replace(/\//g, '-')}.xlsx`;
      a.click();
    } catch { alert('Export failed.'); }
  };

  const addStudent = async () => {
    setAddMsg('');
    const { name, username, password, group } = newStudent;
    if (!name || !username || !password || !group) { setAddMsg('All fields are required.'); return; }
    try {
      await API.post('/auth/register', { name, username, password, group: Number(group) });
      setAddMsg('ok:Student added successfully!');
      setNewStudent({ name: '', username: '', password: '', group: '' });
      loadStudents();
    } catch (err) { setAddMsg(err.response?.data?.message || 'Failed to add student.'); }
  };

  const removeStudent = async (id, name) => {
    if (!window.confirm(`Deactivate ${name}?`)) return;
    try { await API.delete(`/auth/students/${id}`); loadStudents(); } catch {}
  };

  const fmt = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const totalMs = 5 * 60 * 1000;
  const timerPct = session?.active ? Math.min(100, (timeLeft / totalMs) * 100) : 0;
  const timerColor = timerPct < 25 ? '#ff6b6b' : timerPct < 50 ? '#ffd43b' : 'var(--accent)';

  return (
    <div className="wrap animate">
      {/* Header */}
      <div className="header">
        <div className="logo" style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 400 }}>Attendance Admin</div>
        <div className="user-badge" onClick={onLogout}>
          <div className="avatar">A</div>
          <span>Admin</span>
          <span style={{ fontSize: 10, opacity: 0.5 }}>logout</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['session', 'records', 'groups', 'students'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`}
            onClick={() => { setTab(t); if (t === 'records') loadRecords(); if (t === 'groups') loadGroupSummary(); if (t === 'students') loadStudents(); }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ─── SESSION TAB ─── */}
      {tab === 'session' && (
        <div className="animate">
          <div className="stats">
            <div className="stat"><div className="stat-val accent">{stats.total}</div><div className="stat-lbl">Present today</div></div>
            <div className="stat"><div className="stat-val success">{stats.groups}</div><div className="stat-lbl">Active groups</div></div>
            <div className="stat">
              <div className="stat-val warn">{session?.active ? fmt(timeLeft) : '—'}</div>
              <div className="stat-lbl">OTP time left</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><div className="dot" />Session OTP</div>
            <div className="field" style={{ marginBottom: '1rem' }}>
              <label>Session title (optional)</label>
              <input type="text" placeholder="e.g. React Workshop Day 1" value={sessionTitle} onChange={e => setSessionTitle(e.target.value)} />
            </div>

            {session?.active && (
              <>
                <div className="otp-display">{session.session.otp}</div>
                <div className="otp-meta">
                  {session.session.title} — Expires in <strong>{fmt(timeLeft)}</strong>
                </div>
                <div className="timer-bar-wrap">
                  <div className="timer-bar" style={{ width: `${timerPct}%`, background: timerColor }} />
                </div>
              </>
            )}

            <div className="btn-row">
              <button className="btn btn-primary" onClick={generateOTP}>
                {session?.active ? 'Regenerate OTP' : 'Generate OTP'}
              </button>
              {session?.active && (
                <button className="btn btn-danger" onClick={revokeOTP} style={{ flex: 0, padding: '11px 20px' }}>Revoke</button>
              )}
            </div>
            {!session?.active && (
              <div className="msg msg-info" style={{ marginTop: '1rem' }}>No active session. Generate an OTP to allow students to mark attendance.</div>
            )}
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 500, marginBottom: 3 }}>Export today's attendance</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Downloads Excel with 3 sheets: Individual, Group Summary, Log</div>
            </div>
            <button className="export-btn" onClick={exportExcel}>
              ↓ Export Excel
            </button>
          </div>
        </div>
      )}

      {/* ─── RECORDS TAB ─── */}
      {tab === 'records' && (
        <div className="animate">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>{records.length} records today</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <select value={filterGroup} onChange={e => { setFilterGroup(e.target.value); setTimeout(loadRecords, 0); }}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }}>
                <option value="">All groups</option>
                {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Group {i+1}</option>)}
              </select>
              <button className="export-btn" onClick={exportExcel} style={{ padding: '7px 14px', fontSize: 12 }}>↓ Export</button>
            </div>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>#</th><th>Name</th><th>Group</th><th>Time</th><th>Status</th></tr></thead>
              <tbody>
                {records.length === 0
                  ? <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>No records yet today</td></tr>
                  : records.map((r, i) => (
                    <tr key={r._id}>
                      <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 500 }}>{r.studentName}</td>
                      <td><span className="badge badge-group">Group {r.group}</span></td>
                      <td style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{new Date(r.markedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                      <td><span className="badge badge-present">Present</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── GROUPS TAB ─── */}
      {tab === 'groups' && (
        <div className="animate">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="export-btn" onClick={exportExcel}>↓ Export Excel</button>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Group</th><th>Members</th><th>Present</th><th>Absent</th><th>Attendance %</th></tr></thead>
              <tbody>
                {groupSummary.map(g => (
                  <tr key={g.group}>
                    <td><span className="badge badge-group">Group {g.group}</span></td>
                    <td>{g.totalMembers}</td>
                    <td style={{ color: 'var(--accent2)', fontWeight: 500 }}>{g.present}</td>
                    <td style={{ color: 'var(--danger)' }}>{g.absent}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-wrap" style={{ flex: 1, minWidth: 60 }}>
                          <div className="progress-fill" style={{ width: `${g.percentage}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', minWidth: 34 }}>{g.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── STUDENTS TAB ─── */}
      {tab === 'students' && (
        <div className="animate">
          <div className="card">
            <div className="card-title"><div className="dot" />Add new student</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Full name</label>
                <input type="text" placeholder="Pradeep Kumar" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Username</label>
                <input type="text" placeholder="pradeep_k" value={newStudent.username} onChange={e => setNewStudent({ ...newStudent, username: e.target.value })} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Password</label>
                <input type="text" placeholder="pass123" value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Group (1–12)</label>
                <select value={newStudent.group} onChange={e => setNewStudent({ ...newStudent, group: e.target.value })}>
                  <option value="">Select group</option>
                  {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Group {i+1}</option>)}
                </select>
              </div>
            </div>
            {addMsg && <div className={`msg ${addMsg.startsWith('ok:') ? 'msg-ok' : 'msg-err'}`}>{addMsg.replace('ok:', '')}</div>}
            <button className="btn btn-primary" style={{ marginTop: '1.25rem' }} onClick={addStudent}>Add Student</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>{students.length} students</div>
            <select onChange={e => loadStudents(e.target.value)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }}>
              <option value="">All groups</option>
              {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Group {i+1}</option>)}
            </select>
          </div>

          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Name</th><th>Username</th><th>Group</th><th>Action</th></tr></thead>
              <tbody>
                {students.length === 0
                  ? <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>No students found</td></tr>
                  : students.map(s => (
                    <tr key={s._id}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--muted)' }}>{s.username}</td>
                      <td><span className="badge badge-group">Group {s.group}</span></td>
                      <td>
                        <button onClick={() => removeStudent(s._id, s.name)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-display)' }}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
