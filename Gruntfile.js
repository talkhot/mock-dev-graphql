module.exports = function (grunt) {
  // Load Plugin(s)
  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    eslint: {
      target: ['**/*.js', '!node_modules/**']
    },
    express: {
      dev: {
        options: {
          script: './server/index.js',
          port: 8080
        }
      }
    },
    watch: {
      server: {
        files: ['**/*.js', '!node_modules/**'],
        tasks: ['express:dev', 'eslint'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Register Task
  grunt.registerTask('default', ['eslint', 'express:dev', 'watch']);
};
