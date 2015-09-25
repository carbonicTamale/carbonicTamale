var express = require('express');
var path = require('path');
var config = require('../config/config');

var router = express.Router();
var verify = require('./verify');

router.post('/users/friends', verify, function(req, res, next) {
  var user = req.user.username;
  var friend = req.body.friend;
  // TODO : add the friend to the user's friend list, and vice versa
  res.send('success');
});


router.post('/jams', function(req, res, next) {
  // TODO : return a unique jam id, add to DB
  res.send('jam_id');
});

router.post('/jams/:jam/users', function(req, res, next) {
  var user = req.body.user;
  // TODO : invite the user
  res.send('Invitation successful');
});



module.exports = router;
