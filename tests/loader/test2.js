process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
const faker=require('faker');
chai.use(chaiHttp);
var tweets=require("../../test_controllers/test_tweets")
var users=require("../../test_controllers/test_users")
var follows=require("../../test_controllers/test_relationships")


//POST /test/reset/all
describe('test/reset/all Test Data', function () {
  before(function () {
      tweets.destroyAll()
      users.destroyAll()
      follows.destoryAll()
    });
    // TEST VERSION GET
    it('Test Version Status', function(done) {
      var req=chai.request(server)
      req.post('/test/reset/all').end(function(err, res2){
        var req2=chai.request(server)
        //
        req2.get('/test/status').end(function(err2, res){
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body['users'].should.not.equal(null);
          res.body['users'].should.equal(1);
          res.body['tweets'].should.not.equal(null);
          res.body['tweets'].should.equal(0);
          res.body['follows'].should.not.equal(null);
          res.body['follows'].should.equal(0);
          res.body['test_user_id'].should.not.equal(null);
          res.body['test_user_id'].should.not.equal(-1);
          done();
        });
      });
    });
});
