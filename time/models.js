'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const moment = require('moment');
moment().format();

mongoose.Promise = global.Promise;

const TimeSchema = mongoose.Schema({	
    startTime: {type:Date, default: Date.now},
    endTime: {type:Date},
    userRef: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  TimeSchema.methods.apiRepr = function () {
    return {
      startTime: this.startTime || null,
      endTime: this.endTime || null,
      userRef: this.userRef || '',
      _id: this._id || null
    };
  };

  const Time = mongoose.model('Time', TimeSchema, 'time');
  
  module.exports = {Time};