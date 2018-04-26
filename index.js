// require('newrelic')

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path    = require('path');
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
  const compression = require('compression');
  const async = require('async');

  function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
  }

  app.use(parallel([
      // Parse application/x-www-form-urlencoded
      bodyParser.urlencoded({ extended: false }),
      // Parse application/json
      bodyParser.json(),
      express.static("public"),
      cookieParser(),
      // faster loadup - shrinks the HTTP load so it can be expanded by the browser.
      compression()
  ]));

  /* =============VIEWS============= */

  app.engine('ejs', require('express-ejs-extend'));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'))
  app.engine('ejs', require('ejs-locals'));

  // Show flash messages to the user.
  app.set('view cache', true);

  app.use(function (req, res, next) {
    if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
      res.setHeader('Cache-Control', 'public, max-age=2h'); // cache header
    }
    next();
  });

  app.get('/loaderio-b8095d66b5b969efcbc4abb9a440ef2f', function(req, res){
    res.send('loaderio-b8095d66b5b969efcbc4abb9a440ef2f')
  })
  // /* =============ROUTES============= */
  const login = require('./routes/login');
  const logout = require('./routes/logout');
  const users = require('./routes/users');
  const search = require('./routes/search')
  const tweets = require('./routes/tweets');
  const index = require('./routes/index');
  const api = require('./routes/api');
  const loader = require('./routes/loader');
  const test = require('./tests/test_interface');

  const populateUser = require('./middleware/populateUser');

  app.get('/loaderio-9d36f82c9435286460a24d8c3048aeeb', function(req, res){
    res.send('loaderio-9d36f82c9435286460a24d8c3048aeeb')
  })

  app.use('/user/testuser', loader);
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
