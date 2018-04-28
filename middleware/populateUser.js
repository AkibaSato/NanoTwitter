const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

/*

Basic URL: /api/v1/:API_TOKEN/...

1. Loaderio:

Logged-in: /api/v1/loaderio/....?id=xxxxx
Set req.params.API_TOKEN to be loaderio, req.query.id to be the user id.

Non-logged-in: /api/v1/public/....

2. Browser/Postman

Logged-in: /api/v1/userId/...
Set req.params.API_TOKEN to be the user id.

Non-logged-in: /api/v1/public/...

3. Clients

Loggedin: /api/v1/userID/...?username=xxxx&password=xxxx
Set req.params.API_TOKEN to be the user id, req.query.username to be the username, and
req.query.password to be the password. These query parameters should be passed
around even in redirection from the controllers.

Non-logged-in: /api/v1/public/...

*/

// Authenticate the request so people don't abuse the token.
// If from the browser, authenticate using the browser cookie.
// If from another client, authenticate using the password.

module.exports = async (req, res, next) => {
  try {
    /* ====== 2. If the request is from browser ======= */
    if (!req.cookies || !req.cookies.ntSessionId) {
      delete req.user
      return next();
    }

    // Check the cache if the user has a session.
    var session = await redis.getAsync(req.cookies.ntSessionId);

    if (!session) { // If the user has no session, prompt to login.
      delete req.user
      return next();
    }

    req.user = JSON.parse(session).user;

    return next();

  } catch (err) {
    next();
  }
}
