var verifyAuth = function(req, res, next) {
  if (req.user) {
    console.log('authenticated, going to next route');
    next();
  }
  else {
    console.log('not authenticated, redirecting to home page');
    res.redirect('/');
  }
};

module.exports = verifyAuth;
