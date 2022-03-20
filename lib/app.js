const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/bathrooms', require('./controllers/bathrooms'));
app.use('/api/v1/waterstations', require('./controllers/waterStations'));
app.use('/api/v1/saferestareas', require('./controllers/safeRestAreas'));
app.use('/api/v1/freeitems', require('./controllers/freeItems'));
app.use('/api/v1/lostitems', require('./controllers/lostItems'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
