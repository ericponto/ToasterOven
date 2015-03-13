/** @jsx h */
import $ from "jquery";
import Bacon from "baconjs";
import events from "./events.js";
import fileMethods from "./files.js";
import renderTable from "./fileTable.js";
import renderResults from "./results.js";
import createZip from "./createZip.js";

// if drops are still allowed
var droppable = events.toastClick
	.map(false)
	.toProperty(true);
	
// main file collection
var filesCollection = Bacon.update([],
	events.drops.takeWhile(droppable), fileMethods.add,
	events.removeClick.takeWhile(droppable), fileMethods.remove,
	events.fileChange.takeWhile(droppable), fileMethods.update,
	events.toastClick.skipWhile(droppable), fileMethods.process
);


// while files are droppable, show the table of files
filesCollection.takeWhile(droppable).onValue(files => {
	if (files.length) {
		$("#files").show();
		renderTable(files);
	}
});

// once the toast em button has been click, start processing the files
filesCollection.sampledBy(events.toastClick).onValue(filesPromise => {
	$("#files, .drop-message").hide();
	$("#processing").show();

	filesPromise.onValue(files => {
		$("#results, #download").show();
		$("#processing").hide();
		renderResults(files);
	});
	
	filesPromise
		.sampledBy(events.downloadClick)
		.onValue(createZip);
});