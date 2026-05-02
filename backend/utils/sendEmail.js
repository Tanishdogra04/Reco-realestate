const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. DEVELOPMENT FALLBACK: Capture OTP even if credentials are missing
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER.includes('placeholder')) {
    logOTPToConsole(options);
    return;
  }

  try {
    // Optimized Gmail Service config
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const message = {
      from: `"RECO India" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    // 3. ATTEMPT DELIVERY
    const info = await transporter.sendMail(message);
    console.log('✅ Email delivered successfully: %s', info.messageId);

  } catch (err) {
    // 4. FAIL-SAFE: If delivery fails, log the OTP to terminal so the user isn't stuck
    console.error('❌ Mail Delivery Failed:', err.message);
    logOTPToConsole(options, true);
    
    // In production, we might want to alert the user, but in dev we keep moving
    if (process.env.NODE_ENV === 'production') throw err;
  }
};

// Helper to log OTP clearly in the terminal
const logOTPToConsole = (options, isError = false) => {
  const otp = options.html.match(/\d{6}/)?.[0] || 'CODE_NOT_FOUND';
  console.log('\n=========================================');
  console.log(isError ? '🚨 OTP RECOVERY (Mail Server Error)' : '📧 DEVELOPMENT OTP LOG');
  console.log(`DESTINATION: ${options.email}`);
  console.log(`SECURITY CODE: ${otp}`);
  console.log('=========================================\n');
};

module.exports = sendEmail;
