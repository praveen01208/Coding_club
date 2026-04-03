require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected');

  // Clear all users
  await User.deleteMany({});
  console.log('✓ Cleared existing users');

  // Create admin (password hashed by pre-save hook)
  await User.create({
    name: 'Administrator',
    username: 'admin',
    password: 'Admin@123',
    role: 'admin',
    active: true,
  });
  console.log('✓ Admin created  →  admin / Admin@123');

  // Create 10 sample students across 5 groups
  const students = [
    { name: 'Arjun Sharma', username: 'student1', group: 1 },
    { name: 'Priya Nair', username: 'student2', group: 2 },
    { name: 'Rohan Gupta', username: 'student3', group: 3 },
    { name: 'Sneha Iyer', username: 'student4', group: 4 },
    { name: 'Karthik Raj', username: 'student5', group: 5 },
    { name: 'Ananya Pillai', username: 'student6', group: 1 },
    { name: 'Dev Mishra', username: 'student7', group: 2 },
    { name: 'Lakshmi Rao', username: 'student8', group: 3 },
    { name: 'Aakash Verma', username: 'student9', group: 4 },
    { name: 'Nisha Joshi', username: 'student10', group: 5 },
  ];

  for (const s of students) {
    await User.create({ ...s, password: 'pass123', role: 'student', active: true });
  }
  console.log('✓ 10 students created  →  student1–student10 / pass123');

  await mongoose.disconnect();
  console.log('\n✓ Seeding complete! You can now login with:');
  console.log('   Admin    →  admin / Admin@123');
  console.log('   Students →  student1 to student10 / pass123');
  process.exit(0);
}

seed().catch((err) => {
  console.error('✗ Seed failed:', err.message);
  process.exit(1);
});
