import Promise from "native-promise-only";

export default function readFile(file) {
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		
		reader.onload = e => resolve(e.target.result);
		reader.onerror = err => dfd.reject(err);
		reader.readAsText(file);
	});
}