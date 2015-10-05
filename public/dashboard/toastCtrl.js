(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast, $state, jamFactory, $scope, username, roomName, socket) {
    var self = this;
    self.username = username;

    self.acceptInvite = function() {
      $state.transitionTo('jam');
      jamFactory.setJamState(true);
      jamFactory.setJamRoom(roomName);

      socket.emit('jam connect', roomName);
      $mdToast.hide();
    }
    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();