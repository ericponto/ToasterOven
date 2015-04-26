module.exports = function(grunt) {
	var to5ify = require("6to5ify");
	
	grunt.initConfig({
		browserify: {
			bacon: {
				files: {
					"js/app.js": "_js/app.js",
					"js/babel-app.js": "_js/babel-app.js"
				},
				options: {
					basedir: "_js/",
					browserifyOptions: {
						transform: ["babelify"]
					}
				}
			},
			workers: {
				files: [{
					expand: true,
					cwd: "_js/workers/",
					src: ["**/*.js"],
					dest: "js/workers/"
				}],
				options: {
					browserifyOptions: {
						ignoreMissing: true,
						transform: ["babelify"]
					}
				}
			}
		},
		uglify: {
			build: {
				files: [{
					expand: true,
					cwd: "js/",
					src: ["**/*.js"],
					dest: "dist/"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-browserify");

	grunt.registerTask("default", ["browserify", "uglify"]);
};