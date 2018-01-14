'use strict';
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../users/models');
const { JWT_SECRET } = require('../config');

let user

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, callback) {
    console.log('inside auth strategy')
    User.findOne({ email: email })
      .then(_user => {
        user = _user;
        if (!user) {
          return Promise.reject({
            reason: 'LoginError',
            message: 'Incorrect email or password'
          });
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        if (!isValid) {
          return Promise.reject({
            reason: 'LoginError',
            message: 'Incorrect email or password'
          });
        }
        console.log('user', user)
        return callback(null, user);
      })
      .catch(err => {
        if (err.reason === 'LoginError') {
          return callback(null, false, err);
        }
        return callback(err, false);
      });
  });

console.log('JWT_SECRET', JWT_SECRET)

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = { localStrategy, jwtStrategy };