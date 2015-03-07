import _ from "underscore";
import BaseView from "./../base/BaseView.js";
import ResultView from "./ResultView.js";
import Handlebars from "handlebars";
import templates from "./../templates.js";

var JST = templates.call(window, Handlebars);

export default class ResultsView extends BaseView {
	render() {
		this.$el
			.html("<h3>Results</h3>")
			.append(
				this.collection.map(model => {
					var view = new ResultView({ model });
					view.render();
					return view.el;
				})
			);
	}
}