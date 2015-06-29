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
  grunt.registerTask('default', ['sass', 'autoprefixer', 'csso', 'concat:js', 'uglify:production', 'concat:sfo', 'concat:aus', 'concat:dub', 'watch']);
  grunt.registerTask('styles', ['sass', 'autoprefixer', 'csso']);

  // The order matters!
  var jsFiles = [
    'assets/vendor/jquery/jquery.js',
    'assets/vendor/handlebars/handlebars.js',
    'assets/js/vendor/**/*.js',
    'assets/js/src/**/*.js'
  ];

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
        dest: 'assets/js/<%= pkg.name %>.js'
      },

      sfo: {
        options: {
          separator: ',',
          banner: "[",
          footer: "]"
        },
        src: "assets/js/src/rooms/sfo/*.json",
        dest: "assets/js/sfo-rooms.json"
      },

      aus: {
        options: {
          separator: ',',
          banner: "[",
          footer: "]"
        },
        src: "assets/js/src/rooms/aus/*.json",
        dest: "assets/js/aus-rooms.json"
      },

      dub: {
        options: {
          separator: ',',
          banner: "[",
          footer: "]"
        },
        src: "assets/js/src/rooms/dub/*.json",
        dest: "assets/js/dub-rooms.json"
      }
    },

    uglify: {
      production: {
        options: {
          report: 'min',
          banner: '<%= banner %>'
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': jsFiles
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
        files: ['assets/js/**/*', '!assets/js/Wayfinder.js', '!assets/js/Wayfinder.min.js'],
        tasks: ['concat:js', 'uglify:production', 'concat:sfo', 'concat:aus', 'concat:dub'],
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
