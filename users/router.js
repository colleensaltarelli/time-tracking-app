'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

const {User, Time} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

// Post to register a new user
router.post('/signup', jsonParser, (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['email', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    password: {
      min: 2,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {email, password, firstName = '', lastName = ''} = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({email})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same email
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email already taken',
          location: 'email'
        });
      }
      // If there is no existing email, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        email,
        password: hash,
        firstName,
        lastName,
      });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.get('/logout', jwtAuth, (req, res) => {
  req.logout();
  res.json({ok:true});
});

router.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//check if user is admin 
router.get('/is-admin', jwtAuth, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  else {
    res.status(204).end()
  }
})

// request a single user by their own ID
router.get('/account', jwtAuth, (req, res) => {
  User.find({_id: req.user._id})
  .then(user => res.json(user[0].apiRepr()))
  .catch(err => {
    console.error(err);
      res.status(500).json({message: 'Internal server error'})
  });
});

// request a single user by any users ID
router.get('/account/:id',  (req, res) => {
  User.find({_id: req.params.id})
  .then(user => res.json(user[0].apiRepr()))
  .catch(err => {
    console.error(err);
      res.status(500).json({message: 'Internal server error'})
  });
});

router.get('/all-users', jwtAuth, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  else {
    User.find({})
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
  }
});

// request a single user by ID
router.get('/:id', jwtAuth, (req, res) => {
  User
  .find({userRef: req.user._id})
  .then(users =>res.json(users.apiRepr()))
  .catch(err => {
    console.error(err);
      res.status(500).json({message: 'Internal server error'})
  });
});

// an admin to delete another users account
router.delete('/:id', jwtAuth, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  else {
    User
    .findByIdAndRemove(req.params.id)
    .then(user => res.json({message: 'admin'}))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
  }
});

// a user to delete their own account
router.delete('/', jwtAuth, (req, res) => {
  User
  .findByIdAndRemove(req.user._id)
  .then(user => res.json({message: 'user'}))
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// an admn to update another users account info
router.put('/:id', jwtAuth, jsonParser, (req, res) => {
  if (!req.user.admin) {
    return res.send('you are not admin').status(401);
  }
  const toUpdate = {};
  const updateableFields = ['email', 'firstName', 'lastName'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate}, { new: true })
    .then(user => res.json({user: user.apiRepr()}).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// a user to update their own account info
router.put('/', jwtAuth, jsonParser, (req, res) => {
  const toUpdate = {};
  const updateableFields = ['email', 'firstName', 'lastName'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  User
    .findByIdAndUpdate(req.user._id, {$set: toUpdate}, { new: true })
    .then(user => res.json({user: user.apiRepr()}).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};