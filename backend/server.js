require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const attendanceRoutes = require('./routes/attendance');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Connect and start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`✓ CodeClub backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });
