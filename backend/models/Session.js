const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  title: { type: String, default: 'Coding Club Session' },
  expiresAt: { type: Date, required: true },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
