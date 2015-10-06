(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory, soundFactory, playerFactory) {
    var self = this;
    var socket = playerFactory.getSocket();

    self.devices = [];

    self.key_maps = jamFactory.getKeyMaps();
    console.log('self.key_maps =', self.key_maps);

    self.users = [
      // {
      //   username: 'patrickstar',
      //   name: 'Patrick Star',
      //   instrument: 'piano',
      //   volume: 50
      // }
    ];

    connectDevices();
    setSockets();
    registerKeyMap();

    function setSockets() {
      socket.on('update room', function(players) {
        var player_names = players.map(function(player) {
          return player.username;
        });
        console.log('player_names =', player_names);
        jamFactory.addKeyMaps(player_names);
        self.keyMaps = jamFactory.getKeyMaps();
        self.users = players;
        console.log('room updated to', playerFactory.getJamRoom());
        console.log('self.users =', self.users);
        $scope.$apply();
      });

      playerFactory.connectToRoom();
      jamFactory.setSockets();
    }

    function registerKeyMap() {
      var updateKeyMap = function() {
        self.key_maps = jamFactory.getKeyMaps();
        $scope.$apply();
      };

      jamFactory.registerObserverCallback(updateKeyMap);
    }

    function connectDevices() {
      Devices
        .connect()
        .then(function(access) {
          if (access.inputs && access.inputs.size > 0) {
            var inputs = access.inputs.values();
            var input = null;

            // iterate through detected devices
            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
            	self.devices.push(input.value);
            }

            // attach listeners to all plugged in MIDI devices
            jamFactory.plugAll(self.devices);
          }
          else {
          	console.log('No devices detected!');
          }
        })
        .catch(function(e) {
        	console.log(e);
        });
    }


    self.nextInstrument = function() {
      soundFactory.nextInstrument();
    };

    self.prevInstrument = function() {
      soundFactory.prevInstrument();
    };

    self.updateVolume = function(username, volume) {
      if (username === playerFactory.getUsername())
        playerFactory.setVolume(volume);

    }

    self.disconnect = function() {
      playerFactory.disconnect();
    }
    
  }
})();
