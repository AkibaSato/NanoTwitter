const redis = require('../config/redis');
const Sequelize = require('sequelize');
const User = require('../models').User;

/*

Basic URL: /api/v1/:API_TOKEN/...

1. Loaderio:

  Logged-in: /api/v1/loaderio/....?username=xxxx&password=xxxx
     Set req.query.username to be the username, and req.query.password to be the password.
     These query parameters should be passed around even in redirection from the
     controllers.

  Non-logged-in: /api/v1/public/....

2. Browser/Postman

  Logged-in: /api/v1/:username/...
    Set req.params.username to be the username.

  Non-logged-in: /api/v1/public/...

3. Clients

  Loggedin: /api/v1/:username/...?username=xxxx&password=xxxx
    Set req.query.username to be the username, and req.query.password to be the password.
    These query parameters should be passed around even in redirection from the
    controllers.

  Non-logged-in: /api/v1/public/...

*/
module.exports = async (req, res, next) => {
  try {
    // If it is a public page, you don't have to populate the user.
    if (req.API_TOKEN == 'public') {
      // delete req.user;
      return next();
    }

    var username;

    /* ========== 1. If the request is from loaderio. ========== */
    if (req.API_TOKEN == 'loaderio') {
      userId = req.body.id
      // Check the cache if the user has a session.
      var session = await redis.getAsync(userId);

      if (!user) { // If cache miss, fetch from the database.

        await redis.setAsync(user.username,
          JSON.stringify({ sessionId: sessionId, user: { id: id } });

      } else {
        user = JSON.parse(session.user)
      }
      //
      // // Authenticate the request so people don't abuse the token.
      // if (!user || !User.validatePassword(user.password, req.query.password)) {
      //   return res.redirect('/api/v1/public/login');
      // }

      res.cookie('sessionId', sessionId);
      res.redirect('/api/v1/' + user.username + '/');
      req.user = user;

      next();

    } else {
      /*====== 2. 3. If the request is from browser or another client. ======= */

      username = req.params.API_TOKEN;

      console.log("username is ", username)
      // Check the cache if the user has a session.
      var session = await redis.getAsync(username);

      if (!session) { // If the user has no session, prompt to login.
        return res.redirect('/api/v1/public/login');
      }

      session = JSON.parse(session);

      user = session.user;

      console.log("cookies are: ", session.ntSessionId, " ", req.cookies.ntSessionId)

      // Authenticate the request so people don't abuse the token.
      // If from the browser, authenticate using the browser cookie.
      // If from another client, authenticate using the password.
      if (!(req.cookies && session.ntSessionId == req.cookies.ntSessionId)
        && !(req.body && user.password == req.body.password)) {
        return res.redirect('/api/v1/public/login');
      }

      req.user = user;

      console.log(req.user);
      return next();

    }

  } catch (err) {
    console.log(err)
    next();
  }


}
