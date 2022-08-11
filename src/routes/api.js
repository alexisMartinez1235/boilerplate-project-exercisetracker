const express = require('express');
const exercise = require('./exercise');

const api = express.Router();

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Successfully connected!' });
});

// Your first API endpoint
api.get('/hello', (req, res) => {
  res.status(200).json({ greeting: 'hello API' });
});

// CRUM URL and save response in req.app.locals.url
api.use('/exercise', exercise);
 
module.exports = api;
