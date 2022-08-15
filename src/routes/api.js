const express = require('express');
const user = require('./user');
const log = require('./log');

const api = express.Router();

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Successfully connected!' });
});

// Your first API endpoint
api.get('/hello', (req, res) => {
  res.status(200).json({ greeting: 'hello API' });
});

// CRUM URL and save response in req.app.locals.url
api.use('/users', user);
 
// send response
api.use((req, res, next) => {
  let { data } = req.app.locals;

  res.status(200).json(data);
});

module.exports = api;
