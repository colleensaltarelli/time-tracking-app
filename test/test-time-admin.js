'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const should = chai.should();
const expect = chai.expect;
const { TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');
const { Time } = require('../time/models');
const { User } = require('../users');
const { JWT_SECRET } = require('../config');

chai.use(chaiHttp);

describe('Time Router for admin', () => {

  let admin = {
    email: 'admin@email.com',
    firstName: 'Example',
    lastName: 'Admin',
    admin: true
  };

  let user = {
    email: 'user@email.com',
    firstName: 'Example',
    lastName: 'User',
    admin: false
  };

  before(() => runServer(TEST_DATABASE_URL, 8081));

  beforeEach(async () => {

    // Remove All Users
    await User.remove({});

    // Setup Password 
    const passwd = await User.hashPassword('examplePass');
    user.password = passwd;
    admin.password = passwd;

    // Create User
    await User.create(user).then(newUser => {
      user._id = newUser._id;
    }, error => {
      console.log('User Creation Error!', error);
    });

    await User.create(admin).then(newAdmin => {
      admin._id = newAdmin._id;
    }, error => {
      console.log('Admin Creation Error!', error);
    });

    // Create Tokens for Admin/User
    admin.token = jwt.sign({ user: admin }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: admin.email,
        expiresIn: '7d'
      });
    
    user.token = jwt.sign({ user: user }, JWT_SECRET, {
      algorithm: 'HS256',
      subject: user.email,
      expiresIn: '7d'
    });  
  });

  describe('API time funtionality should', function () {

    it('return all time entries for a user on GET', () => {
      return chai.request(app)
        .get(`/api/time/entries/${user._id}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .then((res) => {
          expect(res).to.be.json;
        });
    });

    it('if admin return id for a user on GET', () => {
      return chai.request(app)
        .get(`/api/time/${user._id}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .then((res) => {
          expect(res).to.be.json;
          expect(res.body).to.deep.equal({message: 'admin'});
        });
    });

    // it('admin to update another users timesheet on PUT', () => {
    //   const newClockIn = {startTime: "2019-01-10T13:56:00.000Z"};
    //   return chai.request(app)
    //     .put('/api/time/:id')
    //     .send(newClockIn)
    //     .set('Authorization', `Bearer ${token}`)
    //     .then((res) => {
    //       expect(res).to.be.json;
    //     });
    // });

    // it('admin to delete another users timesheet on PUT', () => {
    //   return chai.request(app)
    //     .delete(`/api/time/${1}`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .then((res) => {
    //       expect(res).to.be.json;
    //     });
    // });

    afterEach( () => {
      admin.password = null;
      admin.token = null;
      user.password = null;
      user.token = null;
      return User.remove({});
    });
  
    after(closeServer);

  });
});
