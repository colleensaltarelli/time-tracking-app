'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TimeSchema = mongoose.Schema({	
    startTime: {type:Date, default: Date.now},
    endTime: {type:Date},
      userRef: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  const Time = mongoose.model('Time', TimeSchema, 'time');
  
  module.exports = {Time};