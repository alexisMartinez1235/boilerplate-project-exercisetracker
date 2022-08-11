const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new mongoose.Schema({
  Logname: {
    type: String,
    required: true,
    ref: 'Log',
  },
  count: {
    type: Number,
    required: true,
  },
  log: [{
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }],
});

const Log = mongoose.model('Log', LogSchema, 'Log');

module.exports = {
  Log,
  LogSchema
};
