module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
  
    mochaTest: {
      testTest: {
        src: ['test/**/*.js']
      }
    }
  });
  grunt.registerTask('test', ['mochaTest:testTest']);
};
