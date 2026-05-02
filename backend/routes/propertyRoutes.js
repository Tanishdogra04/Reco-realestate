const express = require('express');
const router = express.Router();
const { 
  getProperties, 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} = require('../controllers/propertyController');

const { protect, authorize } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getProperties)
  .post(protect, authorize('broker', 'admin'), createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(protect, authorize('broker', 'admin'), updateProperty)
  .delete(protect, authorize('broker', 'admin'), deleteProperty);

module.exports = router;
