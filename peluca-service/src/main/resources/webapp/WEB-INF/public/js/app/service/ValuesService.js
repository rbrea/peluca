ValuesService = function(){}

ValuesService.getChannels = function(handler){
	
	var settings = {
			"handler" : handler,
			"url" : "values/channels"
	};
	
	return RestConnector.get(settings);
}

ValuesService.handlerChannels = function(list){
	
	return ValuesService.buildCombo($("#leInvoicingChannel"), list);
}

ValuesService.buildCombo = function(container, list, emptyOption, enableFirstOpt){

	container.children().remove();
	
	if(list == null || list === undefined || list == ""){
		return false;
	}
	if(emptyOption == true){
		container.append($("<option value=''>Seleccione una opci&oacute;n</option>"));
	}
	
	$.each(list, function(){
		if(enableFirstOpt == true){
			var opt = $("<option value='" + this.code + "'>" + this.description + "</option>");
			
			container.append(opt);
		} else {
			enableFirstOpt = true;
		}
		
		return;
	});
	
	return;
}

ValuesService.getProductTypes = function(handler){
	
	var settings = {
			"handler" : handler,
			"url" : "values/product-types"
	};
	
	return RestConnector.get(settings);
}

ValuesService.handlerProductTypes = function(list){
	
	return ValuesService.buildCombo($("#leInvoicingProductType"), list);
}

ValuesService.buildDescriptionCombo = function(container, list, emptyOption, enableFirstOpt){

	container.children().remove();
	
	if(list == null || list === undefined || list == ""){
		return false;
	}
	if(emptyOption == true){
		container.append($("<option value=''>Seleccione una opci&oacute;n</option>"));
	}
	
	$.each(list, function(){
		if(enableFirstOpt == true){
			var opt = $("<option value='" + this.description + "'>" + this.description + "</option>");
			
			container.append(opt);
		} else {
			enableFirstOpt = true;
		}
		
		return;
	});
	
	return;
}

ValuesService.applyMultiselect = function(element){
	element.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        maxHeight: 400,
        enableCaseInsensitiveFiltering: true,
        nonSelectedText: 'Seleccione una opción',
        allSelectedText: 'Todos seleccionados',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos'
    });
}
