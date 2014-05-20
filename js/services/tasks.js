define(["angular"], function(angular) {
	return angular.module("app.tasks", [])
		.service("Tasks", ["$q", function($q) {
			this.tasks = [{
				name: "uglify",
				optionText: "JS - Minify",
				targetExtension: "js",
				outputExtension: "min.js",
				taskScript: "uglifyweb",
				compile: function(uglify, text) {
					return uglify(text);
				}
			}, {
				name: "cssmin",
				optionText: "CSS - Minify",
				targetExtension: "css",
				outputExtension: "min.css",
				taskScript: "cssmin",
				compile: function(cssmin, text) {
					return cssmin(text);
				}
			}, {
				name: "coffee",
				optionText: "CoffeeScript - Compile",
				targetExtension: "coffee",
				outputExtension: "js",
				taskScript: "coffeescript",
				compile: function(CoffeeScript, text) {
					return CoffeeScript.compile(text);
				}
			}, {
				name: "jst",
				optionText: "Underscore Template - Compile",
				targetExtension: "html",
				outputExtension: "js",
				taskScript: "underscore",
				compile: function(_, text, name) {
					var jstText = "this.JST = this.JST || {};\n";
					jstText += "this.JST[\"" + name + "\"] = ";
					jstText += _.template(text).source + ";";
					return jstText;
				}
			}, {
				name: "less",
				optionText: "Less - Compile",
				targetExtension: "less",
				outputExtension: "css",
				taskScript: "less",
				compile: function(less, text, name) {
					var dfd = $q.defer();
					less.Parser().parse(text, function(err, tree) {
						if (err) {
							dfd.reject(err);
						} else {
							dfd.resolve(tree.toCSS());
						}
					});
					return dfd.promise;
				}
			}];
		}]);
});