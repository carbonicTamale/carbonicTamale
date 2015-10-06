(function() {
	'use strict';

	angular.module('app')
	.factory('jamFactory', jamFactory);

	function jamFactory(soundFactory, $document, playerFactory) {
		var services = {
			setSockets: setSockets,
			plug: plug,
			plugAll: plugAll,
			getKeyMaps: getKeyMaps,
			addKeyMaps: addKeyMaps,
			registerObserverCallback: registerObserverCallback,
			setKeyboardBindings: setKeyboardBindings
		};
		
		var self = this;
		self.device = null;
		var device_name = '';
		var device_names = [];
		var socket = io('http://104.236.152.154:8080');
		var observerCallbacks = [];
		var key_maps = {};
		var username = playerFactory.getUsername();
		console.log('username =', username);

		setSockets();
		fillKeyMap();
		setKeyboardBindings();

		return services;

		function setSockets() {
			socket.on(playerFactory.getJamRoom() + ' event', function(data) {
				console.log('received data', data);

				updateKeyMap(data);

				if (data.down)
					soundFactory.playSound(data.key_num, data.key_vel, data.instrument);
				else
					soundFactory.stopSound(data.key_num, data.instrument);
			});
		}

		function updateKeyMap(data) {
			var key_num = data.key_num;
			var key_vel = data.key_vel;

			if (key_num-23 >= 0) key_maps[data.username][key_num-23] = key_vel/4+1;
			if (key_num-22 >= 0) key_maps[data.username][key_num-22] = key_vel/2+1;
			if (key_num-20 <= 97) key_maps[data.username][key_num-20] = key_vel/2+1;
			if (key_num-19 <= 97) key_maps[data.username][key_num-19] = key_vel/4+1;
			key_maps[data.username][key_num-21] = key_vel+1;
			notifyObservers();
		}

		function addKeyMaps(names) {
			for (var i=0; i<names.length; i++) {
				if (!key_maps.hasOwnProperty(names[i]))
					key_maps[names[i]] = createKeyMap();
			}
		}

		function createKeyMap() {
			var key_map = [];
			for (var i=0; i<=97; i++) {
				key_map.push(1);
			}
			return key_map;
		}

		function setKeyboardBindings() {
			var keyboard_bindings, keyboard_down;
			var instrument = playerFactory.getInstrument();
			if (instrument === 'drums') {
				keyboard_bindings = {
					16: '36',
					65: '43',
					81: '52',
					83: '39',
					87: '50'
				};

			keyboard_down = {
					16: false,
					65: false,
					81: false,
					83: false,
					87: false
				};
			}
			else {
				keyboard_bindings = {
					65: '43',
					83: '46',
					68: '48',
					70: '51',
					71: '53',
					72: '54',
					74: '55',
					75: '58',
					76: '60',
					186: '63',
					222: '65'
				};

				keyboard_down = {
					65: false,
					83: false,
					68: false,
					70: false,
					71: false,
					72: false,
					74: false,
					75: false,
					76: false,
					186: false,
					222: false
				};
			}

			$document.on('keydown', function(e) {
				if (!keyboard_bindings.hasOwnProperty(e.which))
					return;

				if (keyboard_down[e.which])
					return;

				keyDown(keyboard_bindings[e.which], 0.5 * 127);
				keyboard_down[e.which] = true;
			});

			$document.on('keyup', function(e) {
				if (!keyboard_bindings.hasOwnProperty(e.which))
					return;

				keyboard_down[e.which] = false;
				keyUp(keyboard_bindings[e.which], 0);
			});
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
				console.log('device name =', devices[i].name);
			}
		}

		function fillKeyMap() {
			key_maps[username] = [];
			for (var i=0; i<=97; i++) {
				key_maps[username].push(1);
			}
		}

		function getKeyMaps() {
			return key_maps;
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
			else if (this.name.match(/Axiom/)) {
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
				username: playerFactory.getUsername(),
				key_num: key_num,
				key_vel: key_vel,
				down: true,
				instrument: playerFactory.getInstrument()
			}
			socket.emit('note event', data, playerFactory.getJamRoom());
			soundFactory.playSound(key_num, key_vel, playerFactory.getInstrument());
			if (key_num-23 >= 0) key_maps[username][key_num-23] = key_vel/4+1;
			if (key_num-22 >= 0) key_maps[username][key_num-22] = key_vel/2+1;
			if (key_num-20 <= 97) key_maps[username][key_num-20] = key_vel/2+1;
			if (key_num-19 <= 97) key_maps[username][key_num-19] = key_vel/4+1;
			key_maps[username][key_num-21] = key_vel+1;
			notifyObservers();
		}

		function keyUp(key_num, key_vel) {
			var data = {
				username: playerFactory.getUsername(),
				key_num: key_num,
				key_vel: key_vel,
				down: false,
				instrument: playerFactory.getInstrument()
			}
			socket.emit('note event', data, playerFactory.getJamRoom());
			soundFactory.stopSound(key_num, playerFactory.getInstrument());
			if (key_num-23 >= 0) key_maps[username][key_num-23] = key_vel/4+1;
			if (key_num-22 >= 0) key_maps[username][key_num-22] = key_vel/2+1;
			if (key_num-20 <= 97) key_maps[username][key_num-20] = key_vel/2+1;
			if (key_num-19 <= 97) key_maps[username][key_num-19] = key_vel/4+1;
			key_maps[username][key_num-21] = key_vel+1;
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