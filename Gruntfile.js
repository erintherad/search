module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fileNamePrefix: 'fluidXPS-tnf',
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/assets/css/app.css': 'app/css/style.css'
        }
      }
    },
    copy: {
      images: {
        files: [{
          expand: true,
          cwd: 'app/img',
          src: ['*.*'],
          dest: 'dist/assets/img'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'app/fonts',
          src: ['*.*'],
          dest: 'dist/assets/fonts'
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: 'app/pages',
          src: ['**/*', '!index.html'],
          dest: 'dist/'
        }]
      }
    },
    watch: {
      files: ['app/**'],
      tasks: ['sass'],
      options: {
        spawn: false
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5,
        title: 'SearchSolution',
        success: true
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['app/**/*.js']
    },
    connect: {
      server: {
        options: {
          base: './dist',
          port: 8080,
          open: 'http://localhost:8080'
        }
      }
    }
  });

  // Load the plugin that provides the task.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.task.run('notify_hooks');

  // Default task(s).
  grunt.registerTask('default', [
    'eslint',
    'sass',
    'sass',
    'connect:server',
    'watch:local'
  ]);
};
