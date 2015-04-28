import babel from "babel-core/lib/babel/api/browser.js";

onmessage = function(e) {
	var text = e.data;
	
	try {
		var code = babel.transform(text).code;
	} catch (e) {
		var code = "Error: " + e.message;
	}
	
	postMessage(code);
};