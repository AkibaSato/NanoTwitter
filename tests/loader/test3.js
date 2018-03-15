process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();

chai.use(chaiHttp);
describe('test suite goes here', function () {
    before(function () {

    });
    after(function () {
        core.deinit();
    });
});


// TEST VERSION GET
it('Test Version Status', function(done) {
  chai.request(server)
    .get('/test/version')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('object')
      res.body['version'].should.not.equal(null);
      res.body['version'].should.equal("1.0.0");
      done();
    });
});
