const { Router } = require('express');
const SafeRestArea = require('../models/SafeRestArea');

module.exports = Router()
  .post('/', async (req, res) => {
    const safeRestArea = await SafeRestArea.insert(req.body);
    res.json(safeRestArea);
  })

  .get('/', async (req, res) => {
    const safeRestArea = await SafeRestArea.findAll();
    res.json(safeRestArea);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const safeRestArea = await SafeRestArea.findById(req.params.id);
      res.send(safeRestArea);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const newReq = await SafeRestArea.updateById(req.params.id, req.body);
    res.send(newReq);
  });
