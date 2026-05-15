const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.findOne({ email: 'admin@gmail.com' });
    if (admin) {
      console.log('Admin User Found:', {
        email: admin.email,
        isVerified: admin.isVerified,
        role: admin.role
      });

      if (!admin.isVerified) {
        console.log('Fixing Admin verification status...');
        admin.isVerified = true;
        await admin.save();
        console.log(' Admin verified successfully.');
      }
    } else {
      console.log(' Admin user NOT found in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkAdmin();
