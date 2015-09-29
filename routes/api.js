var express = require('express');
var path = require('path');
var config = require('../config/config');
var db = require('../config/db-config');
var User = require('../Models/User');
var Users = require('../Collections/Users');
var Friend = require('../Models/Friend');
var Friends = require('../Collections/Friends');

var router = express.Router();
var verify = require('./verify');

router.post('/users/friends', function (req, res, next) {
  //how are these coming in on the req body? 
  //This will need to be updated.
  var user = req.user.username;
  var friend = req.body.friend;
  console.log(user, friend);
  //First retrieve the two users by query on their usernames
  Users.query(function (qb) {
    qb.where('username', '=', user)
    .orWhere('username', '=', friend)
    .select('id');
  })
  .fetch()
  .then(function (found) {
    if(found.models.length !== 2) {
      res.sendStatus(404);
    }
    //Grab their IDs from the retrieved models.
    userID = found.models[0].id;
    friendID = found.models[1].id;
    //Save a friend relationship to the friends table using those IDs.
    Friend.forge({ user_id: userID, friend_id: friendID })
    .save()
    .then(function (friendship) {
      res.send(friendship);
    });

  });

});

router.get('/users/friends', function (req, res, next) {
  var username = req.user.username;

  new User({ 'username': username })
  .fetch({withRelated:['friends']})
  .then(function(friends) {
    res.send(friends);
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
