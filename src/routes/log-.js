const express = require('express');

const log = express.Router();

log.get('/', (req, res) => {
  res.status(200).json({ message: 'Successfully connected!' });
});

// Your first API endpoint
log.get('/hello', (req, res) => {
  res.status(200).json({ greeting: 'hello API' });
});

module.exports = log;
