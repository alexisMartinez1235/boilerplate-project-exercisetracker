const express = require('express');
const { Exercise } = require('../model/Exercise');
const mongoose = require('mongoose');
const { determinateDate, date } = require('./date');
const exercise = express.Router();

exercise.get('/', (req, res, next) => {
  const { username } = req.app.locals.data;
  
  Exercise.find({ username }, (err, exercises) => {
    if (err) return res.status(500).json({
      err, id:'/exercise-1-get'
    });
    req.app.locals.response = exercises;
    return next();
  });
});

exercise.post('/', determinateDate, (req, res, next) => {
  const { description, duration } = req.body;  
  const { _id, username, date } = req.app.locals.data;

  Exercise.create({
    username,
    description,
    duration,
    date,
  }, (err, exercise) => {
    if (err) return res.status(500).json({
      err,
      id:'/exercise-1-post'
    });
    if (exercise)  {
      
      let { description, duration, date } = exercise;
      
      req.app.locals.response = {
        _id,
        username,
        description,
        duration,
        date,
      };
      // console.log(req.app.locals.response);

      return next();
    }
  });
}, date);

module.exports = exercise;
