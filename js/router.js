define(["app"], function(app) {
	return app.config(function($routeProvider) {
		$routeProvider.when("/", {
			controller: "DragAndDrop",
			templateUrl: "upload.html"
		}).when("/results", {
			controller: "Download",
			templateUrl: "results.html"
		}).otherwise({
			redirectTo:  "/"
		});
	});
});