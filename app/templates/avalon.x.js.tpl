// avalon 1.3.6
/**
 * @enName <%=widgetName %>
 * @introduce
 */
define(["avalon",
  "text!./avalon.<%=widgetName %>.html",
  "css!./avalon.<%=widgetName %>.css"
], function(avalon, template) {

  var widget = avalon.ui.<%=widgetName %> = function (element, data, vmodels) {
    var options = data.<%=widgetName %>Options, $element = avalon(element), pager = options.pager, vmId = data.<%=widgetName %>Id;
    options.template = options.getTemplate(template, options);

    var vmodel = avalon.define(vmId, function(vm){
      avalon.mix(vm, options);
      vm.widgetElement = element
      vm.$skipArray = ["widgetElement", "template"];
      var inited, id = +(new Date());
      vm.$uid = id;

      vm.$init = function (continueScan) {
        if(inited) return;
        inited = true;
        vmodel.template = vmodel.template.replace(/\{\{MS_COMBOX_ID\}\}/g, id);

        element.innerHTML = vmodel.template;
        if(continueScan){
          continueScan();
        }
      }

    });

    return vmodel;

  };
  widget.defaults = {
    getTemplate: function (str, options) {
      return str;
    }
  };

  return avalon;
})
