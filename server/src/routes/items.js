const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, price, slotsAvailable, imageUrl, category, location } = req.body;
    const item = await Item.create({ title, description, price, slotsAvailable, imageUrl, category, location });
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item' });
  }
});

module.exports = router;

