import babel from "babel-core/lib/babel/api/browser.js";

onmessage = function(e) {
	var text = e.data;
	
	postMessage(babel.transform(text).code);
};