const express = require('express');
const { Exercise } = require('../model/Exercise');
const mongoose = require('mongoose');
const date = require('./date');
const exercise = express.Router();

exercise.get('/', (req, res, next) => {
  const { username } = req.app.locals.data;
  Exercise.find({ username }, (err, exercises) => {
    if (err) return res.status(500).json({
      err, id:'/exercise-1-get'
    });
  
    req.app.locals.data = exercises;
    return next();
  });
});

exercise.post('/', (req, res, next) => {
  const { description, duration } = req.body;
  let { date } = req.body;
  
  const { data: user } = req.app.locals;
  const { _id, username } = user;
  
  if ( typeof date === 'undefined' || date === "") {
    let auxDate = new Date();
    let yearMonthDay = [
      auxDate.getUTCFullYear().toString(),
      (auxDate.getMonth() + 1).toString(),
      auxDate.getUTCDate().toString(),
    ];
    
    date = "";
    
    yearMonthDay.forEach((obj) => {
      if (obj.length === 1) {
        date += ("0" + obj).slice(-2);
      } else {
        date += ("0" + obj).slice(-obj.length);
      }
      date += "-";
    });
    date = date.slice(0, 10);
  }

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
      
      req.app.locals.data = {
        _id,
        username,
        description,
        duration,
        date,
      };
      // console.log(req.app.locals.data);
      
      return next();
    }
  });
}, date);

module.exports = exercise;
