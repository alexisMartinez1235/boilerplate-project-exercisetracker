const express = require('express');
const date = express.Router();

// determine date if it is undefined
function determinateDate(req, res, next) {
  const { date } = req.body;
  let auxDate = new Date();
  
  if (! (typeof date === 'undefined' || date === "")) {
    auxDate = new Date(date);
  }
  
  let yearMonthDay = [
    auxDate.getUTCFullYear().toString(),
    
    // beacause in programming we start to count at 0
    (auxDate.getMonth() + 1).toString(),
    
    auxDate.getUTCDate().toString(),
  ];
    
  let dateString = "";
  
  yearMonthDay.forEach((obj) => {
    if (obj.length === 1) {
      dateString += ("0" + obj).slice(-2);
    } else {
      dateString += ("0" + obj).slice(-obj.length);
    }
    dateString += "-";
  });
  
  dateString = dateString.slice(0, 10);
  
  req.app.locals.data.date = dateString;
  
  next();
  return dateString;
}

// extract info from date
date.use((req, res, next) => {
  const { date } = req.app.locals.response;
  
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
  
  req.app.locals.response.date = `${weekDay} ${monthName} ${monthDay} ${year}`;
  // console.log(req.app.locals.response);
  
  return next();
});

module.exports = {
  determinateDate,
  date
};