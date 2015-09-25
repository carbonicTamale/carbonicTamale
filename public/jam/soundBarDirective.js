(function() {
  'use strict';

  angular.module('app')
  .directive('soundBar', soundBar);

  function soundBar() {
    var directive = {
      scope: {
        key_map: '=keyMap'
      },
      template: '<div class="sound-bar"></div>',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      var svg_height = 120;
      var svg_width = 400;
      var bar_padding = 1;
      var svg = d3.select(elem[0]).append('svg');
      svg
        .attr('height', '120')
        .attr('width', '400')
        .style('fill', '#09A1ED');


      render_initial();

      scope.$watch('key_map', function() {
        render();
      }, true);


      function render_initial() {
        svg
          .selectAll('rect')
          .data(scope.key_map)
          .enter()
          .append('rect')
          .attr('width', svg_width / scope.key_map.length - bar_padding)
          .attr('height', function(d) {
            return d*4;
          })
          .attr('x', function(d, i) {
            return i * (svg_width / scope.key_map.length);
          })
          .attr('y', function(d, i) {
            return svg_height - (d);
          });
      }

      function render() {
        svg
          .selectAll('rect')
          .data(scope.key_map)
          .transition()
          .duration(100)
          .attr('width', svg_width / scope.key_map.length - bar_padding)
          .attr('height', function(d) {
            return d*4;
          })
          .attr('x', function(d, i) {
            return i * (svg_width / scope.key_map.length);
          })
          .attr('y', function(d, i) {
            return svg_height - (d);
          });
      }


    }
  }

})();