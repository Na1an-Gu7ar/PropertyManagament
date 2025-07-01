const express = require('express');
const {
  createProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getAllProperties).post(protect, createProperty);
router.route('/:id').delete(protect, deleteProperty).put(protect, updateProperty);

module.exports = router;
