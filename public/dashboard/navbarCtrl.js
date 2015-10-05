(function() {
  'use strict';

  angular.module('app')
  .controller('NavbarCtrl', navbarCtrl);

  function navbarCtrl($state, $mdToast, soundFactory, jamFactory, playerFactory) {
    var self = this;

    var socket = playerFactory.getSocket();

    self.user = {
      name: 'Marcus Buffett',
      email: 'ilovechicken@gmail.com'
    };

    self.menu = [
      {
        link: 'dashboard',
        title: 'Dashboard',
        icon: 'dashboard'
      },
      {
        link: 'friends',
        title: 'Friends',
        icon: 'group'
      },
      {
        link: 'jam',
        title: 'Jam',
        icon: 'create'
      }
    ];

    socket.on('receive jam invite', function(invitation) {
      console.log('received jam invite');
      console.log('invitation.name =', invitation.name);
      $mdToast.show({
        templateUrl: 'dashboard/toast-invite.html',
        hideDelay: 0,
        position: 'bottom right',
        controller: 'ToastCtrl',
        controllerAs: 'toast',
        locals: {
          name: invitation.name,
          roomName: invitation.roomName,
          socket: socket
        },
      });
    });

    soundFactory.populateSoundFiles().then(function() {
      console.log('sound files loaded');
    });

    self.isSelected = function(title) {
      if (!$state.current.hasOwnProperty('data'))
        return false;
      
      return (title === $state.current.data.title);
    };

    self.setUser = function(user) {
      self.user = user;
      playerFactory.setUser(user);
    };

    self.inviteFriend = function(friend) {
      console.log('friend =', friend);
      var roomName = '' + Math.floor(Math.random() * 1000);
      socket.emit('jam create', roomName);
      socket.emit('send jam invite', friend, roomName);
      jamFactory.setJamState(true);
      jamFactory.setJamRoom(roomName);

      $state.transitionTo('jam');
    };

	}
})();
