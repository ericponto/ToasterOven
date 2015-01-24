require.config({
	baseUrl: "js/",
	paths: {
		angular: "../bower_components/angular/angular.min",
		"angular-route": "../bower_components/angular-route/angular-route.min",
		underscore: "vendor/underscore",
		uglifyweb: "vendor/uglifyweb-1.1.1",
		cssmin: "vendor/cssmin",
		jszip: "vendor/jszip.min",
		filesaver: "vendor/FileSaver",
		coffeescript: "vendor/coffee-script",
		less: "vendor/less-1.7.0",
		htmlminifier: "vendor/htmlminifier",
		to5: "vendor/6to5"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		"angular-route": {
			deps: ["angular"]
		},
		cssmin: {
			exports: "cssmin"
		},
		jszip: {
			exports: "JSZip"
		},
		htmlminifier: {
			exports: "minify"
		},
		to5: {
			exports: "to5"
		}
	}
});

require(["angular", "angular-route", "app", "router"], function(angular) {
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap(["app"]);
	});
});