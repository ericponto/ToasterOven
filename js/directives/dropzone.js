define(["angular"], function(angular) {
	return angular.module("app.dropzone", [])
			.directive("dropzone", function() {
				return {
					restrict: "A",
					link: function($scope, el) {

						el.bind("drop", function(event) {
							event.preventDefault();
							event.stopPropagation();

							$scope.addFiles(event.dataTransfer.files);
							el.removeClass("dropzone-over");
						}).bind("dragover", function(event) {
							event.preventDefault();
							event.stopPropagation();

							event.dataTransfer.dropEffect = "copy";
							el.addClass("dropzone-over");
						}).bind("dragleave", function(event) {
							el.removeClass("dropzone-over");
						});
					}
				};
			});
});