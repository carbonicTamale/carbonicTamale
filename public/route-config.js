(function() {
	'use strict';


	angular.module('app')
	.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'dashboard/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard',
				data: {
					title: 'Dashboard'
				}
			})
			.state('friends', {
				url: '/friends',
				templateUrl: 'friends/friends.html',
				controller: 'FriendsCtrl',
				controllerAs: 'friends',
				data: {
					title: 'Friends'
				}
			})
			.state('jam', {
				url: '/jam',
				templateUrl: 'jam/jam.html',
				controller: 'JamCtrl',
				controllerAs: 'jam',
				data: {
					title: 'Jam'
				}
			});

	}
})();