(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory, soundFactory) {
    var self = this;
    var socket = playerFactory.getSocket();

    self.devices = [];
    self.volumeSlider = {
      floor: 0,
      ceil: 100,
      value: 50
    };

    self.key_map = jamFactory.getKeyMap();

    self.users = [
      {
        username: 'patrickstar',
        name: 'Patrick Star',
        instrument: 'piano',
        volume: 0.5
      }
    ];

    checkAlone();
    connectDevices();
    setSockets();
    registerKeyMap();

    function checkAlone() {
      if (jamFactory.inJam())
        return;

      jamFactory.setJamState(true);
      jamFactory.setJamRoom(Math.floor(Math.random()*10000));
    }

    function setSockets() {
      socket.on('update room', function(players) {
        self.users = players;
        console.log('room updated');
        $scope.$apply();
      });
      socket.emit('jam connect', jamFactory.getJamRoom());
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

    $scope.$watch(function() {
      return soundFactory.getInstrumentIcon();
    }, function() {
      self.users[0].instrument = soundFactory.getInstrumentIcon();
    })
  }
})();
