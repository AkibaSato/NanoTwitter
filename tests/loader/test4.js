process.env.NODE_ENV="test"
var chai = require('chai');
var expect = chai.expect;    // Using Expect style
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
const faker=require('faker');
chai.use(chaiHttp);
var tweets=require("../test_controllers/test_tweets")
var Users=require("../test_controllers/test_users")
var follows=require("../test_controllers/test_relationships")
var userData={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
req={};
res={};
var req2=chai.request(server)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//POST /test/user/follow?count=n
//Deletes and recreates TestUser, including all his tweets, follows, and removes him from any other users’ follow list.
describe('Test Suite For POST /test/user/follow?count=n', function (req, res, next) {
  before( function (done) {
    allUsers=[];
    tweets.destroyAll()
    Users.destroyAll()
    follows.destoryAll()
    for(i=0; i<20; i++) {
        var nextUser={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
        allUsers.push(nextUser);
    };
    User.bulkGenerate(req, allUsers).then( async function(resolve){
       req2.post('/test/user/follow?count=3').then( async function(err1, res2){});
      await sleep(100)
      done()
    });
  });
    // TEST VERSION
    it('Test1', function(done) {
      req2.get('/test/status').then( async function(res, err){
        await sleep(100)
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body['users'].should.not.equal(null);
        res.body['users'].should.equal(20);
        res.body['tweets'].should.not.equal(null);
        res.body['tweets'].should.equal(0);
        res.body['follows'].should.equal(9);
        done();
      });
    });
});
