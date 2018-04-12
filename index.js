  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;
  const path    = require('path');
  const redis = require('redis');

  /* ===========BODY_PARSER=========== */
  const bodyParser = require('body-parser');
  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // Parse application/json
  app.use(bodyParser.json());
  // Parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  /* =============VIEWS============= */
  const compression = require('compression');
  const flash = require('connect-flash');

  app.use(express.static("public"));
  app.engine('ejs', require('express-ejs-extend'));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'))
  // faster loadup - shrinks the HTTP load so it can be expanded by the browser.
  app.use(compression());
  // Show flash messages to the user.
  app.use(flash());
  app.set('view cache', true);

  app.use(function (req, res, next) {
      if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
          res.setHeader('Cache-Control', 'public, max-age=31557600'); // cache header
      }
      next();
  });

  /* =============ROUTES============= */




  // /* =============PASSPORT============= */
  // const passport = require('passport');
  // const cookieParser = require('cookie-parser');
  // const session = require('express-session');
  // const RedisStore = require('connect-redis')(session)
  // const redisCookie = require('heroku-redis-client');
  //
  // require('./config/passport')(passport);
  //
  // // required for passport
  // app.use(cookieParser());
  //
  // app.use(session({
  //     // secret: process.env.SECRET || 'enteryoursecrethere',
  //     secret: 'enteryoursecrethere',
  //     cookie: { maxAge: 3600000 },
  //     resave: true,
  //     store: new RedisStore({client: redisCookie.createClient()}),
  //     saveUninitialized: true
  // }));
  //
  // app.use(passport.initialize());
  // app.use(passport.session()); // Persistent login sessions.

  // /* =============ROUTES============= */
  const login = require('./routes/login');
  const logout = require('./routes/logout');
  const users = require('./routes/users');
  const search = require('./routes/search')
  const tweets = require('./routes/tweets');
  const index = require('./routes/index');
  const load=require('./tests/test_interface');

  const populateUser = require('./middleware/populateUser');

  // app.use('/api/vi/:API_TOKEN', populateUser);
  // app.use('/api/vi/:API_TOKEN/tweets/new', function(req, res, next) {
  //   next()
  // });
  // app.use('/api/v1/:API_TOKEN/login', login);
  // app.use('/api/v1/:API_TOKEN/logout', logout);
  // app.use('/api/v1/:API_TOKEN/user', users);
  // app.use('/api/v1/:API_TOKEN/search', search);
  // app.use('/api/v1/:API_TOKEN/tweets', tweets);
  // app.use('/api/v1/:API_TOKEN/', index);
  // app.use('/api/v1/:API_TOKEN/test', load);

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
