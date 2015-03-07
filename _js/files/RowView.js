import BaseView from "./../base/BaseView.js";
import Handlebars from "handlebars";
import templates from "./../templates.js";

JST = templates.call(window, Handlebars);

export default class RowView extends BaseView {
	constructor(options) {
		// tagName needs to be set in the constructor so the el builds properly
		this.tagName = "tr";
		
		super(options);
	}
	
	initialize() {
		this.template = JST["_templates/file-row.hbs"];
		
		this.events = {
			"change [name]": "update",
			"click .js-remove": "removeFile"
		};
		
		this.listenTo(this.model, "change", this.render);
	}
	
	update(e) {
		var target = e.target;
		this.model.set(target.name, target.value);
	}
	
	removeFile(e) {
		e.preventDefault();
		this.model.remove();
	}
}