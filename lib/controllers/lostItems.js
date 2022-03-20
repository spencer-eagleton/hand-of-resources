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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const lostItem = await LostItem.findById(req.params.id);
      res.send(lostItem);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
