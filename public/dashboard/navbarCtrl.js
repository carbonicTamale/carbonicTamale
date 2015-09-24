(function() {
	'use strict';

	angular.module('app')
	.controller('NavbarCtrl', navbarCtrl);

	function navbarCtrl($state) {
		var self = this;
		self.state = $state;

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
				link: 'Jam',
				title: 'Jam',
				icon: 'create'
			},
			{
				link: 'settings',
				title: 'Settings',
				icon: 'settings'
			}
		];

		self.isSelected = function(title) {
			if (!self.state.current.hasOwnProperty('data'))
				return false;
			
			return (title === self.state.current.data.title);
		}
	}
})();