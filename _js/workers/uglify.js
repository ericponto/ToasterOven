import UglifyJS from "uglify-js";

onmessage = function(e) {
	var text = e.data;
	
	postMessage(UglifyJS.minify(text, { fromString: true }).code);
};