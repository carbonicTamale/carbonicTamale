(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory) {
		$scope.friends = [];

    function getAndShowFriends () {
      friendsFactory.getFriends()
      .then(function (friends) {
        console.log('friends', friends);
        $scope.friends = friends;
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    getAndShowFriends();
	}
})();