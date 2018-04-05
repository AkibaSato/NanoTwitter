const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path    = require('path');
const redis = require('redis');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

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

  /* =============PASSPORT============= */
  const passport = require('passport');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const RedisStore = require('connect-redis')(session)

  require('./config/passport')(passport);

  // required for passport
  app.use(cookieParser());

  app.use(session({
      // secret: process.env.SECRET || 'enteryoursecrethere',
      secret: 'enteryoursecrethere',
      cookie: { maxAge: 3600000 },
      resave: true,
      store: new RedisStore(),
      saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // Persistent login sessions.

  // /* =============ROUTES============= */
  const login = require('./routes/login');
  const logout = require('./routes/logout');
  const users = require('./routes/users');
  const search = require('./routes/search')
  const tweets = require('./routes/tweets');
  const index = require('./routes/index');
  const load=require('./tests/test_interface');

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
    res.render('errhbor', { res : res, user: req.user });
  });

  app.listen(port);
  exports = module.exports = app;
}
