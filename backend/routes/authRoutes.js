const express = require('express');
const router = express.Router();
const { register, login, verifyOTP, resendOTP, forgotPassword, resetPassword, getUsers, updateUserStatus } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id/status', protect, authorize('admin'), updateUserStatus);

module.exports = router;
