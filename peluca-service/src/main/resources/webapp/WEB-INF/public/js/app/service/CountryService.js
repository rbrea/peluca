CountryService = function(){}

CountryService.get = function(code, description, handler, forceCountry){
	
	var urlQueryString = "";
	
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "code", code);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "description", description);
	
	if(forceCountry){
		urlQueryString = Commons.buildUrlQueryString(urlQueryString, "catalogueTypeDescription", "COUNTRY_TABLE");
	}else{
		urlQueryString = Commons.buildUrlQueryString(urlQueryString, "catalogueTypeDescription", "PAIS");
	}

	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/catalogue" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null){
			   
			   if(handler != null 
					   && handler != undefined 
					   && handler != ""){
				   handler(data);
			   }
			   
			   return;
		   }else{
			   noty(
					   {
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
						   layout:'topRight',
						   type:'alert',
						   timeout:10000,
						   animation: {
						        open: 'animated bounceInDown', // Animate.css class names
						        close: 'animated bounceOutUp', // Animate.css class names
						        easing: 'swing', // unavailable - no need
						        speed: 500 // unavailable - no need
						   }
					   }
			   );
		   }
		   
		   return;
	   },
	   error:function(data){
		   noty(
				   {
					   text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
					   layout:'topRight',
					   type:'error',
					   timeout:10000,
					   animation: {
					        open: 'animated bounceInDown', // Animate.css class names
					        close: 'animated bounceOutUp', // Animate.css class names
					        easing: 'swing', // unavailable - no need
					        speed: 500 // unavailable - no need
					   }
				   }
		   );

		   return;
	   }
	});
}

CountryService.comboHandler = function(countryList){
	
	CountryService.doComboFill($('#leCountry'), countryList, null, false, false);
	CountryService.doComboFill($('#filterLeCountry'), countryList, null, true, false);
	
	return;
}

CountryService.doComboFill = function(element, countryList, firstOption, blankOptionEnabled, allOptionEnabled){
	var combo = element;
	combo.children("option").remove();
	if(blankOptionEnabled == true){
		combo.append($("<option value=''>Seleccione una opci&oacute;n</option>"));
	}
	
	if(firstOption != null && firstOption != "" && firstOption != undefined){
		combo.append($("<option value='" + firstOption.value + "'>" + firstOption.description + "</option>"));
	}
	
	$.each(countryList, function(){
		if(allOptionEnabled == false && (this.code == "ALL" || this.code == "*")){
			return;
		} 
		combo.append($("<option value='" + this.code + "'>" + this.description + "</option>"));
		
		return;
	});
	
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
	return;
}
