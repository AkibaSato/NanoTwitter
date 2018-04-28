var should = require("should")
var search = require("../../controllers/search")
var sequelize = require("../../models/index").sequelize
var models = require("../../models")

// This is a test suite to test the search controller and models.
// WARNING: NOT WORKING because we don't tokenize/index the tweets.
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
      return models.User.create({
        fname: 'bar',
        lname: 'bar',
        username: 'bar',
        email: 'bar@bar.com',
        password: models.User.generateHash('bar')
      });

    }).then(savedUser => {
      if (!savedUser) {
        return Promise.reject("Did not save the users properly.");
      }
      user = savedUser;

      createTweetA = models.Tweet.create({
          content: 'foo #bar',
          userId: user.id
      });

      createTweetB = models.Tweet.create({
          content: '@baz',
          userId: user.id
      });
      return Promise.all([createTweetA, createTweetB])
    }).then(() => {
      return done();
    });
  });

  describe("Search word", () => {
    it("should succeed and render view", (done) => {
      req.params.term = 'foo'
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });

    it("should succeed for no tweets", (done) => {
      req.params.term = "dummy"
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });
  });

  describe("Search hashtag", () => {
    it("should succeed and render view", (done) => {
      req.params.term = '#bar'
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });

    it("should succeed for no tweets", (done) => {
      req.params.term = "#dummy"
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });
  });

  describe("Search mention", () => {
    it("should succeed and render view", (done) => {
      req.params.term = '@baz'
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });

    it("should succeed for no tweets", (done) => {
      req.params.term = "@dummy"
      res.check = function () {
        this.code.should.equal(200);
        this.viewName.should.equal('NOT YET IMPLEMENTED');
        console.log(data)
        done();
      }
      search.search(req, res);
    });
  });

});
