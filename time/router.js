'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');
moment().format();

mongoose.Promise = global.Promise;

const { User } = require('../users/models');
const { Time } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

//add a new clock-in entry
router.post('/clockin', jsonParser, jwtAuth, (req, res) => {
  console.log('hitting the clock in route');
  Time
    .create({ userRef: req.user._id, startTime: moment() })
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//add a new clock-out entry
router.post('/clockout', jsonParser, jwtAuth, (req, res) => {
  Time.findById(req.body.id)
    .update({ endTime: moment() })
    .then(time => res.status(201).json(time))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.get('/entries/:id', jwtAuth, jsonParser, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  else {
    Time.find({ userRef: req.params.id })
      .then(entries => res.json(entries.map(entry => entry.apiRepr())))
      .catch(err => res.status(500).json({ message: 'Internal server error' }));
  }
});

router.get('/entries', jwtAuth, jsonParser, (req, res) => {
  Time.find({ userRef: req.user._id })
    .then(entries => res.json(entries.map(entry => entry.apiRepr())))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.get('/:id', jwtAuth, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  else {
    Time.find(req.params._id)
      .then(entries => res.json({ message: 'admin' }))
      .catch(err => res.status(500).json({ message: 'Internal server error' }));
  }
});

router.get('/', jwtAuth, (req, res) => {
  Time.find(req.user._id)
    .then(entries => res.json({ message: 'user' }))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// admin to update another users timesheet
router.put('/:id', jwtAuth, jsonParser, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  Time
    .findByIdAndUpdate(req.params.id, req.body)
    .then(time => res.json(time))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

// admin to delete another users timesheet
router.delete('/:id', jwtAuth, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  Time
    .findByIdAndRemove(req.params.id)
    .then(time => res.json(time))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

module.exports = { router };