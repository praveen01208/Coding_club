const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect, adminOnly } = require('../middleware/auth');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/sessions/generate  — admin generates a new OTP session
router.post('/generate', protect, adminOnly, async (req, res) => {
  try {
    const { title = 'Coding Club Session', durationMinutes = 5 } = req.body;

    // Deactivate any existing active sessions
    await Session.updateMany({ active: true }, { active: false });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);

    const session = new Session({ otp, title, expiresAt, createdBy: req.user.id });
    await session.save();

    res.json({ session: { _id: session._id, otp, title, expiresAt } });
  } catch (err) {
    console.error('Generate OTP error:', err);
    res.status(500).json({ message: 'Failed to generate OTP.' });
  }
});

// POST /api/sessions/revoke  — admin revokes active session
router.post('/revoke', protect, adminOnly, async (req, res) => {
  try {
    await Session.updateMany({ active: true }, { active: false });
    res.json({ message: 'Session revoked.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/sessions/active-admin  — admin view (includes OTP code)
router.get('/active-admin', protect, adminOnly, async (req, res) => {
  try {
    const session = await Session.findOne({ active: true, expiresAt: { $gt: new Date() } });
    if (!session) return res.json({ active: false });
    res.json({ active: true, session });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/sessions/active  — student view (no OTP, just checks if session exists)
router.get('/active', protect, async (req, res) => {
  try {
    const session = await Session.findOne({ active: true, expiresAt: { $gt: new Date() } });
    if (!session) return res.json({ active: false });
    res.json({
      active: true,
      session: { title: session.title, expiresAt: session.expiresAt },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
