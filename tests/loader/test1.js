process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();

chai.use(chaiHttp);
var tweets=require("../../test_controllers/test_tweets")
var users=require("../../test_controllers/test_users")
var follows=require("../../test_controllers/test_relationships")



describe('No Database Data Tests', function () {
  before(function () {
      tweets.destroyAll()
      users.destroyAll()
      follows.destoryAll()
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
    it('Test Status Page', function(done) {
      chai.request(server)
        .get('/test/status')
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body['users'].should.not.equal(null);
          res.body['users'].should.equal(0);
          res.body['tweets'].should.not.equal(null);
          res.body['tweets'].should.equal(0);
          res.body['follows'].should.not.equal(null);
          res.body['follows'].should.equal(0);
          res.body['test_user_id'].should.not.equal(null);
          res.body['test_user_id'].should.equal(-1);
          done();
        });
    });
});
