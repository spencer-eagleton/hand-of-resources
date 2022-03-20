const { Router } = require('express');
const SafeRestArea = require('../models/SafeRestArea');

module.exports = Router().post('/', async (req, res) => {
  const safeRestArea = await SafeRestArea.insert(req.body);
  res.json(safeRestArea);
})

  .get('/', async (req, res) => {
    const safeRestArea = await SafeRestArea.findAll();
    res.json(safeRestArea);
  });
