define(["angular"], function(angular) {
	return angular.module("app.files", [])
		.service("Files", function() {
			this.files = [];
			this.outputs = [];

			this.taskOptions =  [
				{ val: "uglify", text: "JS - Minify" },
				{ val: "cssmin", text: "CSS - Minify" },
				{ val: "coffee", text: "CoffeeScript - Compile" },
				{ val: "less",   text: "Less - Compile" },
				{ val: "jst",    text: "Underscore Templates - Compile" },
				{ val: "to5",    text: "6to5 - Compile" }
			];

			this.taskMap = {
				js: "uglify",
				css: "cssmin",
				coffee: "coffee",
				html: "jst",
				less: "less",
				es6: "es6"
			};
		});
});