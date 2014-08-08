var scripts = [
    'components/angular/angular.js',
    'components/angular-ui-router/release/angular-ui-router.js',
//    'lib/**/*.js',
//    'lib/*.js',

    'src/js/**/*.services.module.js',
    'src/js/**/*.directives.module.js',
    'src/js/**/*.controllers.module.js',

    'src/js/*.module.js',
    'src/js/**/*.module.js',


    'src/js/**/*.srv.js',
    'src/js/*.srv.js',

    'src/js/**/*.drv.js',
    'src/js/*.drv.js',

    'src/js/**/*.ctrl.js',
    'src/js/*.ctrl.js',

    'src/js/ng-template.js',
    'src/js/**/*.module.config.js',

    'src/js/*.js',
    'src/js/**/*.js',
    '!src/js/**/*.test.js',


    'src/js/angular.bootstrap.js'
];


var styles = [
    'components/bootstrap/dist/css/bootstrap.css',
    'src/css/*.css',
    'src/css/**/*.css',

    'src/js/**/*.css',
    'src/js/*.css'
];

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        ngtemplates:  {
            orothaemuna: {
                src:      'src/js/**/*.html',
                dest:     'src/js/ng-template.js',
                options:  {
                   // usemin: 'dist/vendors.js' // <~~ This came from the <!-- build:js --> block
                }
            }
        },

        injector: {
            options: {
                addRootSlash:false,

                transform: function (filepath, file, i, length) {
                    var tag,
                        max,min,is_css,is_js;

                    min=1111; max=9999;
                    is_css = filepath.indexOf('.css') != -1;
                    is_js = filepath.indexOf('.js') != -1;

                    if(is_css){
                        tag = "<link rel='stylesheet' href='<filename>'>";
                    }
                    if(is_js){
                        tag = "<script src='<filename>'></script>";
                    }

                    return tag.replace("<filename>",'../'+filepath+'?v='+(Math.floor(Math.random() * (max - min + 1)) + min));
                }

            },
            local_dependencies: {
                files: {
                    'src/index.html': scripts.concat(styles)
                }
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */ \n\r'
            },
            dist: {
                src: scripts,
                dest: 'dist/script.js'
            },
            css: {
                src: styles,
                dest: 'dist/style.css'
            }
        },

        uglify: {
            my_target: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */',

                    sourceMap: true,
                    sourceMapName: 'dist/sourcemap.map'
                },
                files: {
                    'dist/script.min.js': scripts
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'dist/style.min.css': styles
                }
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: scripts.concat(styles),
                tasks: ['default']
            }
        }



    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default',['injector','ngtemplates']);

    grunt.registerTask('production', ['ngtemplates','concat','uglify','cssmin']);
};