const Enquiry = require('../models/Enquiry');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Private
exports.createEnquiry = async (req, res) => {
  try {
    const { property, name, phone, email, message } = req.body;

    // Validation
    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields (Name, Phone, Email)' });
    }

    // Add user to req.body if authenticated
    if (req.user) {
      req.body.user = req.user.id;
    }

    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate({
      path: 'property',
      select: 'title city location price'
    }).sort('-createdAt');
    
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
