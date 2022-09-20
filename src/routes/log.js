const express = require('express');
const mongoose = require('mongoose');

const { Exercise } = require('../model/Exercise');
const { determinateDate } = require('./date');

const log = express.Router();

log.get('/', (req, res, next) => {
  const { _id, username } = req.app.locals.data;
  let { from, to, limit } = req.query;
  
  exercises = Exercise.find({
    username,
  })
  
  if (from !== undefined) {
    exercises = exercises.where("date").gte(from);
  }
  if (to !== undefined) {
    exercises = exercises.where("date").lte(to);
  }
  if (limit === undefined) limit = 0;
  
  exercises
    .limit(limit)
    .exec((err, exercises) => {
      if (err) return res.status(500).json({
        err, id:'/log-1-get'
      });
      if (!exercises) return res.status(400).json({
        err: ['user did not have any exercises', exercises]
      });
      
      const logList = exercises.map((action) => {
        return {
          description: action.description,
          duration: action.duration,
          date: action.date.toDateString(),
        };
      });
  
      req.app.locals.response = {
        _id,
        username,
        count: logList.length,
        log: logList,
      };
  
      return next();
    });
});

module.exports = {
  log
};
