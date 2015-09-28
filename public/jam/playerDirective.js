(function() {
  'use strict';

  angular.module('app')
  .directive('player', player);

  function player() {
    var directive = {
      scope: {
        user: '=',
      },
      template: '\
      <div layout="row" layout-align="start center">\
        <i class="fa fa-angle-left fa-3x instrument-arrow instrument-arrow-left"></i>\
        <img src="assets/img/{{user.instrument}}_circle.png" alt="instrument" class="instrument-icon">\
        <i class="fa fa-angle-right fa-3x instrument-arrow instrument-arrow-right"></i>\
      </div>\
      ',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      
    }
  }

})();