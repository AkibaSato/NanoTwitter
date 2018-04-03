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
//POST /test/user/follow?count=n
//Deletes and recreates TestUser, including all his tweets, follows, and removes him from any other users’ follow list.
describe('Test Suite For POST /test/user/follow?count=n', async function (req, res, next) {
  before(async function () {
      tweets.destroyAll()
      Users.destroyAll()
      follows.destoryAll()
      user=await Users.create(req, userData);
      userID=user['id'];
      for(i=0; i<20; i++) {
        var nextUser={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
        Users.create(req, nextUser);
      };
    });
    // TEST VERSION
    it('Test1', function(done) {
      var req=chai.request(server)
      req.post('/test/user/'+userID+'/follow?count=10').end( function(err1, res2){

      }).then(function(data){
        req.get('/test/status').end(async function(err, res){
          var followers=await Users.getFollowees(req, res, userID)
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body['users'].should.not.equal(null);
          res.body['users'].should.equal(21);
          res.body['tweets'].should.not.equal(null);
          res.body['tweets'].should.equal(0);
          res.body['follows'].should.equal(10);
          expect(followers).to.not.equal(null);
          expect(followers.length).to.not.equal(0);
          expect(followers.length).to.equal(10);
          done();
        });
      })
  });
});
