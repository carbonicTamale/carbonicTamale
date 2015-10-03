(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast, $state, jamFactory, $scope, roomName) {
    var self = this;
    console.log('this =', this);
    console.log('$scope =', $scope);
    console.log('roomName =', roomName);

    self.acceptInvite = function() {
      $state.transitionTo('jam');
      jamFactory.setRoom(roomName);
      $mdToast.hide();
    }
    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();