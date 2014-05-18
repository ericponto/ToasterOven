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
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");

	grunt.registerTask("default", ["requirejs"]);
};