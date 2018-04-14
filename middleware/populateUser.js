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
module.exports = async (req, res, next) => {
  try {
    // If it is a public page, you don't have to populate the user.
    if (req.API_TOKEN == 'public') {
      delete req.user;
      return next();
    }

    var userId;

    /* ========== 1. If the request is from loaderio. ========== */
    if (req.API_TOKEN == 'loaderio') {
      userId = req.body.id
      req.user = { id: userId };

      return next();

    }

    /*====== 2. 3. If the request is from browser or another client. ======= */

    userId = parseInt(req.API_TOKEN);

    // Check the cache if the user has a session.
    var session = await redis.getAsync(userId);

    if (!session) { // If the user has no session, prompt to login.
      return res.redirect('/api/v1/public/login');
    }

    session = JSON.parse(session);
    user = session.user;

    // Authenticate the request so people don't abuse the token.
    // If from the browser, authenticate using the browser cookie.
    // If from another client, authenticate using the password.
    if (!(req.cookies && session.ntSessionId == req.cookies.ntSessionId)
    && !(req.query && user.password == req.query.password)) {
      return res.redirect('/api/v1/public/login');
    }

    req.user = user;

    return next();

  } catch (err) {
    next();
  }


}
