const { Router } = require('express');
const WaterStation = require('../models/WaterStation');

module.exports = Router()
  .post('/', async (req, res) => {
    const waterStation = await WaterStation.insert(req.body);
    res.json(waterStation);
  });
