// 'use strict';
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');
// const should = chai.should();

// const {TEST_DATABASE_URL} = require('../config');
// const { app, runServer, closeServer } = require('../server');
// const {Time} = require('../time/models');
// const {User} = require('../users');
// const {JWT_SECRET} = require('../config');

// chai.use(chaiHttp);

// describe('Time Router for single user', () => {
//   const email = 'exampleEmail';
//   const password = 'examplePass';
//   const firstName = 'Example';
//   const lastName = 'User';
//   const admin = false;

//   before(() => runServer(TEST_DATABASE_URL, 8081));

//   after(closeServer);

//   beforeEach(function() {
//     return User.hashPassword(password).then(password =>
//       User.create({
//         email,
//         password,
//         firstName,
//         lastName,
//         admin
//       })
//     );
//   });

//   afterEach(function() {
//     return User.remove({});
//   });

//   describe('API time funtionality should', function () {
//     const token = jwt.sign(
//       {
//         user: {
//           email,
//           firstName,
//           lastName
//         }
//       },
//       JWT_SECRET,
//       {
//         algorithm: 'HS256',
//         subject: email,
//         expiresIn: '7d'
//       }
//     );

//     it('add a new clock-in entry on POST', () => {
//       const newClockIn = {startTime: "2018-01-10T13:56:00.000Z"};
//       return chai.request(app)
//         .post('/api/time/clockin')
//         .send(newClockIn)
//         .set('Authorization', `Bearer ${token}`)
//         .then((res) => {
//           res.should.have.status(201);
//         });
//     });

//     it('add a new clock-out entry on POST', () => {
//       const newClockOut = {endTime: "2018-01-10T13:56:00.000Z"};
//       return chai.request(app)
//         .post('/api/time/clockout')
//         .send(newClockOut)
//         .set('Authorization', `Bearer ${token}`)
//         .then((res) => {
//           res.should.have.status(201);
//         });
//     });

//     it('return all time entries for that user on GET', () => {
//       return chai.request(app)
//         .get('/api/time/entries')
//         .set('Authorization', `Bearer ${token}`)
//         .then((res) => {
//           res.should.have.status(200);
//         });
//     });

//   });
// });
