const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path    = require('path');

/* ===========BODY_PARSER=========== */
const bodyParser = require('body-parser');
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

/* =============VIEWS============= */
app.use(express.static("public"));
app.engine('ejs', require('express-ejs-extend'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =============PASSPORT============= */
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

require('./config/passport')(passport);

// Show flash messages to the user.
app.use(flash());
// required for passport
app.use(cookieParser());
app.use(session({
    // secret: process.env.SECRET || 'enteryoursecrethere',
    secret: 'enteryoursecrethere',
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions.

/* =============ROUTES============= */
const login = require('./routes/login');
const logout = require('./routes/logout');
const users = require('./routes/users');
const search = require('./routes/search');
const tweets = require('./routes/tweets');
const index = require('./routes/index');
const load=require('./test/test_routes');

app.use('/login', login);
app.use('/logout', logout);
app.use('/user', users);
app.use('/search', search);
app.use('/tweets', tweets);
app.use('/', index);
app.use('/test', load);


/* ===========ERROR HANDLER=========== */
// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV != 'production' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error', { res : res, user: req.user });
});

app.listen(port);

exports = module.exports = app;
