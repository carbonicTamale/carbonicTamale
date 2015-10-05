(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory, soundFactory, playerFactory) {
    var self = this;
    var socket = playerFactory.getSocket();

    self.devices = [];

    self.key_map = jamFactory.getKeyMap();

    self.users = [
      {
        username: 'patrickstar',
        name: 'Patrick Star',
        instrument: 'piano',
        volume: 50
      }
    ];

    connectDevices();
    setSockets();
    registerKeyMap();

    function setSockets() {
      socket.on('update room', function(players) {
        self.users = players;
        console.log('room updated');
        $scope.$apply();
      });

      playerFactory.connectToRoom();
    }

    function registerKeyMap() {
      var updateKeyMap = function() {
        self.key_map = jamFactory.getKeyMap();
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

    // $scope.$watch(function() {
    //   return soundFactory.getInstrumentIcon();
    // }, function() {
    //   self.users[0].instrument = soundFactory.getInstrumentIcon();
    // });

    $scope.$watch(function() {
      return self.users;
    }, function() {
      for (var i=0; i<self.users.length; i++) {
        if (self.users[i].username === playerFactory.getUsername()) {
          if (self.users[i].volume === playerFactory.getVolume())
            return;

          playerFactory.setVolume(self.users[i].volume);
          return;
        }
      }
    }, true);
  }
})();
