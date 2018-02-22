const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path    = require("path");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/benchmark");

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(function (req, res, next) {
    console.log(req.body) // populated!
    next()
})
app.set('view engine', 'ejs')

// routes
app.get('/',function(req,res){
    res.render('index');
});
app.get('/login',function(req,res){
    res.render('login');
});
app.get('/user/register',function(req,res){
    res.render('signup');
});
app.get('/user/:user_id',function(req,res){
    res.render('');
});
app.get('/user/:user_id/tweets',function(req,res){
    res.render('');
});
app.get('/user/:user_id/tweets',function(req,res){
    res.render('');
});
app.get('/user/:user_id/followers',function(req,res){
    res.render('');
});
app.get('/user/:user_id/followee_tweets',function(req,res){
    res.render('');
});
app.get('/search',function(req,res){
    res.render('');
});
app.get('/search/results',function(req,res){
    res.render('');
});
app.get('/tweets/:tweet_id',function(req,res){
    res.render('');
});
app.post('/login',function(req,res){
    res.render('');
});
app.post('/user/register',function(req,res){
    res.render('');
});
app.post('/user/:user_id/follow',function(req,res){
    res.render('');
});
app.post('/search',function(req,res){
    res.render('');
});
app.post('/tweets/new',function(req,res){
    res.render('');
});

app.listen(port);
