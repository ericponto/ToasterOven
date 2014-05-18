define([
	"angular",
	"angular-route",
	"services/files",
	"controllers/dragAndDrop",
	"directives/dropzone",
	"controllers/download"
], function(angular) {

	return angular.module("app", [
		"ngRoute",
		"app.files",
		"app.dragAndDrop",
		"app.dropzone",
		"app.download"
	]);

});