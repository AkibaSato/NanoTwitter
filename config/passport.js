const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  // The login request establishes a session maintained in a browser cookie.
  // Requests after the login request not contain credentials,
  // but rather the unique cookie that identifies the session. The user object
  // is constructed to and from the ID in the cookie.

  // Converts user to user id.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //  Converts user id to user, stored in req.user.
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(err) {
      done(err);
    });
  });

  /* ============Login============ */
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true // Send entire request for flash message.
  }, loginCallback));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  }, signupCallback));

};

function loginCallback(req, username, password, done) {
  if (req.isAuthenticated) {
    return done(null, req.user);
  }
  //  Look up the user by username
  User.findOne({'username': username}).then(function(user) {
    if (!user) {
      return done(null, false, req.flash('loginUsernameMessage', 'Wrong username.'));
    }

    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginPasswordMessage', 'Wrong password.'));
    }
    return done(null, user);
  }).catch(function(err) {
    console.log('Error finding user', err);
    done(err);
  });
}

function signupCallback(req, username, password, done) {
  // Asynchronous. User.findOne wont fire unless data is sent back
  process.nextTick(function() {

    // Find a user whose email is the same as the forms email.
    // We are checking to see if the user trying to login already exists.
    User.findOne({'username': username}).then(function(user) {
      // Check to see if theres already a user with that email.
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email or username is already taken.'));
      }
      // If there is no user with that email, create the user.
      var newUser = new User();

      // Set the user's local credentials
      newUser.username = username;
      newUser.password = password;
      newUser.fname = req.body.fname;
      newUser.lname = req.body.lname;

      // Save the user
      newUser.save(function(err) {
        if (err) {
          throw err;
        }
        return done(null, newUser);
      });

    }).catch(function(err) {
      console.log('Error finding user', err);
      done(err);
    });
  });
}
