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
var req=chai.request(server)
chai.use(chaiHttp);

describe('test suite goes here', function () {
    before(async function () {
      tweets.destroyAll()
      Users.destroyAll()
      follows.destoryAll()
      user=await Users.create(req, userData);
      userID=user['id']
    });

    /**
    Deletes all users, tweets and follows
    Recreate TestUser
    If tweets parameter is included, only load n tweets from seed data, otherwise load all
    Imports the complete set of standard seed data, see: Seed Data
    Example: /test/reset/standard
    **/

    it('Test Version Status', function(done) {
      req.post('/test/reset/standard').end(function(err1, res2){
        req.get('/test/status').end( function(err, res){
          console.log(res.body)
          done()
          
        });

      });
    });
});
