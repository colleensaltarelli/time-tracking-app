'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

// timesheet page 
router.get('/timesheet/', function(req, res) {
  res.render('pages/timesheet');
});

// admin page 
router.get('/admin/', function(req, res) {
  res.render('pages/admin');
});

// account page 
router.get('/account/', function(req, res) {
  res.render('pages/account');
});

module.exports = {router};