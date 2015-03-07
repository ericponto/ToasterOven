import cssmin from "cssmin";

onmessage = function(e) {
	var text = e.data;
	
	postMessage(cssmin(text));
};