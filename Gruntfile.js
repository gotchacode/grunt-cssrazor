/*
 * grunt-cssrazor
 * https://github.com/changer/grunt-cssrazor
 *
 * Copyright (c) 2012 Igor Hlina
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      gruntfile: 'Gruntfile.js',
      tasks: 'tasks/*.js',
      tests: '<%= nodeunit.tasks %>'
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    cssmin: {
      release: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'release.css': ['release.css']
        },
      }
    },

    // Configuration to be run (and then tested).
    cssrazor: {
      release: {
        options: {
          urls: [
            'http://www.changer.nl/',
            'http://www.changer.nl/team.html',
            'http://www.changer.nl/products.html',
            'http://www.changer.nl/contact.html',
            'http://www.changer.nl/portfolio.html',
            'http://www.changer.nl/legal/'
          ],
          input: 'app.css',
          output: 'release.css'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cssrazor', 'cssmin', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
