var Handlebars = require("handlebars");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['test'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"list__item"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = this.invokePartial(partials.link,depth0,{"name":"link","hash":{"content":(depth0 != null ? depth0.text : depth0),"id":(depth0 != null ? depth0.id : depth0)},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</li>";
},"2":function(depth0,helpers,partials,data) {
    return " selected";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"list\">"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.item : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});
