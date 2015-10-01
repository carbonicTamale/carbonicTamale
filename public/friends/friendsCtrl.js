(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory) {

    var self = this;

		self.friends = [];
    self.onlineFriends = {};

    //This handles two asynchronous systems:
    //1.) Retrieve the user's list of friends from the database
    //2.) Use that list of friends to find those who are online
    function getAndShowFriends () {
      friendsFactory.getFriends()
      .then(function (friends) {
        self.friends = friends;
        getOnlineFriends(friends)
      })
      .catch(function (err) {
        console.log('getAndShowFriends error: ', err);
      });
    }

    function getOnlineFriends (friends) {
      friendsFactory.getOnlineFriends(friends)
      .then(function (onlineFriends) {
        self.onlineFriends = onlineFriends;
      })
      .catch(function (err) {
        console.log('getOnlineFriends error: ', err);
      });
    }

    function initialize () {
      getAndShowFriends();
    }

    initialize();
	}
})();