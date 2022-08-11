const express = require('express');

const user = express.Router();

user.get('/', (req, res) => {
  res.status(200).json({ message: 'Successfully connected!' });
});

// Your first API endpoint
user.get('/hello', (req, res) => {
  res.status(200).json({ greeting: 'hello API' });
});

module.exports = user;
