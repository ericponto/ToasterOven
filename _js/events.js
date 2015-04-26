import $ from "jquery";
import Bacon from "baconjs";

$.fn.asEventStream = Bacon.$.asEventStream;

const $doc = $(document);

// set drag and drop to copy effect
$("body").on("dragover", e => {
	e.preventDefault();
	e.originalEvent.dataTransfer.dropEffect = "copy";
});

// results toggle
$doc.on("click", ".js-preview", function(e) {
	e.preventDefault();
	$(this.getAttribute("href")).toggleClass("in");
});

// helper to get name from row
var getNameFromRow = e => $(e.target).closest("tr").data("name");
	
// event stream for the droppped files
var drops = $("body").asEventStream("drop")
	.doAction(".preventDefault")
	.map(".originalEvent.dataTransfer.files")
	.map($.makeArray);

// remove stream
var removeClick = $doc.asEventStream("click", ".js-remove")
	.doAction(".preventDefault")
	.map(getNameFromRow);

// change task or output name stream
var fileChange = $doc.asEventStream("change", "[name]")
	.map(e => [ getNameFromRow(e), e.target.name, e.target.value ]);
	
var toastClick = $(".js-toast").asEventStream("click")
	.doAction(".preventDefault");
	
var downloadClick = $(".js-download").asEventStream("click")
	.doAction(".preventDefault");
	
export default { drops, removeClick, fileChange, toastClick, downloadClick };