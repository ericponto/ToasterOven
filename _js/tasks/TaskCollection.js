import {Collection} from "backbone";

var taskList = [{
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

export default class TaskCollection extends Collection {
	initialize() {
		this.set(taskList);
	}
	
	getSelectedTask() {
		return this.findWhere({ selected: true });
	}
	
	setSelected(prop, value) {
		this.each(task => {
			task.set("selected", task.get(prop) == value);
		});
		
		// if no task was set, then set to default
		if (!this.getSelectedTask()) {
			this.at(0).set("selected", true);
		}
	}
	
	setSelectedByExtension(extension) {
		this.setSelected("extension", extension);
	}
	
	setSelectedByValue(value) {
		this.setSelected("value", value);
	}
}