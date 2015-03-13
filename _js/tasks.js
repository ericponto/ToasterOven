import _ from "underscore";

export var taskList = [{
	value: "uglify",
	extension: "js",
	newExtension: "min.js",
	text: "Uglify JS"
}, {
	value: "cssmin",
	extension: "css",
	newExtension: "min.css",
	text: "Minify CSS"
}, {
	value: "coffee",
	extension: "coffee",
	newExtension: "js",
	text: "Compile Coffeescript"
}, {
	value: "jst",
	extension: "jst",
	newExtension: "js",
	text: "Compile Underscore Template"
}, {
	value: "less",
	extension: "less",
	newExtension: "css",
	text: "Compile LESS"
}, {
	value: "es6",
	extension: "es6",
	newExtension: "js",
	text: "Compile ES6 with 6to5"
}];

export var getTaskBy = (prop, value) => _.find(taskList, task => task[prop] == value) || taskList[0];
