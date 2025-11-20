const express = require('express');
const Booking = require('../models/Booking');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/me', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('item').sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { itemId, date, notes } = req.body;
    if (!itemId || !date) {
      return res.status(400).json({ message: 'Item and date are required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const booking = await Booking.create({
      user: req.userId,
      item: itemId,
      date: new Date(date),
      notes,
      amount: item.price,
    });

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

module.exports = router;

