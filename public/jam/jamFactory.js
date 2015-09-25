(function() {
	'use strict';

	angular.module('app')
	.factory('jamFactory', jamFactory);

	function jamFactory(soundFactory) {
		var self = this;
		self.device = null;
		var device_name = '';
		var socket = io('http://104.236.152.154:80');
		var roomName = '2307';

		socket.on(roomName + ' played', function(data) {
			console.log('received data');
			var key_num = data[0];
			var key_vel = data[1];
			var key_position = data[2];

			if (key_position === 'down')
				soundFactory.playSound(key_vel);
			else
				soundFactory.stopSound(key_vel);
		});


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

			// C.24 has a different midi input pattern than standard midi
			if (self.device.name === 'C.24') {
				if (key_state === 144) {
					if (key_vel !== 0) {
						keyDown(key_num, key_vel);
					}
					else {
						keyUp(key_num, key_vel);
					}
				}
			}
		}

		function keyDown(key_num, key_vel) {
			socket.emit('note event', [key_num, key_vel, 'down'], roomName);
			soundFactory.playSound(key_num, key_vel);
		}

		function keyUp(key_num, key_vel) {
			socket.emit('note event', [key_num, key_vel, 'up'], roomName);
			soundFactory.stopSound(key_num);
		}
	}
})();