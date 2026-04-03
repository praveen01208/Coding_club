const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required.' });

    const user = await User.findOne({ username: username.toLowerCase().trim(), active: true });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        group: user.group,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/auth/students  — admin list students, optionally filter by group
router.get('/students', protect, adminOnly, async (req, res) => {
  try {
    const query = { role: 'student', active: true };
    if (req.query.group) query.group = Number(req.query.group);
    const students = await User.find(query).select('-password').sort({ group: 1, name: 1 });
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/auth/register  — admin add new student
router.post('/register', protect, adminOnly, async (req, res) => {
  try {
    const { name, username, password, group } = req.body;
    if (!name || !username || !password || !group)
      return res.status(400).json({ message: 'All fields are required.' });

    const existing = await User.findOne({ username: username.toLowerCase().trim() });
    if (existing) return res.status(400).json({ message: 'Username already exists.' });

    const student = new User({
      name,
      username,
      password,
      role: 'student',
      group: Number(group),
    });
    await student.save();
    res.json({ message: 'Student registered successfully.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE /api/auth/students/:id  — admin deactivate student
router.delete('/students/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Student deactivated.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
