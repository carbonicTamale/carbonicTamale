var express = require('express');
var path = require('path');
var config = require('../config/config');
var apiRouter = require('./api.js');
var verify = require('./verify');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/dashboard');
  }
  else {
    res.render('index', {user : 'de'});
  }
});

router.get('/dashboard', verify, function(req, res, next) {
  console.log("VERIFIED, GOING TO DASHBOARD");
  // res.sendFile(path.join(config.public, 'instajam.html'));
  var user = {
    name : req.user.displayName,
    username : req.user.username
  };

  res.render('instajam', {user : JSON.stringify(user)});
});

console.log('api router : ' + apiRouter);

router.use('/api', apiRouter);

module.exports = router;
