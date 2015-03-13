import $ from "jquery";
import _ from "underscore";
import Bacon from "baconjs";
import Promise from "native-promise-only";
import readFile from "./readFile.js";
import toastFile from "./toastFile.js";
import {getTaskBy} from "./tasks.js";

const EXTENSION_REGEX = /^(.+)\.(\w+)$/;

// helper methods
var buildFileParts = file => {
	var [match, origName, extension] = file.name.match(EXTENSION_REGEX);
	var matchTask = getTaskBy("extension", extension)
	var task = matchTask.value;
	var outputName = `${origName}.${matchTask.newExtension}`;
	
	return _.extend(file, { task, origName, extension, outputName });
};

export default {
	add: (files, newFile) => files.concat(newFile.map(buildFileParts)),
	remove: (files, name) => _.reject(files, { name }),
	update: (files, name, prop, value) => {
		_.findWhere(files, { name })[prop] = value;
		return files;
	},
	process: files => Bacon.fromPromise(Promise.all(
			files.map(file => readFile(file)
				.then(text => {
					file.text = text;
					return toastFile(file);
				})
			)
		)
	)
};