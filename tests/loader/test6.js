
process.env.NODE_ENV="test"
var chai = require('chai');
var expect = chai.expect;    // Using Expect style
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
const faker=require('faker');
chai.use(chaiHttp);
var tweets=require("../../test_controllers/test_tweets")
var Users=require("../../test_controllers/test_users")
var follows=require("../../test_controllers/test_relationships")
var userData={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
req={};
res={};
var userID=-1;

chai.use(chaiHttp);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('test suite goes here', function () {
  beforeEach(async function () {
      tweets.destroyAll()
      Users.destroyAll()
      follows.destoryAll()
    });

    // TEST VERSION GET
    it('Test Version Status', function(done) {
      var req=chai.request(server)
      req.post('/test/users/create?count=3&tweets=3').end(async function(err1, res2){
        var req2=chai.request(server)
        req.get('/test/status').end( async function(err, res){
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body['users'].should.not.equal(null);
            res.body['users'].should.equal(3);
            res.body['tweets'].should.not.equal(null);
            res.body['tweets'].should.equal(9);
            done();

          });
      });
    });

    it('Test Version Status', function(done) {
      var req=chai.request(server)
      req.post('/test/users/create?count=3').end(async function(err1, res2){
        var req2=chai.request(server)
        req.get('/test/status').end( async function(err, res){
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body['users'].should.not.equal(null);
            res.body['users'].should.equal(3);
            res.body['tweets'].should.not.equal(null);
            res.body['tweets'].should.equal(0);
            done();

          });
      });
    });
});
