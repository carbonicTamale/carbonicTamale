var express = require('express');
var path = require('path');
var config = require('../config');

var router = express.Router();
var verify = require('./verify');

router.get('/users/addFriend', verify, function(req, res, next) {
  var user = req.user.username;
  var friend = req.body.friend;
  //DB stuff
  res.send('success');
});

module.exports = router;
