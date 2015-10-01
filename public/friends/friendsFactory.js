(function () {
  'use strict';

  angular.module('app')
  .factory('friendsFactory', friendsFactory);

  function friendsFactory ($http) {

    var socket = io();

    function getFriends () {

      return $http({
        method: 'GET',
        url: '/api/users/friends'
      })
      .then(function success (data) {
        return formatFriends(data.data.friends);
      }, function error (err) {
        console.log('getFriends http request error: ', err);
      });
    }

    function getOnlineFriends (friends) {
      socket.emit('get-online-friends');
      socket.on('send-online-friends', function (friends) {
        console.log(friends);
      });
    }

    var services = {
      getOnlineFriends: getOnlineFriends,
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