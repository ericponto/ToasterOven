import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import FileCollection from "./files/FileCollection.js";
import DropView from "./files/DropView.js";
import TableView from "./files/TableView.js";
import ResultsView from "./results/ResultsView.js";
import DownloadView from "./results/DownloadView.js";

Backbone.$ = $;

var collection = new FileCollection();

var dropView = new DropView({
	el: document,
	collection
});

var tableView = new TableView({
	el: "#files",
	collection
});

collection.on("toasted", showResults);

function createResultsCollection() {
	var resultFiles = collection.reduce((results, model) => {
		var sameName = _.find(results, result => result.get("outputName") == model.get("outputName"));
		
		// combine the files that have the same name
		if (sameName) {
			var text = sameName.get("text");
			
			text += model.get("text");
			sameName.set({ text });
		} else {
			results.push(model);
		}
		
		return results;
	}, []);
	
	return new Backbone.Collection(resultFiles);
}

function showResults() {
	var resultsCollection = createResultsCollection();
	var resultsView = new ResultsView({
		el: "#results",
		collection: resultsCollection
	});
	var downloadView = new DownloadView({
		el: "#download",
		collection: resultsCollection
	});
	
	resultsView.render();
	resultsView.$el.fadeIn();

	downloadView.$el.fadeIn();
	
	// hide the spinner
	$("#processing").fadeOut();
}

collection.on("processing", function() {
	// hide the old stuff
	tableView.$el
		.add(".drop-message")
		.fadeOut();
		
	dropView.remove();
	
	// show the spinner
	$("#processing").fadeIn();
});

