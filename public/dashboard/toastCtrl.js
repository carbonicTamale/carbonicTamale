(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast, $state, jamFactory, $scope, name, roomName, socket) {
    var self = this;
    self.name = name;

    self.acceptInvite = function() {
      $state.transitionTo('jam');
      jamFactory.setJamState(true);
      jamFactory.setJamRoom(roomName);

      console.log('accepted jam invite');
      $mdToast.hide();
    }
    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();
