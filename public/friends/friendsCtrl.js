(function() {
	'use strict';

	angular.module('app')
	.controller('FriendsCtrl', friendsCtrl);

	function friendsCtrl ($scope, friendsFactory) {
		$scope.friends = [];

    function getAndShowFriends () {
      friendsFactory.getFriends()
      .then(function (friends) {
        $scope.friends = friends;
      })
      .catch(function (err) {
        console.log('getAndShowFriends error: ', err);
      });
    }

    function getOnlineFriends () {
      friendsFactory.getOnlineFriends($scope.friends);
    }


    getAndShowFriends();
    getOnlineFriends();
	}
})();