const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('property').populate('user');
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    
    // Optionally update property status to 'sold' if payment is completed
    if (req.body.status === 'completed') {
      await Property.findByIdAndUpdate(req.body.property, { availability: 'sold' });
    }

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // If status changed to completed, mark property as sold
    if (req.body.status === 'completed') {
      await Property.findByIdAndUpdate(booking.property, { availability: 'sold' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
