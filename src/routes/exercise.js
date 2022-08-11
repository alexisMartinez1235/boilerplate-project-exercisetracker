const express = require('express');

const exercise = express.Router();

exercise.get('/', (req, res) => {
  res.status(200).json({ message: 'Successfully connected!' });
});

// Your first API endpoint
exercise.get('/hello', (req, res) => {
  res.status(200).json({ greeting: 'hello API' });
});

module.exports = exercise;
