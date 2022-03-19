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
  });
