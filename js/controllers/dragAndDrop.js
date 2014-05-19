define(["angular", "services/files"], function(angular, Files) {
	return angular.module("app.dragAndDrop", ["app.files"])
		.controller("DragAndDrop", ["$scope", "Files", "$location", "$q",
			function($scope, Files, $location, $q) {
				$scope.files = Files.files;

				$scope.tasks = [
					"uglify",
					"cssmin",
					"coffee",
					"jst"
				];

				$scope.toastType = "file";
				// bulk options
				$scope.bulkTask = "";
				$scope.bulkConcat = false;
				$scope.bulkOutput = "";

				var taskMap = {
					js: "uglify",
					css: "cssmin",
					coffee: "coffee",
					html: "jst",
					less: "less"
				};

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
						obj.task = taskMap[ext] ? taskMap[ext] : "";

						// set the bulkTask option to match the first file
						if (i === 0) {
							$scope.bulkTask = obj.task;
						}

						// if js or css, add .min
						if (/^(js|css)$/.test(ext)) {
							nameSplit.push("min", ext);
							obj.output = nameSplit.join(".");
						}

						// change coffee extension to js
						else if (ext === "coffee") {
							nameSplit.push("js");
							obj.output = nameSplit.join(".");
						}

						// change html templates to js
						else if (ext === "html") {
							nameSplit.push("js");
							obj.output = nameSplit.join(".");
						}

						// change less to css
						else if (ext === "less") {
							nameSplit.push("css");
							obj.output = nameSplit.join(".");
						}

						// keep the name the same
						else {
							obj.output = file.name;
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

					$scope.toasting = true;

					angular.forEach($scope.files, function(file) {
						if (bulk) {
							file.task = $scope.bulkTask;
						}

						var outputFile = {
							name: file.output
						};

						var dfd = $q.defer();

						// read the files
						var reader = new FileReader();

						reader.onload = function(event) {
							var text = event.target.result;

							// get the task and perform it on the text from the file
							if (file.task === "uglify") {
								require(["uglify"], function(uglify) {
									outputFile.text = uglify(text);
									outputFiles.push(outputFile);
									dfd.resolve();
								});
							} else if (file.task === "cssmin") {
								require(["cssmin"], function(cssmin) {
									outputFile.text = cssmin(text);
									outputFiles.push(outputFile);
									dfd.resolve();
								});
							} else if (file.task === "coffee") {
								require(["coffeescript"], function(CoffeeScript) {
									outputFile.text = CoffeeScript.compile(text);
									outputFiles.push(outputFile);
									dfd.resolve();
								});
							} else if (file.task === "jst") {
								require(["underscore"], function(_) {
									var jstText = "this.JST = this.JST || {};\n";
									jstText += "this.JST[\"" + file.name + "\"] = ";
									jstText += _.template(text).source + ";";
									outputFile.text = jstText;
									outputFiles.push(outputFile);
									dfd.resolve();
								});
							} else if (file.task === "less") {
								require(["less"], function(less) {
									less.Parser().parse(text, function(err, tree) {
										if (!err) {
											outputFile.text = tree.toCSS();
											outputFiles.push(outputFile);
											dfd.resolve();
										}
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