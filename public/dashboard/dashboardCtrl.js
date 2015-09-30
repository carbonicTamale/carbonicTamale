(function() {
	'use strict';

	angular.module('app')
	.controller('DashboardCtrl', dashboardCtrl);

	function dashboardCtrl() {
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
    // used for invitations later
    var socket = io();
	}
})();
