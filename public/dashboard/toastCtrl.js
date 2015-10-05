(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast, $state, jamFactory, $scope, username, roomName) {
    var self = this;
    self.username = username;

    self.acceptInvite = function() {
      $state.transitionTo('jam');
      jamFactory.setJamState(true);
      jamFactory.setRoom(roomName);

      socket.emit('jam connect', roomName);
      $mdToast.hide();
    }
    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();