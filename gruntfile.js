module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

// --------------------------- Watch task

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: [
					'styles/*.scss'
				],
				tasks: ['sass']
			},
			js: {
				files: [
					'Gruntfile.js',
					'scripts/global.js'
				],
				tasks: ['jshint', 'uglify', 'concat']
			},
			icons: {
				files: [
					'fonts/icons/*.svg'
				],
				tasks: ['webfont']
			},
			svg: {
				files: [
					'images/*.svg',
					'images/**/*.svg'
				],
				tasks: ['svg2png', 'imagemin']
			},
			images: {
				files: [
					'images/**/*.{png,jpg,gif}'
				],
				tasks: ['imagemin:images'],
				options: {
					spawn: false,
				}
			}
		},

// --------------------------- Notify

		notify: {
			sass: {
				options: {
					title: 'Task Complete',
					message: 'SASS and Uglify finished running'
				}
			}
		},

// --------------------------- SASS and Bourbon

		sass: {
			dist: {
				options: {
					loadPath: require('node-bourbon').includePaths,
					sourcemap: true,
					quiet: true,
					style: 'compressed'
				},
				files: {
					'styles/global.css': 'styles/global.scss'
				}
			}
		},

// --------------------------- Javascript minification

		uglify: {
			targets: {
				files: {
					'scripts/global.min.js': [
						'scripts/global.js'
					]
				}
			}
		},

// --------------------------- Javascript error and syntax checking
	
		jshint: {
			options: {
				node: true,
				esnext: true,
				curly: false,
				smarttabs: true,
				indent: 4,
				globals: {
					'jQuery': true
				}
			},
			all: [
				'scripts/global.js',
				'Gruntfile.js'
			]
		},

// --------------------------- Concatenate

		concat: {
			options: {
				separator: ';\n',
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - managed by Nick Spiel - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: [
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/jquery-validation/dist/jquery.validate.min.js',
					'bower_components/sweetalert/lib/sweet-alert.min.js',
					'scripts/global.min.js'
				],
				dest: 'scripts/scripts.js',
			},
		},

// --------------------------- ImageMin
		
		imagemin: {
			options: {
				optimizationLevel: 7
			},
			images: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}]
			},
			assets: {
				files: [{
					expand: true,
					cwd: 'assets/',
					src: ['**/*{.png,jpg,gif}'],
					dest: 'assets/'
				}]
			}
		},

// --------------------------- Favicons
				
		favicons: {
			options: {
				trueColor: true,
				precomposed: true,
				windowsTile: false,
				appleTouchBackgroundColor: 'white'
			},
			icons: {
				src: 'images/favicon.svg',
				dest: ''
			}
		},

// --------------------------- SVG to PNG

		svg2png: {
			all: {
				files: [{ 
					cwd: 'images/',
					src: [
						'*.svg'
					],
					dest: 'images/' 
				}]
			},
			icons: {
				files: [{ 
					cwd: 'images/icons/',
					src: [
						'*.svg'
					],
					dest: 'images/icons/' 
				}]
			}
		},

// --------------------------- Web fonts

		webfont: {
			icons: {
				src: 'fonts/icons/*.svg',
				dest: 'fonts',
				destCss: 'styles',
				options: {
					font: 'icons',
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: '/fonts',
					htmlDemo: false,
					template: 'fonts/icons/template.css',
					fontHeight: 16,
					descent: 16
				}
			}
		}
	});

// --------------------------- Plugins
 
	// Misc
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-notify');
	
	// Images
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svg2png');
	grunt.loadNpmTasks('grunt-favicons');
	
	// SASS
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-webfont');
	
	// Javascript
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

// --------------------------- Events

	// Imagemin on images
	grunt.event.on('watch', function(action, filepath, target) {
		var destFilePath = filepath.replace(/(.+)\.js$/, 'images/$1.js');
		grunt.config('imagemin.single.src', filepath);
		grunt.config('imagemin.single.dest', destFilePath);
	});

// --------------------------- Plugins

	grunt.registerTask('default', ['watch', 'notify', 'svg2png', 'favicons', 'webfont', 'imagemin', 'concat', 'jshint', 'uglify', 'sass']);
};