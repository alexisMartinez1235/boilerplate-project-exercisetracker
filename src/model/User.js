const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema, 'User');

module.exports = {
  User,
  UserSchema
};
