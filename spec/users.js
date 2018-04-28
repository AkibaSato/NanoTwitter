var should = require("should")
var users = require("../../controllers/users")
var sequelize = require("../../models/index").sequelize
var models = require("../../models")

// This is a test suite to test the user controller and models.
describe("Users", () =>{
  var req = null;
  var res = null;
  var userA = null;
  var userB = null;
  var userC = null;

  beforeEach((done) => {
    /* ======= Initialize mock response and request. ======= */
    req = {
      params: {},
      user: {}
    };
    res = {
      viewName: ""
      , data: {}
      , code: 200
      , errName: ""
      , redirectUrl: null
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
      createUserC = models.User.create({
          fname: 'baz',
          lname: 'baz',
          username: 'baz',
          email: 'baz@baz.com',
          password: models.User.generateHash('baz')
        });
      return Promise.all([createUserA, createUserB, createUserC]);
    }).then(([savedUserA, savedUserB, savedUserC]) => {
      if (!(savedUserA && savedUserB && savedUserC)) {
        return Promise.reject("Did not save the users properly.");
      }
      userA = savedUserA;
      userB = savedUserB;
      userC = savedUserC;

      return Promise.resolve();
    }).then(() => {
      return done();
    });
  });

  describe("Signup", () => {
    it("should succeed and render view", (done) => {
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('signup');
        done();
      }
      users.getSignup(req, res);

    });
  });

  describe("Follow", () => {
    it("should succeed and redirect", (done) => {
      req.params.id = userA.id; // Followee
      req.user.id = userB.id; // Follower
      res.check = function() {
        this.code.should.equal(200)
        this.redirectUrl.should.equal("/user/" + req.params.id)
        done();
      }
      users.follow(req, res);
    });

    it ("should fail for same follower and followee", (done) => {
      req.params.id = 0
      req.user.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal("Can't follow myself")
        done()
      }
      users.follow(req, res);
    });

    it ("should fail for dups", (done) => {
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal("Duplicate relationship")
        done()
      }
      models.Relationship.create({
        followerId: userB.id,
        followeeId: userC.id
      }).then(() => {
        req.user.id = userB.id // follower
        req.params.id = userC.id // followee
        users.follow(req, res);
      })
    });
  });

  describe("Unfollow", () => {
    it("should succeed and redirect", function(done) {
      res.check = function() {
        this.code.should.equal(200)
        res.redirectUrl = "/user/" + req.params.id;
        done()
      }
      models.Relationship.create({
        followerId: userB.id,
        followeeId: userC.id
      }).then(() => {
        req.user.id = userB.id
        req.params.id = userC.id
        users.unfollow(req, res);
      });
    });

    it ("should fail for same follower and followee", (done) => {
      req.params.id = 0
      req.user.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal("Can't follow myself")
        done()
      }
      users.unfollow(req, res);
    });

    it ("should fail for nonexistent relationship", (done) => {
      req.params.id = userC.id
      req.user.id = userA.id
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal("Non-existent relationship")
        done()
      }
      users.unfollow(req, res);
    });
  });

  describe("Get user", () => {
    it("should succeed and render view", (done) => {
      req.params.id = userA.id
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal('user')
        done()
      }

      users.getUser(req, res);
    });

    it("should fail to fetch non-existent user", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal('No user found.')
        done()
      }
      users.getUser(req, res);
    });
  })

  describe("Get user's original tweets", () => {
    it("should succeed and render view", (done) => {
      req.params.id = userA.id
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done()
      }
      models.Tweet.create({
          content: "foo",
          userId: req.params.id,
      }).then(() => {
        users.getTweets(req, res);
      })
    });

    it("excludes retweets", (done) => {
      req.params.id = userB.id
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done()
      }
      models.Tweet.create({
          content: "foo",
          userId: req.params.id,
      }).then((tweet) => {
        return models.Tweet.create({
            content: "bar",
            userId: req.params.id,
            parentId: tweet.id
        })
      }).then(() => {
        users.getTweets(req, res);
      });
    });
  })

  describe("Get followers", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done()
      }
      models.Relationship.create({
        followerId: userA.id,
        followeeId: userB.id
      }).then(() => {
        req.params.id = userB.id
        users.getFollowees(req, res);
      });
    });

    it("should fail to fetch non-existent user", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal('No user found.')
        done()
      }
      users.getUser(req, res);
    });
  })

  describe("Get followees", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done()
      }
      models.Relationship.create({
        followerId: userA.id,
        followeeId: userB.id
      }).then(() => {
        req.params.id = userA.id
        users.getFollowees(req, res);
      });
    });

    it("should fail to fetch non-existent user", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal('No user found.')
        done()
      }
      users.getUser(req, res);
    });
  })

  describe("Get tweets from the people the user follows", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done()
      }
      models.Relationship.create({
        followerId: userA.id,
        followeeId: userB.id
      }).then(() => {
        req.params.id = userA.id
        users.getFollowees(req, res);
      });
    });

    it("should fail to fetch non-existent user", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        this.errName.should.equal('No user found.')
        done()
      }
      users.getUser(req, res);
    });
  })

});
