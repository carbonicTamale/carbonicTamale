(function () {
  'use strict';

  angular.module('app')
  .factory('friendsFactory', friendsFactory);

  function friendsFactory ($http, $q, playerFactory) {
    var services = {
      getFriends: getFriends,
      addFriend: addFriend
    };

    var socket = playerFactory.getSocket();

    var onlineFriends = {};

    return services;

    function addFriend(friend, callback) {
      var data = {
        username: playerFactory.getUsername(),
        friend: friend
      };

      $http.post('/api/users/friends', data)
      .then(function(data) {
        callback();
      }, function(err) {
        callback(null, true);
        console.log('error adding friend');
      });
    }

    function getFriends(callback) {
      $http.get('/api/users/friends')
      .then(function(res) {
        var friends = formatFriends(res.data.friends);
        callback(friends);
      }, function(err) {
        console.log('error retrieving friends');
      });
    }

    function formatFriends(friends) {
      return friends.map(function(friend) {
        return {
          username: friend.username,
          name: friend.name,
          email: friend.email
        };
      });
    }


    // function getFriends () {

    //   return $http({
    //     method: 'GET',
    //     url: '/api/users/friends'
    //   })
    //   .then(function success(res) {
    //     return formatFriends(res.data.friends);
    //   }, function error(err) {
    //     console.log('getFriends http request error: ', err);
    //   });
    // }
    // //Emit socket event and then return the value from our promisified function
    // //The return value of the promisified receiveOnlineFriends will be an object with the list of online friends.
    // function getOnlineFriends (friendsList) {
    //   socket.emit('get online friends', friendsList);
    //   return receiveOnlineFriends();
    // }
    // //Use $q to create a promise object from the sockets.on listener.
    // //This allows us to return the async function's object back to the controller.
    // function receiveOnlineFriends() {

    //   return $q(function (resolve, reject) {
    //     socket.on('send online friends', function (friends) {
    //       if (friends) {
    //         var onlineFriends = {};
    //         for(var i = 0; i < friends.length; i++) {
    //           onlineFriends[friends[i]] = friends[i];
    //         }
    //         resolve(onlineFriends);
    //       } else {
    //         reject('online friends not available');
    //       }
    //     });
    //   });
    // }

    // function addFriend (username, newFriend) {
    //   //The username and friend username are formatted
    //   //according to how the server api will expect them
    //   var data = {
    //     username: username,
    //     friend: newFriend
    //   };
    //   //The promise $http is returned so that our controller
    //   //can call the getAndShowFriends function to render 
    //   //the newly-updated list of friends.
    //   return $http.post('/api/users/friends', data)
    //   .then(function success(data) {
    //     return data;
    //   }, function error(err) {
    //     console.log('addFriends http request error:', err);
    //   });
    // }

    // function formatFriends (friends) {
    //   var friend;
    //   var results = [];
    //   for(var i = 0; i < friends.length; i++) {
    //     friend = {
    //       username: friends[i].username,
    //       name: friends[i].name,
    //       email: friends[i].email
    //     };
    //     results.push(friend);
    //   }
    //   return results;
    // }
  }

})();