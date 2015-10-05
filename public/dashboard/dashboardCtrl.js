(function() {
	'use strict';

	angular.module('app')
	.controller('DashboardCtrl', dashboardCtrl);

	function dashboardCtrl($http, $mdDialog, $scope, playerFactory) {
		var self = this;
    self.player = playerFactory;

    self.events = [];

    $http.get('/api/events')
    .then(function(data) {
      // console.log(data.data);
      console.dir(data.data);
      var friends = data.data.friends;
      for (var i = 0; i < friends.length; i++) {
        self.events.push({
          friend : friends[i].name,
          type : 'friend'
        });
      }
    });

    $scope.confirm = function() {
      return $http.post('/api/users/profile', {profile : $scope.profile})
      .then(function (data) {
        console.log('success!');
        self.profile = $scope.profile;
        playerFactory.setProfile($scope.profile);
        $mdDialog.hide();
      })
      .catch(function (err) {
        console.log('profile update error!', err);
        $mdDialog.hide();
      });
    };


    self.updateProfile = function($event) {



      $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog>' +
            '  <md-dialog-content>' + 
            '    <textarea ng-model="profile" rows=5 cols=60></textarea>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="confirm()" class="md-primary">' +
            '      Change Profile!' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
          controller: 'DashboardCtrl',
          controllerAs: 'dashboard',
          // onComplete: afterShowAnimation,
          locals: {}
        });







    };
    // used for invitations later
    var socket = io();
	}
})();
