import $ from "jquery";
import JSZip from "jszip";

export default files  => {
	var zip = new JSZip();
		
	files.forEach(file => {
		zip.file(file.outputName, file.text);
	});
	
	var blob = zip.generate({ type: "blob" });
	var url = window.URL.createObjectURL(blob);

	var downloadLink = $("<a/>", {
		href: window.URL.createObjectURL(blob),
		download: "toaster-oven.zip",
		hidden: true
	}).appendTo("body");
	
	downloadLink[0].click();
	
	window.URL.revokeObjectURL(url);
}