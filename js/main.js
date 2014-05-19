require.config({
	baseUrl: "js/",
	paths: {
		angular: "../bower_components/angular/angular.min",
		"angular-route": "../bower_components/angular-route/angular-route.min",
		underscore: "../bower_components/underscore/underscore",
		uglify: "../bower_components/uglifyweb/dist/uglifyweb-1.1.1",
		cssmin: "vendor/cssmin",
		jszip: "../bower_components/jszip/jszip.min",
		filesaver: "../bower_components/FileSaver/FileSaver",
		coffeescript: "vendor/coffee-script",
		less: "../bower_components/less/dist/less-1.7.0"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		"angular-route": {
			deps: ["angular"]
		},
		uglify: {
			exports: "uglify"
		},
		cssmin: {
			exports: "cssmin"
		},
		jszip: {
			exports: "JSZip"
		},
		coffeescript: {
			exports: "CoffeeScript"
		}
	}
});

require(["angular", "angular-route", "app", "router"], function(angular) {
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap(["app"]);
	});
});