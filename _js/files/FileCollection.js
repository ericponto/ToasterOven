import {Collection} from "backbone";
import FileModel from "./FileModel.js";

export default class FileCollection extends Collection {
	initialize() {
		this.model = FileModel;
	}
	
	process() {
		this.trigger("processing");
		
		Promise.all(
			this.map(model => model.processFile())
		).then(() => this.trigger("toasted"));
	}
}