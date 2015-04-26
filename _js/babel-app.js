/** @jsx h */
import $ from "jquery";
import Bacon from "baconjs";
import events from "./events.js";
import fileMethods from "./files.js";
import renderResults from "./results.js";
import createZip from "./createZip.js";

// main file collection
var filesCollection = Bacon.update([],
	events.drops, fileMethods.add
);

// while files are droppable, show the table of files
var toastedFiles = filesCollection
	.map(files => files.map(file => {
		// show spinner
		$("#processing").show()
		
		// set task to es6 and keep output name the same as the original name
		file.task = "es6";
		file.outputName = file.name;
		
		return file;
	}))
	.flatMap(fileMethods.process);

// once the toast em button has been click, start processing the files
toastedFiles.onValue(files => {
	if (files.length) {
		$("#results, #download").show();
		$("#processing").hide();
		renderResults(files);
	}
})

// download
toastedFiles
	.sampledBy(events.downloadClick)
	.onValue(createZip);