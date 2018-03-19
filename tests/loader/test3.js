process.env.NODE_ENV="test"
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../index');
var should = chai.should();
const faker=require('faker');
var loader=require('../../data_loader');
chai.use(chaiHttp);

var tweets=require("../../test_controllers/test_tweets")
var users=require("../../test_controllers/test_users")
var follows=require("../../test_controllers/test_relationships")

//Deletes and recreates TestUser, including all his tweets, follows, and removes him from any other users’ follow list.
describe('Test Suite For POST /test/reset/testuser Data', async function (req, res, next) {


    // TEST VERSION GET
    it('Test Version Status Added', function(done) {
      var req=chai.request(server)
      req.post('/test/reset/testuser').end(async function(err, res2){
        tweets.destroyAll()
        users.destroyAll()
        follows.destoryAll()
        chai.request(server)
        user_curr={fname: faker.name.firstName(),lname: faker.name.lastName(), username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password()};
        req.user=user_curr
        user=await User.create(req, res, next)
        req.id=user['id']
        users.destroy(req, res, next);
        done();
        req.get('/test/status').end( function(err2, res){
          res.body['users'].should.not.equal(null);
          res.body['users'].should.equal(0);
          res.body['tweets'].should.not.equal(null);
          res.body['tweets'].should.equal(0);
          res.body['follows'].should.not.equal(null);
          res.body['follows'].should.equal(0);
          res.body['test_user_id'].should.not.equal(null);
          done();
        });
      });
    });

    
});
