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


describe('POST /test/reset/testuser Test Data', function () {
  before(function () {
      tweets.destroyAll()
      users.destroyAll()
      follows.destoryAll()
    });

    // TEST VERSION GET
    it('Test Version Status', function(done) {
      var req=chai.request(server)
      req.post('/test/reset/testuser').end(function(err, res2){
        req.get('/test/status').end(function(err2, res){
          console.log(res.body)
          done();
        });
      });
    });
});
