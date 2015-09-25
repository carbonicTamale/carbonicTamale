var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var Users = require('../Collections/Users');
var User = require('../Models/User');
var config = require('../config/config');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new GitHubStrategy({
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get('/auth/github',
    passport.authenticate('github'));

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      var username = req.user.username;
      var email = req.user.emails[0].value;
      var name = req.user.displayName;
      new User({ username: username }).fetch()
      .then(function (found) {
        if(!found) {
          Users.create({
            name: name,
            username: username,
            email: email
          }).then(function(newUser) {
            res.redirect('/');
          });
        } else {
          res.redirect('/');
        }
      });
  });
};

