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
describe('Test Suite For POST /test/reset/standard?tweets=n  Data', async function (req, res, next) {
  before(function () {
      tweets.destroyAll()
      users.destroyAll()
      follows.destoryAll()
    });

    // TEST VERSION GET
    it('Test Version Status Added', function(done) {
      var req=chai.request(server)
      req.post('/test/reset/testuser').end(async function(err, res2){
      });

    });
});
