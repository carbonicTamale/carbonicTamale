(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory) {

    var self = this;

		self.friends = [];
    self.onlineFriends = {};
    self.newFriend = '';

    self.addFriend = function (user) {
      friendsFactory.addFriend(user, self.newFriend)
      .then(function (data) {
        self.getAndShowFriends();
        console.log(data);
      })
      .catch(function (err) {
        console.log('addFriend error: ', err);
      });
    };

    //This handles two asynchronous systems:
    //1.) Retrieve the user's list of friends from the database
    //2.) Use that list of friends to find those who are online
    self.getAndShowFriends = function () {
      friendsFactory.getFriends()
      .then(function (friends) {
        self.friends = friends;
        self.getOnlineFriends(friends);
      })
      .catch(function (err) {
        console.log('getAndShowFriends error: ', err);
      });
    };

    self.getOnlineFriends = function (friends) {
      friendsFactory.getOnlineFriends(friends)
      .then(function (onlineFriends) {
        self.onlineFriends = onlineFriends;
      })
      .catch(function (err) {
        console.log('getOnlineFriends error: ', err);
      });
    };

    self.initialize = function () {
      self.getAndShowFriends();
    };

    self.initialize();
	}
})();