'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

mongoose.Promise = global.Promise;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// timesheet page 
app.get('/timesheet/', function(req, res) {
  res.render('pages/timesheet');
});

// signup page 
app.get('/signup/', function(req, res) {
  res.render('pages/signup');
});

// login page 
app.get('/login/', function(req, res) {
  res.render('pages/login');
});

// admin page 
app.get('/admin/', function(req, res) {
  res.render('pages/admin');
});

// account page 
app.get('/account/', function(req, res) {
  res.render('pages/account');
});

let server;
const PORT = process.env.PORT || 8080;

function runServer(port=PORT) {
  
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};