(function() {
	'use strict';

	angular.module('app')
	.factory('jamFactory', jamFactory);

	function jamFactory() {
		var self = this;
		self.device = null;
		var device_name = '';

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

		function onmidimessage(e) {
			var key_state = e.data[0];
			var key_num = e.data[1];
			var key_vel = e.data[2];

			if (self.device.name === 'C.24') {
				if (key_state === 144) {
					if (key_vel !== 0)
						// key down
						console.log(key_num, key_vel);
					else {
						// key up
					}
				}
			}

		}
	}
})();