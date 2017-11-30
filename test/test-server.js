const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Home Page', function() {
    
      before(() => runServer(8081));
    
      after(closeServer);
    
      it('should say hello on GET', function() {
        return chai.request(app)
        .get('/')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.html;
        });
      });
    });
