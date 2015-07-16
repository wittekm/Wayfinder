module.exports = function(grunt) {

  // Plugins
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-merge-json');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-remfallback');

  // Tasks
  grunt.registerTask('build', ['sass', 'autoprefixer', 'csso', 'concat:js', 'uglify:production', 'concat:rooms']);
  grunt.registerTask('default', ['build', 'watch']);

  // The order matters!
  var jsFiles = [
    'assets/vendor/jquery/dist/jquery.js',
    'assets/vendor/handlebars/handlebars.js',
    'assets/js/vendor/**/*.js',
    'assets/js/src/**/*.js'
  ];

  var concatOpts = {
    separator: ',',
    banner: '[',
    footer: ']'
  };

  var roomIn = 'assets/js/src/rooms/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>*/\n',

    concat: {
      js: {
        options: {
          stripBanners: true,
          separator: ';'
        },
        src: jsFiles,
        dest: 'assets/js/dist/<%= pkg.name %>.js'
      },

      rooms: {
        options: concatOpts,
        files: {
          'assets/js/dist/sfo-rooms.json': roomIn + 'sfo/*.json',
          'assets/js/dist/aus-rooms.json': roomIn + 'aus/*.json',
          'assets/js/dist/dub-rooms.json': roomIn + 'dub/*.json',
          'assets/js/dist/sea-rooms.json': roomIn + 'sea/*.json',
        }
      }
    },

    uglify: {
      production: {
        options: {
          report: 'min',
          banner: '<%= banner %>'
        },
        files: {
          'assets/js/dist/<%= pkg.name %>.min.js': jsFiles
        }
      }
    },

    // Compile SASS
    sass: {
      dist: {
        files: {
          'assets/css/style.css': 'assets/scss/style.scss',
        },
      },
    },

    // Automatically add required CSS prefixes
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'ie 8'],
      },
      dist: {
        src: 'assets/css/style.css',
      },
    },

    csso: {
      dist: {
        files: {
          'assets/css/style.min.css': ['assets/css/style.css'],
        },
      },
    },

    watch: {
      javascriptDev: {
        files: ['assets/js/**/*', '!assets/js/dist'],
        tasks: ['concat:js', 'uglify:production', 'concat:rooms'],
        options: {
          livereload: false
        }
      },

      css: {
        files: [
          'assets/scss/**/*'
        ],
        // Run Sass, autoprefixer, and CSSO
        tasks: ['sass', 'autoprefixer', 'csso'],
        options: {
          interrupt: true,
          spawn: false,
        },
      },
    }
  });

};
