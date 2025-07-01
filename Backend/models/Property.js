const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Property', propertySchema);
