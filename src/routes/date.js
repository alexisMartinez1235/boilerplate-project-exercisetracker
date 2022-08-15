const express = require('express');
const date = express.Router();

// extract info from date
date.use((req, res, next) => {
  const { date } = req.app.locals.data;
  
  req.app.locals.dateString = {};
  
  req.app.locals.dateString.weekDay = date.toLocaleString('en-US', { weekday: 'short' });
  req.app.locals.dateString.monthName = date.toLocaleString('en-US', { month: 'short' });
  req.app.locals.dateString.monthDay = date.getUTCDate().toString();
  req.app.locals.dateString.year = date.getUTCFullYear().toString();
  
  return next();
});

// function to pass (x int) => "0x" and (xx int) => "xx"
// force size 2

date.use((req, res, next) => {
  const { monthDay } = req.app.locals.dateString;
  
  const toChange = [
    monthDay
  ].map((obj) => ("0" + obj).slice(-2));
    
  const toChangeJSON = {
    monthDay: toChange[0]
  };
  
  req.app.locals.dateString = {
    ...req.app.locals.dateString,
    ...toChangeJSON
  };

  return next();
});

// save date
date.use((req, res, next) => {
  const {
    weekDay,
    monthName,
    monthDay,
    year,
  } = req.app.locals.dateString;
  
  req.app.locals.data.date = `${weekDay} ${monthName} ${monthDay} ${year}`;
  return next();
});

module.exports = date;