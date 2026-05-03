require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testVerify() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const email = "tanishdogra04@gmail.com";
  const otp = "448862";
  
  try {
    const user = await User.findOne({ 
      email, 
      otp, 
      otpExpires: { $gt: Date.now() } 
    });

    if (!user) {
      console.log('User not found or OTP expired');
    } else {
      console.log('User found! Attempting to save...');
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      
      try {
         await user.save();
         console.log('Save successful!');
      } catch (err) {
         console.error('Save failed:', err);
      }
    }
  } catch (err) {
    console.error('Find failed:', err);
  }
  
  mongoose.connection.close();
}

testVerify();
