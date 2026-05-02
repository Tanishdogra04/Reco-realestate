const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['residential', 'commercial', 'industrial', 'plots']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  bhk: {
    type: String,
    default: null
  },
  area: {
    type: Number,
    required: [true, 'Please add the area in sq. ft.']
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
    enum: ['Ready to Move', 'New Launch', 'Under Construction', 'Immediate', 'In 6 Months']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  developer: {
    type: String,
    required: [true, 'Please add a developer name']
  },
  rera: {
    type: String,
    required: [true, 'Please add a RERA ID']
  },
  possession: {
    type: String,
    default: 'Ready'
  },
  furnishing: {
    type: String,
    enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    default: 'Unfurnished'
  },
  facing: {
    type: String,
    default: 'East'
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'
  },
  amenities: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
