(function() {
  'use strict';

  angular.module('app')
  .controller('ToastCtrl', toastCtrl);

  function toastCtrl($mdToast) {
    var self = this;

    self.closeToast = function() {
      $mdToast.hide();
    }
  }

})();