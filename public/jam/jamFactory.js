(function() {
	'use strict';

	angular.module('app')
	.factory('jamFactory', jamFactory);

	function jamFactory(soundFactory, $document) {
		var self = this;

		var services = {
			plug: plug,
			plugAll: plugAll,
			getKeyMap: getKeyMap,
			registerObserverCallback: registerObserverCallback,
			setJamState: setJamState,
			inJam: inJam,
			getJamRoom: getJamRoom,
			setJamRoom: setJamRoom
		};

		self.device = null;
		var device_name = '';
		var device_names = [];
		var socket = io('http://localhost:80');
		var observerCallbacks = [];
		var key_map = [];
		var username = '';
		var in_jam = false;
		var jam_room = '2307';

		setSockets();
		fillKeyMap();
		setKeyboardBindings();

		return services;

		function getJamRoom() {
			return jam_room;
		}

		function setSockets() {
			socket.on(jam_room + ' event', function(data) {
				console.log('received data', data);
				var key_num = data[0];
				var key_vel = data[1];
				var key_position = data[2];

				if (data.down)
					soundFactory.playSound(data.key_num, data.key_vel);
				else
					soundFactory.stopSound(data.key_num);
			});
		}

		function setKeyboardBindings() {
			var keyboard_piano = {
				65: '43',
				79: '46',
				69: '48',
				85: '51',
				73: '53',
				68: '54',
				72: '55',
				84: '58',
				78: '60',
				83: '63',
				189: '65'
			};

			var keyboard_down = {
				65: false,
				79: false,
				69: false,
				85: false,
				73: false,
				68: false,
				72: false,
				84: false,
				78: false,
				83: false,
				189: false
			};

			$document.on('keydown', function(e) {
				if (!keyboard_piano.hasOwnProperty(e.which))
					return;

				if (keyboard_down[e.which])
					return;

				keyDown(keyboard_piano[e.which], 0.5 * 127);
				keyboard_down[e.which] = true;
			});

			$document.on('keyup', function(e) {
				if (!keyboard_piano.hasOwnProperty(e.which))
					return;

				keyboard_down[e.which] = false;
				keyUp(keyboard_piano[e.which], 0);
			});
		}

		function setJamRoom(roomNum) {
			jam_room = roomNum;
		}

		function setJamState(state) {
			in_jam = state;
		}

		function inJam() {
			return in_jam;
		}

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

		function plugAll(devices) {
			for (var i=0; i<devices.length; i++) {
				devices[i].onmidimessage = onmidimessage;
			}
		}

		function fillKeyMap() {
			for (var i=0; i<=97; i++) {
				key_map.push(1);
			}
		}

		function getKeyMap() {
			return key_map;
		}

		function onmidimessage(e) {
			var key_state = e.data[0];
			var key_num = e.data[1];
			var key_vel = e.data[2];
			// C.24 has a different midi input pattern than standard midi
			if (this.name === 'C.24') {
				if (key_state === 144) {
					if (key_vel !== 0) {
						keyDown(key_num, key_vel);
					}
					else {
						keyUp(key_num, key_vel);
					}
				}
			}
			else if (this.name === 'USB Axiom 49') {
				if (key_vel !== 0) {
					keyDown(key_num, key_vel);
				}
				else {
					keyUp(key_num, key_vel);
				}
			}
		}

		function keyDown(key_num, key_vel) {
			var data = {
				username: username,
				key_num: key_num,
				key_vel: key_vel,
				down: true
			}
			socket.emit('note event', data, roomName);
			soundFactory.playSound(key_num, key_vel);
			if (key_num-23 >= 0) key_map[key_num-23] = key_vel/4+1;
			if (key_num-22 >= 0) key_map[key_num-22] = key_vel/2+1;
			if (key_num-20 <= 97) key_map[key_num-20] = key_vel/2+1;
			if (key_num-19 <= 97) key_map[key_num-19] = key_vel/4+1;
			key_map[key_num-21] = key_vel+1;
			notifyObservers();
		}

		function keyUp(key_num, key_vel) {
			var data = {
				username: username,
				key_num: key_num,
				key_vel: key_vel,
				down: false
			}
			socket.emit('note event', data, roomName);
			soundFactory.stopSound(key_num);
			if (key_num-23 >= 0) key_map[key_num-23] = key_vel/4+1;
			if (key_num-22 >= 0) key_map[key_num-22] = key_vel/2+1;
			if (key_num-20 <= 97) key_map[key_num-20] = key_vel/2+1;
			if (key_num-19 <= 97) key_map[key_num-19] = key_vel/4+1;
			key_map[key_num-21] = key_vel+1;
			notifyObservers();
		}

		function registerObserverCallback(callback) {
			observerCallbacks.push(callback);
		}

		function notifyObservers() {
			for (var i = 0; i < observerCallbacks.length; i++) {
				observerCallbacks[i]();
			};
		}
	}
})();