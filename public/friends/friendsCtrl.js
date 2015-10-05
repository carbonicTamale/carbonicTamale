(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory, playerFactory) {
    var self = this;
    var socket = playerFactory.getSocket();

		self.friends = [];
    self.onlineFriends = {};

    setListeners();

    self.addFriend = function(friend) {
      friendsFactory.addFriend(friend, function(friends) {
        updateFriends();
      });
    }

    function updateFriends() {
      friendsFactory.getFriends(function(friends) {
        self.friends = friends;
        socket.emit('get online friends', friends);
      });

    }

    function setListeners() {
      socket.on('send online friends', function(onlineFriends) {
        self.onlineFriends = onlineFriends;
      });
      socket.on('friend online', function() {
        updateFriends();
      })
    }

    // //This handles two asynchronous systems:
    // //1.) Retrieve the user's list of friends from the database
    // //2.) Use that list of friends to find those who are online
    // self.getAndShowFriends = function () {
    //   friendsFactory.getFriends()
    //   .then(function (friends) {
    //     self.friends = friends;
    //     self.getOnlineFriends(friends);
    //   })
    //   .catch(function (err) {
    //     console.log('getAndShowFriends error: ', err);
    //   });
    // };

    // self.getOnlineFriends = function (friends) {
    //   friendsFactory.getOnlineFriends(friends)
    //   .then(function (onlineFriends) {
    //     self.onlineFriends = onlineFriends;
    //   })
    //   .catch(function (err) {
    //     console.log('getOnlineFriends error: ', err);
    //   });
    // };

    // self.initialize = function () {
    //   self.getAndShowFriends();
    // };
    // self.addFriend = function (user) {
    //   friendsFactory.addFriend(user, self.newFriend)
    //   .then(function (data) {
    //     self.getAndShowFriends();
    //     console.log(data);
    //   })
    //   .catch(function (err) {
    //     console.log('addFriend error: ', err);
    //   });
    // };

    // self.initialize();
	}
})();