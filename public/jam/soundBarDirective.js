(function() {
  'use strict';

  angular.module('app')
  .directive('soundBar', soundBar);

  function soundBar() {
    var directive = {
      template: '<div></div>',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log(elem);
      console.log(typeof elem);
    }
  }

})();