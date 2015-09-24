(function() {
  'use strict';

  angular.module('landingApp')
    .controller('landingCtrl', landingCtrl);

  function landingCtrl($scope, $window) {
    var self = this;

    self.options = {scrolled: false};
    self.scrolled = false;

    angular.element($window).bind('scroll', function() {
      self.scrolled = (window.pageYOffset > 50);
      self.options.scrolled = (window.pageYOffset > 50);
      $scope.$apply();
    });
  }
})();
