(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory, playerFactory) {

    var self = this;
    var socket = playerFactory.getSocket();

    self.friends = [];
    self.onlineFriends = {};
    self.addFriendError = false;
    self.allUsers = [];


    //Fetch all users in the database in order to use in the autocomplete for the add friend form.
    function getAllUsers () {
      friendsFactory.getAllUsers(function (users, error) {
        self.allUsers = users;
      });
    }

    //Write new friendship to the database, if there is an error on the server side,
    //then display the warning message to the user.
    self.addFriend = function(friend) {
      friendsFactory.addFriend(friend, function (friends, error) {
        updateFriends();
        self.addFriendError = error ? true : false;
      });
    };

    //Display most current list of friends
    //and then emit socket event to get list of who is online.
    function updateFriends() {
      friendsFactory.getFriends(function (friends) {
        self.friends = friends;
        socket.emit('get online friends', friends);
      });

    }

    function setListeners() {
      socket.on('send online friends', function (onlineFriends) {
        self.onlineFriends = onlineFriends;
      });
      socket.on('friend online', function() {
        updateFriends();
      });
    }

    function initialize () {
      getAllUsers();
      updateFriends();
      setListeners();
    }

    initialize();

	}
})();
