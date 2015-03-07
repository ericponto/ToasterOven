import _ from "underscore";
import h from "virtual-dom/h";
import Render from "./render.js";

// create the <tbody> vdom
var template = files => h("div", files.map((file, i) => {
	return h("div.panel.panel-info", [
		h("div.panel-heading", [
			h("a.pull-right.js-preview", { attributes: { "href": `#panel-${i}`} },
				[ "Preview" ]
			),
			h("h4.panel-title",
				[ file.outputName ]
			)
		]),
		h(`div#panel-${i}.panel-collapse.collapse`, [
			h("div.panel-body", [
				h("pre", [ file.text ])
			])
		])
	])
}));

var render = Render();

export default files => render("#results", template, files);