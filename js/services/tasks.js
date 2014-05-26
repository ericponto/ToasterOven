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
					try {
						return uglify(text);
					} catch (err) {
						return err;
					}
				}
			}, {
				name: "cssmin",
				optionText: "CSS - Minify",
				targetExtension: "css",
				outputExtension: "min.css",
				taskScript: "cssmin",
				compile: function(cssmin, text) {
					try {
						return cssmin(text);
					} catch (err) {
						return err;
					}
				}
			}, {
				name: "html",
				optionText: "HTML - Minify",
				targetExtension: "html",
				outputExtension: "html",
				taskScript: "htmlminifier",
				compile: function(minify, text, name) {
					try {
						return minify(text, {
							removeComments: true,
							collapseWhitespace: true,
							
						});
					} catch (err) {
						return err;
					}
				}
			}, {
				name: "coffee",
				optionText: "CoffeeScript - Compile",
				targetExtension: "coffee",
				outputExtension: "js",
				taskScript: "coffeescript",
				compile: function(CoffeeScript, text) {
					try {
						return CoffeeScript.compile(text);
					} catch (err) {
						return err;
					}
				}
			}, {
				name: "jst",
				optionText: "Underscore Template - Compile",
				targetExtension: "jst",
				outputExtension: "js",
				taskScript: "underscore",
				compile: function(_, text, name) {
					try {
						var jstText = "this.JST = this.JST || {};\n";
						jstText += "this.JST[\"" + name + "\"] = ";
						jstText += _.template(text).source + ";";
						return jstText;
					} catch (err) {
						return err;
					}
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