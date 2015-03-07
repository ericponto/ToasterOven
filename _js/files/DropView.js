import {View} from "backbone";

export default class DropView extends View {
	initialize() {
		this.events = {
			"drop": "fileDrop",
			"dragover": "highlight",
			"dragleave": "highlightOff"
		}
	}
	
	addFiles(fileList) {
		[].slice.call(fileList).forEach(file => this.collection.add({ file }));
	}
	
	/** Handle dropped files */
	fileDrop(e) {
		e.preventDefault();
		e.stopPropagation();

		this.addFiles(e.originalEvent.dataTransfer.files);
		this.highlightOff();
	}
	
	/** Highlight the page's background on drag over */
	highlight(e) {
		e.stopPropagation();
		e.preventDefault();

		e.originalEvent.dataTransfer.dropEffect = "copy";
		this.$("body").addClass("dragover");
	}

	/** Turn off the highlight when a file is dropped or the dragged off */
	highlightOff() {
		this.$("body").removeClass("dragover");
	}
}