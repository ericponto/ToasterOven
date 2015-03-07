module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["_templates/file-row.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "			<option value=\""
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = ((helper = (helper = helpers.selected || (depth0 != null ? depth0.selected : depth0)) != null ? helper : helperMissing),(options={"name":"selected","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.selected) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"2":function(depth0,helpers,partials,data) {
  return "selected";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<td>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.file : depth0)) != null ? stack1.name : stack1), depth0))
    + "</td>\n<td>\n	<select class=\"form-control\" name=\"task\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tasks : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</select>\n</td>\n<td>\n	<input type=\"text\" class=\"form-control\" name=\"outputName\" value=\""
    + escapeExpression(((helper = (helper = helpers.outputName || (depth0 != null ? depth0.outputName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"outputName","hash":{},"data":data}) : helper)))
    + "\">\n</td>\n<td class=\"text-center\">\n	<a href=\"#\" title=\"Remove file\" class=\"js-remove text-danger\"><i class=\"glyphicon glyphicon-remove-circle\"></i><a>\n</td>";
},"useData":true});

this["JST"]["_templates/file-table.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<table class=\"files table table-striped\">\n	<thead>\n		<th>File</th>\n		<th>Choose a task</th>\n		<th>Output Name</th>\n		<th class=\"text-center\">Remove</th>\n	</thead>\n	<tbody>\n	</tbody>\n</table>\n\n<p class=\"text-center\">\n	<button class=\"btn btn-lg btn-success js-process\">Toast 'Em</button>\n</p>\n";
  },"useData":true});

this["JST"]["_templates/result.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"panel panel-info\">\n	<div class=\"panel-heading\">\n		<a class=\"pull-right js-preview\" href=\"#"
    + escapeExpression(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cid","hash":{},"data":data}) : helper)))
    + "\">Preview</a>\n		<h4 class=\"panel-title\">\n			"
    + escapeExpression(((helper = (helper = helpers.outputName || (depth0 != null ? depth0.outputName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"outputName","hash":{},"data":data}) : helper)))
    + "\n		</h4>\n	</div>\n	<div id=\""
    + escapeExpression(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cid","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n	<div class=\"panel-body\">\n		<pre>"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</pre>\n	</div>\n</div>";
},"useData":true});

return this["JST"];

};