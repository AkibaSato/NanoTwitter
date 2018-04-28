var should = require("should")
var tweets = require("../../controllers/tweets")
var sequelize = require("../../models/index").sequelize
var models = require("../../models")

// This is a test suite to test the tweets controller and models.
describe("Tweets", () =>{
  var req = null;
  var res = null;
  var userA = null;
  var userB = null;

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
      return Promise.all([createUserA, createUserB]);

    }).then(([savedUserA, savedUserB]) => {
      if (!(savedUserA && savedUserB)) {
        return Promise.reject("Did not save the users properly.");
      }
      userA = savedUserA;
      userB = savedUserB;

      return Promise.resolve();
    }).then(() => {
      return done();
    });
  });

  describe("Tweet", () => {
    it("should succeed and redirect", (done) => {
      req.body.content = "foo"
      req.user.id = userA.id
      res.check = function () {
        this.code.should.equal(200);
        this.redirectUrl.should.equal('/user/' + req.user.id);
        done();
      }
      tweets.tweet(req, res);
    });

    it("should fail for non-existent user", (done) => {
      req.body.content = "foo"
      req.user.id = 0
      res.check = function () {
        this.code.should.equal(404);
        done();
      }
      tweets.tweet(req, res);
    });

    it("should fail for comment to a non-existent tweet", (done) => {
      req.body.content = "foo"
      req.user.id = userA.id
      req.body.parentId = 0
      res.check = function () {
        this.code.should.equal(404);
        done();
      }
      tweets.tweet(req, res);
    });
  });

  describe("Get tweet", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done();
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id,
      }).then((tweet) => {
        req.params.id = tweet.id;
        tweets.getTweet(req, res);
      })
    });

    it ("should fail for non-existent tweet", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        done()
      }
      tweets.getTweet(req, res);
    });
  });

  describe("Like", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done();
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id,
      }).then(tweet => {
        req.params.id = tweet.id;
        req.user.id = userB.id
        tweets.like(req, res);
      })
    });

    it ("should fail for non-existent tweet", (done) => {
      req.params.id = 0
      req.user.id = userA.id
      res.check = function() {
        this.code.should.equal(404)
        console.log(this.errName)
        done()
      }
      tweets.like(req, res);
    });

    it ("should fail for non-existent user", (done) => {
      res.check = function() {
        this.code.should.equal(404)
        done()
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id
      }).then(tweet => {
        req.params.id = tweet.id
        req.user.id = 0
      })
      tweets.like(req, res);
    });
  });

  describe("Get likes", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done();
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id,
      }).then(tweet => {
        req.params.id = tweet.id
        return models.Like.create({
          userId: userB.id,
          tweetId: tweet.id
        })
      }).then(() => {
        tweets.getLikes(req, res)
      })
    });

    it ("should fail for non-existent tweet", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        done()
      }
      tweets.getLikes(req, res);
    });
  });

  describe("Retweets", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done();
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id,
      }).then(tweet => {
        req.params.id = tweet.id;
        req.user.id = userB.id
        tweets.retweet(req, res);
      })
    });

    it ("should fail for non-existent tweet", (done) => {
      req.params.id = 0
      req.user.id = userA.id
      res.check = function() {
        this.code.should.equal(404)
        console.log(this.errName)
        done()
      }
      tweets.retweet(req, res);
    });

    it ("should fail for non-existent user", (done) => {
      res.check = function() {
        this.code.should.equal(404)
        done()
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id
      }).then(tweet => {
        req.params.id = tweet.id
        req.user.id = 0
      })
      tweets.retweet(req, res);
    });
  });

  describe("Get Retweets", () => {
    it("should succeed and render view", (done) => {
      res.check = function() {
        this.code.should.equal(200)
        this.viewName.should.equal("NOT YET IMPLEMENTED")
        done();
      }
      models.Tweet.create({
          content: "foo",
          userId: userA.id,
      }).then(tweet => {
        req.params.id = tweet.id
        return models.Tweet.create({
          content: "",
          userId: userB.id,
          originalId: req.params.id
        })
      }).then(() => {
        tweets.getLikes(req, res)
      })
    });

    it ("should fail for non-existent tweet", (done) => {
      req.params.id = 0
      res.check = function() {
        this.code.should.equal(404)
        done()
      }
      tweets.getRetweets(req, res);
    });
  });

});
