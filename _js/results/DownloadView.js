import JSZip from "jszip";
import {View} from "backbone";

export default class DownloadView extends View {
	initialize() {
		var zip = new JSZip();
		
		this.collection.each(file => {
			zip.file(file.get("outputName"), file.get("text"));
		});
		
		var blob = zip.generate({ type: "blob" });

		this.$("a").attr({
			href: window.URL.createObjectURL(blob),
			download: "toaster-oven.zip"
		});
	}
}