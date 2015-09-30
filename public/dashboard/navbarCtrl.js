(function() {
  'use strict';

  angular.module('app')
  .controller('NavbarCtrl', navbarCtrl);

  function navbarCtrl($state, $mdToast) {
    var self = this;

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

    self.isSelected = function(title) {
      if (!$state.current.hasOwnProperty('data'))
        return false;
      
      return (title === $state.current.data.title);
    };

    self.showToast = function() {
      $mdToast.show({
        templateUrl: 'dashboard/toast-invite.html',
        hideDelay: 0,
        position: 'bottom right',
        controller: 'ToastCtrl',
        controllerAs: 'toast'
      });
    }
  }
})();