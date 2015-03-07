export default function toastFile(file) {
	return new Promise((resolve, reject) => {
		var worker = new Worker("/dist/tasks/workers/" + file.task + ".js");
	
		worker.postMessage(file.text);
	
		worker.onmessage = e => {
			file.text = e.data;
			resolve(file);
		};
	});
}