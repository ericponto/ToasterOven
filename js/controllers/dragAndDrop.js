define(["angular", "underscore", "services/files", "services/tasks"],
	function(angular, _) {
		return angular.module("app.dragAndDrop", ["app.files"])
			.controller("DragAndDrop", ["$scope", "Files", "Tasks", "$location", "$q",
				function($scope, Files, Tasks, $location, $q) {
					// set the services data to the $scope
					$scope.files = Files.files;
					$scope.tasks = Tasks.tasks;

					// default to task per file
					$scope.toastType = "file";

					// bulk options
					$scope.bulkTask = "";
					$scope.bulkConcat = false;
					$scope.bulkOutput = "";

					/**
					 * Add a file
					 * @param {FileList} fileList A list of files from the drop event
					 */
					$scope.addFiles = function(fileList) {
						angular.forEach(fileList, function(file, i) {
							var obj = {
								file: file,
								name: file.name
							};

							// default to most likely task
							var nameSplit = file.name.split(".");
							var ext = nameSplit.pop();
							var matchingTask =  _.where($scope.tasks, {targetExtension : ext})[0];

							if (matchingTask) {
								obj.task = matchingTask.name;
								nameSplit.push(matchingTask.outputExtension);
								obj.output = nameSplit.join(".");
							} else {
								obj.task = "";
								obj.output = file.name;
							}
							obj.task = matchingTask ? matchingTask.name : "";

							// set the bulkTask option to match the first file
							if (i === 0) {
								$scope.bulkTask = obj.task;
							}

							$scope.files.push(obj);
						});
						$scope.$apply();
					};

					/**
					 * Remove a file
					 * @param  {file} file
					 */
					$scope.removeFile = function (file) {
						$scope.files.splice($scope.files.indexOf(file), 1);
					};

					/**
					 * read the file with the file reader, then perform the selected task
					 */
					$scope.toastFiles = function() {
						var promises = [];
						var outputFiles = [];
						var bulk = ($scope.toastType == "bulk");

						// for spinner on button
						$scope.toasting = true;

						angular.forEach($scope.files, function(file) {
							var task = bulk ? $scope.bulkTask : file.task;
							var matchingTask = _.where($scope.tasks, {name: task})[0];

							// object we're passing to the results view
							var outputFile = {
								name: file.output
							};

							var dfd = $q.defer();

							// read the files
							var reader = new FileReader();

							reader.onload = function(event) {
								var text = event.target.result;

								if (matchingTask) {
									require([matchingTask.taskScript], function(compiler) {
										$q.when(matchingTask.compile(compiler, text, file.name))
											.then(function(outputText) {
												outputFile.text = outputText;
												outputFiles.push(outputFile);
												dfd.resolve();
											});
									});
								} else {
									// no task selected
									outputFile.text = text;
									outputFiles.push(outputFile);
									dfd.resolve();
								}
							};

							reader.readAsText(file.file);

							promises.push(dfd.promise);
						});

						
						$q.all(promises).then(function() {
							// concatenate files together
							if (bulk && $scope.bulkConcat) {
								var outputText = "";
								angular.forEach(outputFiles, function(file) {
									outputText += file.text;
								});
								outputFiles = [{
									name: $scope.bulkOutput || "noname",
									text: outputText
								}];
							}

							Files.outputs = outputFiles;

							//when we're all done, then go to the results page
							$location.path("/results");
							$scope.toasting = false;
						});
					};
				}]);
});