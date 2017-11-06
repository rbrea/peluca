CatalogueTypeService = function(){}

CatalogueTypeService.get = function(id, description, handler){
	
	var urlQueryString = "";
	
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "id", id);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "description", description);
	
	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/catalogue-type" + urlQueryString,
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

CatalogueTypeService.comboHandler = function(catalogueTypeList){
	
	CatalogueTypeService.doComboFill($('#filterSpCatalogueType'), catalogueTypeList, null, true);
	
	return;
}

CatalogueTypeService.doComboFill = function(element, catalogueTypeList, blankOptionEnabled){
	var combo = element;
	combo.children("option").remove();
	if(blankOptionEnabled == true){
		combo.append($("<option value='0'>Seleccione una opci&oacute;n</option>"));
	}
	
	$.each(catalogueTypeList, function(){

		combo.append($("<option value='" + this.id + "'>" + this.description + "</option>"));
		
		return;
	});
	
	return;
}