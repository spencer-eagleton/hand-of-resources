const { Router } = require('express');
const WaterStation = require('../models/WaterStation');

module.exports = Router()
  .post('/', async (req, res) => {
    const waterStation = await WaterStation.insert(req.body);
    res.json(waterStation);
  })

  .get('/', async (req, res) => {
    const waterStation = await WaterStation.findAll();
    res.json(waterStation);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const waterStation = await WaterStation.findById(req.params.id);
      res.send(waterStation);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })


  .patch('/:id', async (req, res) => {
    const newReq = await WaterStation.updateById(req.params.id, req.body);
    res.send(newReq);
  });

