const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path    = require("path");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/nt-dev");
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const auth = require('./routes/auth');
const index = require('./routes/index');
const search = require('./routes/search');
const tweets = require('./routes/tweets');
const users = require('./routes/users');

app.use('/login', auth);
app.use('/user', users);
app.use('/search', search);
app.use('/tweets', tweets);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { res : res });
});

app.listen(port);
module.exports = app;
