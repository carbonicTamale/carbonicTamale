var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var Users = require('../Collections/Users');
var User = require('../Models/User');

var GITHUB_CLIENT_ID = "c9f79f6f0da28cfe0d5e";
var GITHUB_CLIENT_SECRET = "f9c1f12d3029fc8f23f5e851a83ec660b5318066";

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
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

  passport.serializeUser(function(user, done) {
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
      console.log(req);
      var username = req.user.username;
      var email = req.user.email;
      User.fetch({ username: username })
      .then(function (found) {
        if(!found) {
          Users.create({
            username: username,
            email: email
          });
        }
      });

      res.redirect('/');
      });
    }
  );
};

