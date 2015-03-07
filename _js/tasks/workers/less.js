import less from "less/lib/less";

onmessage = function(e) {
	var text = e.data;
	
	less().render(text, (e, output) => {
		postMessage(output.css);
	});
};
