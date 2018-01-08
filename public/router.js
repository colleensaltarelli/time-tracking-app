'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

// index page 
router.get('/', (req, res) => {
    res.render('pages/index');
});

// signup page 
router.get('/signup/', (req, res) => {
    res.render('pages/signup');
});

// login page 
router.get('/login/', (req, res) => {
    res.render('pages/login');
});

module.exports = { router };