(function() {
	'use strict';

	angular.module('app')
	.factory('jamFactory', jamFactory);

	function jamFactory() {
		var self = this;
		self.device = null;

		var services = {
			plug: plug
		}

		return services;

		function unplug() {
			self.device = null;
			self.device.onmidimessage = null;
		}

		function plug(device) {
			if (device) {
				if (self.device)
					unplug();

				self.device = device;
				self.device.onmidimessage = onmidimessage;
			}
		}

		function onmidimessage() {
			
		}
	}
})();