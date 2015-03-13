import _ from "underscore";
import h from "virtual-dom/h";
import {taskList} from "./tasks.js";
import Render from "./render.js";

// create the select/option vdom
var createSelect = file => h("select.form-control", { attributes: { name: "task" } },
	taskList.map(task => h("option", { attributes: _.extend({ value: task.value }, file.task == task.value && { selected: "selected" })  }, [ task.text ]))
);

// create the <tbody> vdom
var template = files => h("tbody", files.map(file => {
	return h("tr", { attributes: { "data-name": file.name } }, [
		h("td", [ file.name ]),
		h("td", [ createSelect(file) ]),
		h("td", [
			h("input.form-control", { attributes: { "type": "text", "name": "outputName", "value": file.outputName } })
		]),
		h("td.text-center", [
			h("a.js-remove.text-danger", { attributes: { "href": "#", "title": "Remove file" } },
				[ h("i.glyphicon.glyphicon-remove-circle") ]
			)
		])
	]);
}));

var render = Render();

export default files => render("#files-table", template, files);