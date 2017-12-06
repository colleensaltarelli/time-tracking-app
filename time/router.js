
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

const {User, Time} = require('../users/models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

//add a new clock-in entry
router.post('/new/clockin', jsonParser, jwtAuth, (req, res) => {
    Time
    .create({startTime: req.body.startTime})
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//add a new clock-out entry
router.post('/new/clockout', jsonParser, jwtAuth, (req, res) => {
    Time
    .create({endTime: req.body.endTime})
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};