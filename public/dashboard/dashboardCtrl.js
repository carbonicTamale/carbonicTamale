(function() {
	'use strict';

	angular.module('app')
	.controller('DashboardCtrl', dashboardCtrl);

	function dashboardCtrl($http) {
		var self = this;

    self.events = [
      {
        type: 'friend',
        friend: 'Chris',
      },
      {
        type: 'jam',
        jammers: [
          'Chris',
          'Matthew',
          'Blaine'
        ],
      },
      {
        type: 'friend',
        friend: 'Blaine',
      },
      {
        type: 'friend',
        friend: 'Matthew',
      },
    ];

    self.updateProfile = function() {
      console.log(self.newProfileText);
      return $http.post('/api/users/profile', {profile : self.newProfileText})
      .then(function success(data) {
        console.log('success!');
      }, function error(err) {
        console.log('profile update error!', err);
      });
    };
    // used for invitations later
    var socket = io();
	}
})();
