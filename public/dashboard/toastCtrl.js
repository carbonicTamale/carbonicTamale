(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast, $state, playerFactory, $scope, name, roomName, socket) {
    var self = this;
    self.name = name;

    self.acceptInvite = function() {
      $state.transitionTo('jam');
      playerFactory.setJamRoom(roomName);
      playerFactory.setJamState('join in progress');
      console.log('accepted jam invite');
      $mdToast.hide();
    }
    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();
