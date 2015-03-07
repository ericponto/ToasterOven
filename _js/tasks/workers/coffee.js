import CoffeeScript from "coffee-script";

onmessage = function(e) {
	var text = e.data;
	
	postMessage(CoffeeScript.compile(text));
};