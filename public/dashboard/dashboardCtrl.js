(function() {
	'use strict';

	angular.module('app')
	.controller('DashboardCtrl', dashboardCtrl);

	function dashboardCtrl() {
		var self = this;

    // used for invitations later
    var socket = io();
	}
})();