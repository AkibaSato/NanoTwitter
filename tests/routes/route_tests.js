process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');


chai.use(chaiHttp);
// TEST VIEWS



it('Login Page Status', function(done) {
  chai.request(server)
    .get('/user/register')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
