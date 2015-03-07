import BaseView from "./../base/BaseView.js";
import RowView from "./RowView.js";
import Handlebars from "handlebars";
import templates from "./../templates.js";

var JST = templates.call(window, Handlebars);

export default class TableView extends BaseView {
	initialize() {
		this.template = JST["_templates/file-table.hbs"];
		
		this.events = {
			"click .js-process": "processFiles"
		};
		
		this.listenTo(this.collection, "remove add", this.render);
	}
	
	render() {
		super.render();
		
		this.$el.find("tbody")
			.empty()
			.append(
				this.collection.map(model => {
					var rowView = new RowView({ model });
					rowView.render();
					return rowView.el;
				})
			);
	}
	
	getTemplateData() {
		return {};
	}
	
	processFiles() {
		this.collection.process();
	}
}