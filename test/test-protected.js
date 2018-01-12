// 'use strict';
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');

// const {TEST_DATABASE_URL} = require('../config');
// const {app, runServer, closeServer} = require('../server');
// const {User} = require('../users');
// const {JWT_SECRET} = require('../config');

// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Timesheet page - a protected endpoint', function() {
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

//   describe('/app/timesheet', function() {
//     it('Should load timesheet when user logs in properly', function() {
//       return chai
//         .request(app)
//         .get('/app/timesheet')
//         .then((res) => {
//           res.should.have.status(200);
//           res.should.be.html;
//           // add res. return array? ob? keys?
//         })
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should send protected data', function() {
//       const token = jwt.sign(
//         {
//           user: {
//             email,
//             firstName,
//             lastName
//           }
//         },
//         JWT_SECRET,
//         {
//           algorithm: 'HS256',
//           subject: email,
//           expiresIn: '7d'
//         }
//       );

//       return chai
//         .request(app)
//         .get('/app/timesheet')
//         .set('Authorization', `Bearer ${token}`)
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//         });
//     });
//   });
// });
