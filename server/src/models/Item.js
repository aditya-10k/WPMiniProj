const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    slotsAvailable: { type: Number, default: 1 },
    imageUrl: { type: String, default: '' },
    category: { type: String, default: 'car' },
    location: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);

