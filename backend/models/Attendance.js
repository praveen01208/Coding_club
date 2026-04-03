const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  username: { type: String, required: true },
  group: { type: Number, required: true },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  sessionDate: { type: String, required: true }, // 'DD/MM/YYYY' format (India locale)
  markedAt: { type: Date, default: Date.now },
});

// Prevent duplicate attendance per student per day
attendanceSchema.index({ studentId: 1, sessionDate: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
