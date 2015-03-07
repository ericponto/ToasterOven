import $ from "jquery";
import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";
import createElement from "virtual-dom/create-element";

export default function() {
	// set the view's el, plus placeholders for rendering
	var el;
	var vdom;
	
	return (elem, template, data) => {
		var newVdom = template(data);
		
		// create new element and append, or patch the current element
		if (!el) {
			el = createElement(newVdom);
			$(elem).append(el);
		} else {
			patch(el, diff(vdom, newVdom));
		}
		
		vdom = newVdom;
	};
};
