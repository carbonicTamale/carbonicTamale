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
    var updateKeyMap = function() {
      self.key_map = jamFactory.getKeyMap();
      $scope.$apply();
    }

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

          // set first device to active device
          self.activeDevice = self.devices[0];
        }
        else {
        	console.log('No devices detected!');
        }
      })
      .catch(function(e) {
      	console.log(e);
      })



    $scope.$watch(function() {
    	return self.activeDevice;
    }, function() {
    	jamFactory.plug(self.activeDevice);
    })
  }
})();
