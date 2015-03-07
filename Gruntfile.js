module.exports = function(grunt) {
	var to5ify = require("6to5ify");
	
	grunt.initConfig({
		browserify: {
			bacon: {
				files: {
					"js/bacon-app.js": "_js/bacon/bacon-app.js"
				},
				options: {
					basedir: "_js/",
					browserifyOptions: {
						transform: ["6to5ify"]
					}
				}
			},
			build: {
				files: {
					"js/app.js": "_js/app.js"
				},
				options: {
					basedir: "_js/",
					browserifyOptions: {
						transform: ["6to5ify"]
					}
				}
			},
			workers: {
				files: [{
					expand: true,
					cwd: "_js/tasks/workers/",
					src: ["**/*.js"],
					dest: "js/tasks/workers/"
				}],
				options: {
					browserifyOptions: {
						ignoreMissing: true,
						transform: ["6to5ify", "uglifyify"]
					}
				}
			}
		},
		handlebars: {
			build: {
				files: {
					"_js/templates.js": [
						"_templates/**/*"
					]
				},
				options: {
					commonjs: true
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

	grunt.loadNpmTasks("grunt-contrib-handlebars");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-browserify");

	grunt.registerTask("default", ["handlebars", "browserify"]);
};