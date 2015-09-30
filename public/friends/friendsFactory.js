(function () {
  'use strict';

  angular.module('app')
  .factory('friendsFactory', friendsFactory);

  function friendsFactory ($http) {

    function getFriends () {

      return $http({
        method: 'GET',
        url: '/api/users/friends'
      })
      .then(function success (data) {
        return formatFriends(data.data.friends);
      }, function error (err) {
        console.log(err);
      });
    }

    var services = {
      getFriends: getFriends
    };

    return services;

    function formatFriends (friends) {
      var friend;
      var results = [];
      for(var i = 0; i < friends.length; i++) {
        friend = {
          username: friends[i].username,
          name: friends[i].name,
          email: friends[i].email
        };
        results.push(friend);
      }
      return results;
    }
  }

})();