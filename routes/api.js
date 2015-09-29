var express = require('express');
var path = require('path');
var config = require('../config/config');
var db = require('../config/db-config');
var User = require('../Models/User');
var Users = require('../Collections/Users');
var Friend = require('../Models/Friend');

var router = express.Router();
var verify = require('./verify');

router.post('/users/friends', function (req, res, next) {
  var user = req.user.username;
  var friend = req.friend;

  Users.query(function (qb) {
    qb.where('username', '=', user)
    .orWhere('username', '=', friend)
    .select('id');
  })
  .fetch()
  .then(function (found) {

    userID = found.models[0].id;
    friendID = found.models[1].id;

    Friend.forge({ user_id: userID, friend_id: friendID })
    .save()
    .then(function (friendship) {
      res.send(friendship);
    });

  });

});

router.get('/users/friends', function (req, res, next) {
  var username = 'mracus';
  new User({ username : username }).load({friends: function(qb) {
    qb.where('friends.user_id', '=', this.id);
  }.bind(this)}).then(function(friend) {
    res.send(friend);
  });
});


router.get('/jams', function (req, res, next) {
  // TODO : return a unique jam id, add to DB

  res.send('jam_id');
});

router.post('/jams/:jam/users', function (req, res, next) {
  var user = req.body.user;
  // TODO : invite the user
  res.send('Invitation successful');
});



module.exports = router;
