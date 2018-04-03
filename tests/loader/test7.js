
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
      user=await Users.create(req, userData);
      userID=user['id'];
      var req=chai.request(server)


    });
/**
 * user u generates t(integer) new fake tweets
if u=”testuser” then this refers to the TestUser
Example: /test/user/testuser/tweets?tweets=100
 */
    it('Test Version Status', function(done) {
      var req=chai.request(server)
      req.post('/test/user/'+userID+'/tweets?count=4').then(async function(err1, res2){
      }).then(function(data){
        // req.get('/test/status').then(async function(err1, res2){
        console.log("")
        done();
        //   done()
        //
        // });
      })



    });


});
