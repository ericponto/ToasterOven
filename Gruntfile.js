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
			build: {
				src: "bower_components/requirejs/require.js",
				dest: "dist/require.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["requirejs"]);
};