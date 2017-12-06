'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
moment().format();

mongoose.Promise = global.Promise;

const { router: usersRouter } = require('./users');
const { router: displayRouter } = require('./display/router');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const {router: timeRouter} = require('./time');
const { DATABASE_URL } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

// Logging
app.use(morgan('common'));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// declare ejs static files
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));
app.use("/javascripts", express.static(__dirname + "/javascripts"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser(function(user, done) { done(null, user);});
passport.deserializeUser(function(user, done) { done(null, user);});

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/time/', timeRouter);
app.use('/app/', displayRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

// index page 
app.get('/', (req, res) => {
  res.render('pages/index');
});

// signup page 
app.get('/signup/', (req, res) => {
  res.render('pages/signup');
});

// login page 
app.get('/login/', (req, res) => {
  res.render('pages/login');
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

let server;
const PORT = process.env.PORT || 8080;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
          return reject(err);
      }
      console.log(`You are now connected to your database at: ${databaseUrl}`);
      server = app.listen(port, () => {
          console.log(`Your app (node server) is listening on port ${port}`);
          resolve();
      })
      .on('error', err => {
          mongoose.disconnect();
          reject(err);
      });
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