(function() {
  'use strict';

  angular.module('landingApp')
    .directive('topBar', topBar);


  function topBar() {
    var directive = {
      scope: {
        options: '='
      },
      template: '\
      <md-toolbar layout="row" class="top-bar {{barClass}}">\
  			<div layout="row" class="logo-container" flex="20">\
    			<div class="logo-icon-container">\
      			<ng-md-icon icon="my_library_music" class="ng-icon" style="{{style}}" size="50"></ng-md-icon>\
    			</div>\
    			<div class="brand {{itemClass}}">instajam</div>\
  			</div>\
  			<div flex layout="row" layout-align="end center">\
    			<md-button class="login-button">\
	      		<div layout="row" layout-align="center center">\
	        		<div class="login-icon-container">\
	          		<ng-md-icon icon="github-circle" class=\'ng-icon\' style="{{style}}" size="45"></ng-md-icon>\
	        		</div>\
	        		<span class="{{itemClass}}">Login</span>\
      			</div>\
    			</md-button>\
  			</div>\
			</md-toolbar>\
		',
      link: link
    };

    return directive;


    function link(scope, elem, attrs) {
      console.log(scope);
      console.log(elem);
      scope.barClass = '';
      scope.itemClass = '';
      scope.style = '';

      scope.$watch('options', function() {
        styleElements();
      }, true);

      function styleElements() {
        console.log('styling elements', scope.options.scrolled);
        if (scope.options.scrolled) {
          scope.barClass = 'scrolled-bar md-whiteframe-z2';
          scope.style = 'fill: #01A9ED';
          scope.itemClass = 'scrolled-item';
        } else {
          scope.barClass = 'not-scrolled-bar';
          scope.style = 'fill: white';
          scope.itemClass = '';
        }
      }
    }
  }
})();
