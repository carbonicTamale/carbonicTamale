(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory) {
    var self = this;
    self.devices = [];
    self.volumeSlider = {
      floor: 0,
      ceil: 100,
      value: 50
    };

    self.key_map = jamFactory.getKeyMap();

    self.users = [
      {
        name: 'Chris Yung',
        username: 'cyung',
        instrument: 'piano',
      },
      {
        name: 'Blaine Killen',
        username: 'bkillenit',
        instrument: 'drums',
      },
      {
        name: 'Matthew Brooks',
        username: 'mbrooks',
        instrument: 'guitar',
      },
      {
        name: 'Marcus Buffett',
        username: 'mbuffett',
        instrument: 'bassguitar',
      },
      {
        name: 'Edgar Pabon',
        username: 'edgar',
        instrument: 'vocals',
      },
    ];


    var updateKeyMap = function() {
      self.key_map = jamFactory.getKeyMap();
      $scope.$apply();
    };

    jamFactory.registerObserverCallback(updateKeyMap);

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
})();
