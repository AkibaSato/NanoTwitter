require('newrelic')

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path    = require('path');
const redis = require('redis');
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Create a worker for each WORKERS
  for (var i = 0; i < WORKERS; i += 1) {
    console.log("Spawning workers")
    cluster.fork();
  }
  // Code to run if we're in a worker process
} else {
  var https = require('https');
  https.globalAgent.maxSockets = Infinity;
  app.https=https

  var http = require('http');
  http.globalAgent.maxSockets = Infinity;
  app.http=http

  /* ===========PARSER=========== */
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');

  // function parallel(middlewares) {
  //   return function (req, res, next) {
  //       async.each(middlewares, function (mw, cb) {
  //           mw(req, res, cb);
  //       }, next);
  //   };
  // }
  //
  // app.use(parallel([
  //       bodyParser.urlencoded({
  //           extended: true
  //       }),
  //       bodyParser.json(),
  //       express.static(config.staticFolder),
  //       cookieParser(),
  //       morgan('dev'),
  //       compression()
  //   ]));

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // Parse application/json
  app.use(bodyParser.json());
  // Parse application/vnd.api+json as json
  // app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use(cookieParser())

  /* =============VIEWS============= */
  const compression = require('compression');

  app.use(express.static("public"));
  app.engine('ejs', require('express-ejs-extend'));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'))
  app.engine('ejs', require('ejs-locals'));

  // faster loadup - shrinks the HTTP load so it can be expanded by the browser.
  app.use(compression());
  // Show flash messages to the user.
  app.set('view cache', true);

  app.use(function (req, res, next) {
    if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
      res.setHeader('Cache-Control', 'public, max-age=2h'); // cache header
    }
    next();
  });

  // /* =============ROUTES============= */
  const login = require('./routes/login');
  const logout = require('./routes/logout');
  const users = require('./routes/users');
  const search = require('./routes/search')
  const tweets = require('./routes/tweets');
  const index = require('./routes/index');
  const api = require('./routes/api');
  const test = require('./tests/test_interface');

  const populateUser = require('./middleware/populateUser');

  app.use(function(req, res, next) {
    if (req.query && req.query.loaderio == "true") {
      req.body = req.query
    }
    next();
  })

  app.use('/', populateUser);

  app.use('/api/v1/:API_TOKEN/', api);
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/user', users);
  app.use('/search', search);
  app.use('/tweets', tweets);
  app.use('/', index);
  app.use('/test', test);

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

}
