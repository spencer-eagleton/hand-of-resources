const { Router } = require('express');
const LostItem = require('../models/LostItem');

module.exports = Router()
  .post('/', async (req, res) => {
    const lostItem = await LostItem.insert(req.body);
    res.json(lostItem);
  })

  .get('/', async (req, res) => {
    const lostItem = await LostItem.findAll();
    res.json(lostItem);
  });
