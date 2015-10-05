var express = require('express');
var path = require('path');
var config = require('../config/config');
var apiRouter = require('./api.js');
var verify = require('./verify');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('trying to get here!');
  if (req.user) {
    console.log(req.user);
    res.redirect('/dashboard');
  }
  else {
    res.render('index');
  }
});

router.get('/dashboard', verify, function(req, res, next) {
  console.log("VERIFIED, GOING TO DASHBOARD");
  // res.sendFile(path.join(config.public, 'instajam.html'));
  console.log('user is actually');
  var user = {
    name : req.user.name,
    username : req.user.username,
    profile : req.user.profile
  };

  console.log('user is : ' + JSON.stringify(user));

  res.render('instajam', {user : JSON.stringify(user)});
});

console.log('api router : ' + apiRouter);

router.use('/api', apiRouter);

module.exports = router;
