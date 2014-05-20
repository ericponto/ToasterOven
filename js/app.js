define([
	"angular",
	"angular-route",
	"services/files",
	"services/tasks",
	"controllers/dragAndDrop",
	"directives/dropzone",
	"controllers/download"
], function(angular) {

	return angular.module("app", [
		"ngRoute",
		"app.files",
		"app.tasks",
		"app.dragAndDrop",
		"app.dropzone",
		"app.download"
	]);

});