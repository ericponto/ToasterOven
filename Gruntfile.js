module.exports = function(grunt) {
	grunt.initConfig({
		requirejs: {
			build: {
				options: {
					baseUrl: "js",
					mainConfigFile: "js/main.js",
					out: "dist/main.js",
					name: "main",
					optimize: "uglify2",
					uglify2: {
							mangle: false
					},
					preserveLicenseComments: false
				}
			}
		},
		copy: {
			require: {
				src: "bower_components/requirejs/require.js",
				dest: "dist/require.js"
			},
			// copy the important bower files to the vendor folder
			bowerToVendor: {
				files: [
					{
						expand: true,
						cwd: "bower_components",
						src: [
							"underscore/underscore.js",
							"uglifyweb/dist/uglifyweb-1.1.1.js",
							"jszip/jszip.min.js",
							"FileSaver/FileSaver.js",
							"less/dist/less-1.7.0.js",
							"html-minifier/dist/htmlminifier.js"
						],
						dest: "js/vendor/",
						flatten: true
					}
				]
			},
			to5: {
				src: "node_modules/6to5/browser.js",
				dest: "js/vendor/6to5.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["copy", "requirejs"]);
};