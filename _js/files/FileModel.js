import _ from "underscore";
import {Model} from "backbone";
import TaskCollection from "./../tasks/TaskCollection.js";
import readFile from "./../utils/readFile.js";
import toastFile from "./../tasks/toastFile.js";

const EXTENSION_REGEX = /^(.+)\.(\w+)$/;

export default class FileModel extends Model {
	initialize() {
		var tasks = new TaskCollection();
		var file = this.get("file");
		var [match, origName, extension] = file.name.match(EXTENSION_REGEX);
		var task;
		
		// set selected task and get its value
		tasks.setSelectedByExtension(extension);
		task = tasks.getSelectedTask().get("value");
		
		//update model
		this.set({ origName, extension, tasks, task });
		this.updateOutputName();
		
		// when the task changes, update the computed properties of the model
		this.on("change:task", this.updateTask, this);
	}
	
	processFile() {
		var file = this.get("file");
		var task = this.get("task");
		
		return readFile(file)
			.then(text => toastFile(text, task))
			.then(text => this.set({ text }))
			.catch(err => console.log(err));
	}
	
	remove() {
		this.collection.remove(this);
	}
	
	updateTask() {
		this.updateSelectedTask();
		this.updateOutputName();
	}
	
	updateSelectedTask() {
		var {task, tasks} = this.attributes;
		
		tasks.setSelectedByValue(task);
	}
	
	updateOutputName() {
		var {tasks, origName, extension} = this.attributes;
		var outputName = `${origName}.${tasks.getSelectedTask().get("newExtension") || extension}`;
		
		this.set({ outputName });
	}
	
	toJSON() {
		var data = super.toJSON();
		
		// convert tasks collection into JSON
		data.tasks = data.tasks.toJSON();
		
		return data;
	}
}