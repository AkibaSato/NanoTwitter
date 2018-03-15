avar chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

// TEST VIEWS
it('Test homepage', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('Test homepage', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){it
      res.should.have.status(200);
      done();
    });
});


it('Test homepage', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
