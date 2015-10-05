(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory, soundFactory) {
    var self = this;
    var socket = io();

    self.devices = [];
    self.volumeSlider = {
      floor: 0,
      ceil: 100,
      value: 50
    };

    self.key_map = jamFactory.getKeyMap();

    self.users = [
      {
        name: 'Patrick Star',
        instrument: 'piano',
        volume: 0.5
      }
    ];

    connectDevices();
    setSockets();
    registerKeyMap();
    self.users[0].instrument = soundFactory.getInstrumentIcon();

    function setSockets() {
      socket.on('update room', function(players) {
        self.users = players;
        console.log('room updated');
        $scope.$apply();
      });
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
