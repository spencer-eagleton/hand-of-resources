const { Router } = require('express');
const FreeItem = require('../models/FreeItem');

module.exports = Router()
  .post('/', async (req, res) => {
    const freeItem = await FreeItem.insert(req.body);
    res.json(freeItem);
  })

  .get('/', async (req, res) => {
    const freeItem = await FreeItem.findAll();
    res.json(freeItem);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const freeItem = await FreeItem.findById(req.params.id);
      res.send(freeItem);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const newReq = await FreeItem.updateById(req.params.id, req.body);
    res.send(newReq);
  })

  .delete('/:id', async (req, res) => {
    const freeItem = await FreeItem.deleteById(req.params.id);
    res.send(freeItem);
  });
