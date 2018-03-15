var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);
process.env.NODE_ENV="test"
// TEST VIEWS

it('HomePage Status', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
});


// TEST VIEWS
it('HomePage Status', function(done) {
  chai.request(server)
    .get('/user/register')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

it('Login Page Status', function(done) {
  chai.request(server)
    .get('/user/register')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
//
// it('Login Page Status', function(done) {
//   chai.request(server)
//     .get('/user/register')
//     .end(function(err, res){
//       console.log
//       res.should.have.status(200);
//       done();
//     });
// });
//
//
// it('Login Page Title', function(done) {
//   chai.request(server)
//     .get('/register')
//     .end(function(err, res){
//       res.should.have.status(200);
//       done();
//     });
// });


// it('Login Page Body', function(done) {
//   chai.request(server)
//     .get('/login')
//     .end(function(err, res){
//       console.log(res.body)
//       done();
//     });
// });

//
//
// it('Singup Page Status', function(done) {
//   chai.request(server)
//     .get('/user/register')
//     .end(function(err, res){
//       res.should.have.status(200);
//       done();
//     });
// });
