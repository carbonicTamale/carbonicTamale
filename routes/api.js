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

//POST /api/users/friends
router.post('/users/friends', function (req, res, next) {

  //The request body expects a username and a friend's username.
  var user = req.body.username;
  var friend = req.body.friend;

  //First retrieve the two users by query on their usernames
  Users.query(function (qb) {
    qb.where('username', '=', user)
    .orWhere('username', '=', friend)
    .select('id');
  })
  .fetch()
  //If two records are not retrieved, send a 404.
  .then(function (found) {
    if(found.models.length !== 2) {
      res.sendStatus(404);
      return;
    }
    //Grab their IDs from the retrieved models.
    userID = found.models[0].id;
    friendID = found.models[1].id;
    //Save a friend relationship to the friends table using those IDs.
    Friend.forge({ 'user_id': userID, 'friend_id': friendID })
    .save()
    .then(function (friendship) {
      Friend.forge({'user_id': friendID, 'friend_id': userID})
      .save()
      .then(function (friendship) {
        res.send('friendship saved');
      });
    });

  });

});

//GET /api/users/friends
router.get('/users/friends', function (req, res, next) {
  //The session already has the user's info stored in each request object's user property.
  //We'll query the database with the username from that.
  var username = req.user ? req.user.username : res.sendStatus(404);

  //This query returns all Friend Models where a friendship is defined in the friends table
  //with the current user. We send those all back in the response.
  new User({ 'username': username })
  .fetch({ withRelated: ['friends'] })
  .then(function(friends) {
    res.send(friends);
  }); 
});

router.post('/users/profile', function(req, res, next) {
  var username = req.user.username;
  new User({username : username})
  .fetch()
  .then(function(found) {
    found.set('profile', req.body.profile);
    found.save();
    res.end();
  });
});

router.get('/events', function (req, res, next) {
  var username = req.user.username;
  new User({ 'username': username })
  .fetch({ withRelated: ['friends'] })
  .then(function(friends) {
    var events = [];
    // for (var i = 0; i < friends.friends.length; i++) {
      // events.push({
        // friend: friends.friends[i],
        // type: 'friend'
      // });
      // console.log('once');
    // }
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
