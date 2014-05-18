define([
	"angular-route"
], function() {

return angular.module("app", ["ngRoute"])
	.config(function($routeProvider) {
		$routeProvider.when("/", {
			controller: "DragAndDrop",
			templateUrl: "upload.html"
		}).when("/results", {
			controller: "Download",
			templateUrl: "results.html"
		}).otherwise({
			redirectTo:  "/"
		});
	})
	.factory("files", function($q) {
		var files = [];
		var outputs = [];
		return {
			list: function() {
			},
			outputs: function() {
				return outputs;
			}
		};
	})
	.controller("DragAndDrop", ["$scope", "files", "$location", function($scope, files, $location) {
		$scope.files = files.list();
		$scope.output = files.outputs();

		$scope.addFiles = function(fileList) {
			[].forEach.call(fileList, function(file) {
				var obj = {
					file: file,
					name: file.name,
					output: file.name,
					task: "",
					loading: true
				};

				$scope.files.push(obj);

				var reader = new FileReader();

				reader.onload = function(event) {
					obj.text = event.target.result;
					obj.loading = false;
					$scope.$apply();
				};

				reader.readAsText(file);
			});
		};

		$scope.removeFile = function (file) {
			$scope.files.splice($scope.files.indexOf(file), 1);
		};

		$scope.toastFiles = function() {
			$scope.files.forEach(function(file) {
				var outputFile = {
					name: file.output
				};
				if (file.task == "uglify") {
					require(["uglify"], function(uglify) {
						outputFile.text = uglify(file.text);
						$scope.output.push(outputFile);
					});
				} else if (file.task == "cssmin") {
					require(["cssmin"], function(cssmin) {
						outputFile.text = cssmin(file.text);
						$scope.output.push(outputFile);
					});
				}
			});
			$location.path("/results");
		};
	}])
	.directive("dropzone", function(files) {
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
	})
	.controller("Download", ["$scope", "files", function($scope, files) {
		$scope.output = files.outputs();
	}]);

});