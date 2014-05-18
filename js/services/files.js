define(["app"], function(app) {
	return angular.module("app.files", [])
		.service("Files", function($q) {
			this.files = [];
			this.outputs = [];
		});
});