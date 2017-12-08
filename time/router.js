
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

const {User} = require('../users/models');
const {Time} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

//add a new clock-in entry
router.post('/clockin', jsonParser, (req, res) => {
    Time
    .create({})
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//add a new clock-out entry
router.post('/clockout', jsonParser, (req, res) => {
    Time.findById(req.body.id)
    .update({endTime: Date.now()})
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// get a list of all time entries for the user
router.get('/entries', jsonParser, (req, res) => {
    Time.find()
    .then(entries => res.json(entries.map(entry => entry.apiRepr())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};