require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({}).sort({ createdAt: -1 }).limit(3);
  console.log("Last 3 users:");
  users.forEach(u => {
    console.log(`Email: ${u.email}, OTP: ${u.otp}, OTP Expires: ${u.otpExpires}, Verified: ${u.isVerified}`);
  });
  mongoose.connection.close();
}
check();
