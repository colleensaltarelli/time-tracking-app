'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  timeEntries: [{startTime: Date, endTime: Date}],
  admin: {type: Boolean, default: false}
});

UserSchema.methods.apiRepr = () => {
  return {
    email: this.email || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    timeEntries: [{startTime: Date || '', endTime: Date || ''}],
    admin: this.admin || false
  };
};

UserSchema.methods.validatePassword = (password) => {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema, 'user');

module.exports = {User};
