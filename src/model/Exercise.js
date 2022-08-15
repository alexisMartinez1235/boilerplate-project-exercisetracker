const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'User',
  },
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
});

const Exercise = mongoose.model('Exercise', ExerciseSchema, 'Exercise');

module.exports = {
  Exercise,
  ExerciseSchema
};
