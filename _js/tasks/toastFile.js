export default function toastFile(text, task) {
	return new Promise((resolve, reject) => {
		var worker = new Worker("/dist/tasks/workers/" + task + ".js");
	
		worker.postMessage(text);
	
		worker.onmessage = e => resolve(e.data);
	});
}