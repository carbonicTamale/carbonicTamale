(function () {
  'use strict';

  angular.module('app')
  .factory('friendsFactory', friendsFactory);

  function friendsFactory ($http, $q) {

    var socket = io();

    var onlineFriends = {};

    function addFriend (username, newFriend) {
      //The username and friend username are formatted
      //according to how the server api will expect them
      var data = {
        username: username,
        friend: newFriend
      };
      //The promise $http is returned so that our controller
      //can call the getAndShowFriends function to render 
      //the newly-updated list of friends.
      return $http.post('/api/users/friends', data)
      .then(function success(data) {
        return data;
      }, function error(err) {
        console.log('addFriends http request error:', err);
      });
    }

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
    //Emit socket event and then return the value from our promisified function
    //The return value of the promisified receiveOnlineFriends will be an object with the list of online friends.
    function getOnlineFriends (friendsList) {
      
      socket.emit('get-online-friends', friendsList);
      return receiveOnlineFriends();
    }
    //Use $q to create a promise object from the sockets.on listener.
    //This allows us to return the async function's object back to the controller.
    function receiveOnlineFriends() {

      return $q(function (resolve, reject) {
        socket.on('send-online-friends', function (friends) {
          if (friends) {
            var onlineFriends = {};
            for(var i = 0; i < friends.length; i++) {
              onlineFriends[friends[i]] = friends[i];
            }
            resolve(onlineFriends);
          } else {
            reject('online friends not available');
          }
        });
      });
    }

    var services = {
      getOnlineFriends: getOnlineFriends,
      getFriends: getFriends,
      addFriend: addFriend
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