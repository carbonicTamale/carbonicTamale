(function() {
	'use strict';

	angular.module('app')
	.directive('instrument', instrument);

	function instrument() {
		var directive = {
			scope: {
				user
			},
			template: '',
			link: link
		};

		return directive;


		function link(scope, elem, attrs) {
			
		}
	}
})();