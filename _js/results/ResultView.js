import _ from "underscore";
import BaseView from "./../base/BaseView.js";
import Handlebars from "handlebars";
import templates from "./../templates.js";

var JST = templates.call(window, Handlebars);

export default class ResultView extends BaseView {
	initialize() {
		this.events = {
			"click .js-preview": "toggle"
		};
		
		this.template = JST["_templates/result.hbs"];
	}
	
	getTemplateData() {
		return _.extend(this.model.toJSON(), { cid: this.model.cid });
	}
	
	toggle(e) {
		e.preventDefault();
		this.$(e.target.getAttribute("href")).toggleClass("in");
	}
}