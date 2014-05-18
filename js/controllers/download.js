define(["angular", "services/files"], function(angular) {
	return angular.module("app.download", ["app.files"])
		.controller("Download", ["$scope", "Files", function($scope, Files) {
			$scope.outputs = Files.outputs;

			/**
			 * Create a zip of the result files and save it
			 */
			$scope.download = function() {
				require(["jszip", "filesaver"], function(JSZip, saveAs) {
					var zip = new JSZip();
					angular.forEach($scope.outputs, function(file) {
						zip.file(file.name, file.text);
					});

					var blob = zip.generate({ type: "blob" });
					saveAs(blob, "Toast.zip");
				});
			};
		}]);
});