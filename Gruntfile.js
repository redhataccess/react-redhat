module.exports = function (grunt) {

  // load all grunt tasks
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    amdwrap: {
      src: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'amd/'
      },
      transpiled: {
        expand: true,
        cwd: 'transpiled/',
        src: ['**/*.js'],
        dest: 'amd/'
      }
    },

    copy: {
      amd: {
        files: [
          {
            src: ['**/*'],
            dest: 'amd/',
            cwd: 'tools/amd',
            expand: true
          }
        ]
      },
      cjs: {
        files: [
          {
            expand: true,
            cwd: 'transpiled/',
            src: ['**/*.js'],
            dest: 'cjs/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'cjs/'
          },
          {
            src: ['**/*'],
            dest: 'cjs/',
            cwd: 'tools/cjs',
            expand: true
          }
        ]
      },
      options: {
        process: function (content, srcpath) {
          return grunt.template.process(content);
        }
      }
    },

    react: {
      options: {
        harmony: true
      },
      src: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.jsx'],
            dest: 'transpiled',
            ext: '.js'
          }
        ]
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'test',
            src: ['**/*.jsx'],
            dest: 'test-built',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      transpiled: ['transpiled'],
      cjs: ['cjs'],
      amd: ['amd'],
      test: ['test-built']
    },

    watch: {
      all: {
        files: [
          'src/**/*.jsx',
          'src/**/*.js',
          'test/**/*.jsx',
          'test/**/*.js'
        ],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },

    browserify: {
      test: {
        files: {
          'test_bundle.js': ['test-built/**/*.js']
        },
        options: {
          transform: ['envify'],
          verbose: true
        }
      }
    },

    //release: {
    //  npm: {
    //    options: {
    //      folder: 'tools/cjs'
    //    }
    //  },
    //  bower: {
    //    options: {
    //      file: 'bower.json',
    //      folder: 'tools/amd'
    //    }
    //
    //  }
    //},
    release: {
      options: {
        folder: 'cjs'
      }
    },

    requirejs: {
      dev: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: "amd",
          paths: {
            "react-redhat": "./index",
            almond: "../tools/vendor/almond"
          },
          packages: [
            {
              name: 'react',
              location: '../node_modules/react',
              main: './react'
            },
            {
              name: 'react-bootstrap',
              location: '../node_modules/react-bootstrap'
            }
          ],
          include: ["almond", "react-redhat"],
          exclude: ["react", "react-bootstrap"],
          out: "amd/react-redhat.js",
          cjsTranslate: true,
          wrap: {
            startFile: "tools/wrap.start",
            endFile: "tools/wrap.end"
          },
          rawText: {
            'react': 'define({});'
          },
          optimize: "none"
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'amd/<%= pkg.name %>.js',
        dest: 'amd/<%= pkg.name %>.min.js'
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        pushTo: 'origin',
        commitFiles: ['.']
      }
    },

    shell: {
      npmpublish: {
        command: [
            'cd cjs',
            'npm publish'
        ].join('&&')
      }
    }
  });

  grunt.registerTask("release-minor", "Releases a new minor version, pushes, and published", function(target) {
    if (!target) {
      target = "minor";
    }
    grunt.task.run("bump-only:" + target, "build", 'bump-commit', 'shell:npmpublish');
  });
  //grunt.loadNpmTasks('grunt-release');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks("grunt-amd-wrap");
  //grunt.loadNpmTasks('grunt-react');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-browserify');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'clean:test',
    'react:src',
    'react:test',
    'amdwrap',
    'copy',
    'browserify:test',
    'requirejs:dev',
    'uglify:build',
    'clean:transpiled'
  ]);

  grunt.registerTask('default', ['build']);

};
