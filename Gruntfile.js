module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-docco');
  grunt.initConfig({

    mochaTest: {
      testTest: {
        src: ['test/**/*.js']
      }
    },

    docco: {
      debug: {
        src: ['./*/*.js', './*.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.registerTask('test', ['mochaTest:testTest']);
  grunt.registerTask('docs', ['docco']);
};
