var should = require("should")
var index = require("../../controllers/index")
var sequelize = require("../../models/index").sequelize
var models = require("../../models")

// This is a test suite to test the index controller and models.
describe("Index", () =>{
  var req = null;
  var res = null;
  var user = null;

  beforeEach((done) => {
    /* ======= Initialize mock response and request. ======= */
    req = {
      params: {},
      user: {},
      body: {}
    };

    res = {
      viewName: ""
      , data: {}
      , code: 200
      , errName: ""
      , redirectUrl: ""
      , check: function() {} // Custom checks defined by each test.
      , send: function(err) {
        if (err != null) {
          this.errName = err.message;
        } else {
          this.errName = ""
        }
        this.check();
      }
      , status: function(code) {
        this.code = code
        return this
      }
      , render: function(view, data = {}) {
        this.viewName = view
        this.data = data
        this.check();
      }
      , redirect: function(url) {
        this.redirectUrl = url
        this.check();
      }
    };

    /* ======= Clean database and inject mock data. ======= */
    sequelize.sync({force: true})
    .then(() => {
      createUserA = models.User.create({
        fname: 'bar',
        lname: 'bar',
        username: 'bar',
        email: 'bar@bar.com',
        password: models.User.generateHash('bar')
      });
      createUserB = models.User.create({
          fname: 'foo',
          lname: 'foo',
          username: 'foo',
          email: 'foo@foo.com',
          password: models.User.generateHash('foo')
        });
      return Promise.all([createUserA, createUserB]);

    }).then(([savedUserA, savedUserB]) => {
      if (!(savedUserA && savedUserB)) {
        return Promise.reject("Did not save the users properly.");
      }
      userA = savedUserA;
      userB = savedUserB;

      createTweetA = models.Tweet.create({
          content: 'foo',
          userId: userB.id
      });

      createTweetB = models.Tweet.create({
          content: 'bar',
          userId: userB.id
      });
      createRelationship = models.Relationship.create({
        followerId: userA.id,
        followeeId: userB.id
      });
      return Promise.all([createTweetA, createTweetB, createRelationship])
    }).then(() => {
      return done();
    });
  });

  describe("Logged in Index", () => {
    it("should succeed and render view", (done) => {
      req.body.content = "foo"
      req.user.id = userA.id
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('index');
        done();
      }
      index.index(req, res);
    });

    it("should fail for non-existent user", (done) => {
      req.body.content = "foo"
      req.user.id = 0
      res.check = function () {
        this.code.should.equal(404);
        done();
      }
      index.index(req, res);
    });

  });

  describe("Logged out Index", () => {
    it("should succeed and render view", (done) => {
      req.body.content = "foo"
      req.user = null
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('index');
        done();
      }
      index.index(req, res);
    });

  });

});
