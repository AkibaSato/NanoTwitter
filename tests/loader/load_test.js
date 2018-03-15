process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);
// TEST VIEWS

it('HomePage Status', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      done();
    });
});
