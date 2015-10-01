(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory) {

    var self = this;

		self.friends = [];
    self.onlineFriends = {};

    function getAndShowFriends () {
      friendsFactory.getFriends()
      .then(function (friends) {
        self.friends = friends;
        friendsFactory.getOnlineFriends(friends)
        .then(function (onlineFriends) {
          self.onlineFriends = onlineFriends;
        });
      })
      .catch(function (err) {
        console.log('getAndShowFriends error: ', err);
      });
    }

    function showOnlineFriends () {
      friendsFactory.getOnlineFriends(self.friends);
    }

    function initialize () {
      getAndShowFriends();
    }

    initialize();
	}
})();