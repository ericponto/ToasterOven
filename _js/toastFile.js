import Promise from "native-promise-only";
import "./polyfill/startsWith";

export default function toastFile(file) {
	return new Promise((resolve, reject) => {
		var worker = new Worker("dist/workers/" + file.task + ".js");
	
		worker.postMessage(file.text);
	
		worker.onmessage = e => {
			file.text = e.data;
			file.error = file.text.startsWith("Error");
			
			resolve(file);
		};
	});
}