(function() {
  'use strict';

  angular.module('app')
  .controller('JamCtrl', jamCtrl);

  function jamCtrl($scope, Devices, jamFactory) {
    var self = this;
    self.devices = [];

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

          console.log(self.devices);
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
