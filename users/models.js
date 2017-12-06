'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TimeSchema = mongoose.Schema({	
	date: {type:Date, default: Date.now},
  startTime: {type:Date, default: Date.now},
  endTime: {type:Date, default: Date.now},
	userRef: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

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
  admin: {type: Boolean, default: false}
});

UserSchema.methods.apiRepr = function () {
  return {
    email: this.email || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    admin: this.admin || false
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema, 'user');
const Time = mongoose.model('Time', TimeSchema, 'time');

module.exports = {User, Time};
