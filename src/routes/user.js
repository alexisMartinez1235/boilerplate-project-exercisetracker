const express = require('express');
const { User } = require('../model/User');

const exercise = require('./exercise');
const log = require('./log');

const user = express.Router();

user.get('/', (req, res, next) => {
  
  User.find({}, { username:1 },(err, users) => {
    if (err) return res.status(500).json({
      err, id:'/user-1-get'
    });
  
    req.app.locals.data = users;
    return next();
  });
});

// Your first API endpoint
user.post('/', (req, res, next) => {
  const { username } = req.body;
  
  User.findOne({ username }, { username:1 }, (errFindIfExists, userAlreadyExists) => {
    
    if (errFindIfExists) return res.status(500).json({
      err: errFindIfExists,
      id:'/user-1-post'
    });
    if (userAlreadyExists) res.status(400).json({
      err: "User already exists",
    });
     User.create({
        username,
      }, (errCreate, userCreated) => {
      if (errCreate) return res.status(500).json({
        err: errCreate,
        id:'/user-2-post'
      });
      if (userCreated)  {
        req.app.locals.data = {
          _id: userCreated._id,
          username: userCreated.username,
        };
        return next();
      }
    });
  });
});

function findOneUser(req, res, next) {
  const { _id } = req.params;
  
  // id:1 problem
  User.findOne({ _id }, { _id:1, username:1 },(err, user) => {
    if (err) return res.status(500).json({
      err, id:'/user-1-findone'
    });
    if (user) {
      req.app.locals.data = user;
      return next();  
    }
    return res.json({
      err: user,
      id:'/user-2-findone',
    });
  });
}

user.use('/:_id?/exercises', findOneUser, exercise);
user.use('/:_id?/logs', findOneUser, log);



module.exports = user;
