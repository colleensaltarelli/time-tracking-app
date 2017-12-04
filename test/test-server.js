const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const should = chai.should();

chai.use(chaiHttp);

describe('Pages Load', () => {
    
      before(() => runServer(TEST_DATABASE_URL, 8081));
    
      after(closeServer);
    
      it('should load homepage on GET', () => {
        return chai.request(app)
        .get('/')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.html;
        });
      });

      // it('should load timesheet on GET', () => {
      //   return chai.request(app)
      //   .get('/timesheet')
      //   .then((res) => {
      //     res.should.have.status(200);
      //     res.should.be.html;
      //   });
      // });

      it('should load signup on GET', () => {
        return chai.request(app)
        .get('/signup')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.html;
        });
      });

      it('should load login on GET', () => {
        return chai.request(app)
        .get('/login')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.html;
        });
      });

      // it('should load admin on GET', () => {
      //   return chai.request(app)
      //   .get('/admin')
      //   .then((res) => {
      //     res.should.have.status(200);
      //     res.should.be.html;
      //   });
      // });

    //   it('should load account on GET', () => {
    //     return chai.request(app)
    //     .get('/account')
    //     .then((res) => {
    //       res.should.have.status(200);
    //       res.should.be.html;
    //     });
    //   });
});
