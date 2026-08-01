const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');
const { protect, authorize, optionalProtect } = require('../middleware/authMiddleware');

router
  .route('/')
  .post(optionalProtect, createEnquiry)
  .get(protect, authorize('admin'), getEnquiries);

module.exports = router;
