const { Router } = require('express');
const Bathroom = require('../models/Bathroom');

module.exports = Router()
  .post('/', async (req, res) => {
    const bathroom = await Bathroom.insert(req.body);
    res.json(bathroom);
  })

  .get('/', async (req, res) => {
    const bathrooms = await Bathroom.findAll();
    res.json(bathrooms);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const bathroom = await Bathroom.findById(req.params.id);
      res.send(bathroom);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const newReq = await Bathroom.updateById(req.params.id, req.body);
    res.send(newReq);
  })

  .delete('/:id', async (req, res) => {
    const bathroom = await Bathroom.deleteById(req.params.id);
    res.send(bathroom);
  });
