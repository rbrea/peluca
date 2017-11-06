CommonsService = function(){}

CommonsService.update = function(table, columnClass, url, submitDataHandler){
	
	var valueTmp = "";
	
	table.$(columnClass).editable(url, {
		"method": "PUT", 
		"submit" : 'OK',
		"ajaxoptions": {
			"dataType": 'json',
			"contentType": "application/json;",
			"type": "PUT"
		},
		"placeholder": "-",
        "callback": function( sValue, y ) {
        	
        	var aPos = table.fnGetPosition( this );
        	var v = valueTmp;
        	if(sValue.status == 0){
        		v = sValue.value;
                noty(
    				   {
    					   text: '<strong>El registro se ha actualizado correctamente!</strong>',
    					   layout:'topRight',
    					   type:'success',
    					   timeout:5000,
    					   animation: {
    					        open: 'animated bounceInDown', // Animate.css class names
    					        close: 'animated bounceOutUp', // Animate.css class names
    					        easing: 'swing', // unavailable - no need
    					        speed: 500 // unavailable - no need
    					   }
    				   }
    		   );	
        	} else {
        		noty(
 					   {
 						   text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
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
        	}
            table.fnUpdate(v, aPos[0], aPos[1] );

            return;
        },
        "submitdata": function ( value, settings ) {
        	
        	valueTmp = value;
        	
        	return submitDataHandler(value, settings, this);
        },

        "width": "90%",
        "height": "100%"
    } );
	
	return valueTmp;
}

CommonsService.updateSelect = function(table, columnClass, url, loadUrl, submitDataHandler){
	
	var valueTmp = "";
	
	table.$(columnClass).editable(url, {
		"method": "PUT", 
		"submit" : 'OK',
		"loadurl" : loadUrl,
	    "type"   : 'select',
		"ajaxoptions": {
			"dataType": 'json',
			"contentType": "application/json;",
			"type": "PUT"
		},
		"placeholder": "-",
        "callback": function( sValue, y ) {
        	
        	var aPos = table.fnGetPosition( this );
        	var v = valueTmp;
        	if(sValue.status == 0){
        		v = sValue.value;
                noty(
    				   {
    					   text: '<strong>El registro se ha actualizado correctamente!</strong>',
    					   layout:'topRight',
    					   type:'success',
    					   timeout:5000,
    					   animation: {
    					        open: 'animated bounceInDown', // Animate.css class names
    					        close: 'animated bounceOutUp', // Animate.css class names
    					        easing: 'swing', // unavailable - no need
    					        speed: 500 // unavailable - no need
    					   }
    				   }
    		   );	
        	} else {
        		noty(
 					   {
 						   text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
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
        	}
            table.fnUpdate(v, aPos[0], aPos[1] );

            return;
        },
        "submitdata": function ( value, settings ) {
        	
        	valueTmp = value;
        	
        	return submitDataHandler(value, settings, this);
        },

        "width": "90%",
        "height": "100%"
    } );
	
	return valueTmp;
}

CommonsService.removeOnly = function(id, url, tableId, checkAllId){
	
	var idList = [];
	idList.push(id);	
		
	return CommonsService.remove(idList, url, tableId, checkAllId);
}

CommonsService.remove = function(idList, url, tableId, checkAllId){
	
	if(idList == null || idList === undefined || idList == "" || idList.length == 0){
		noty(
			   {
				   text: '<strong>No se ha seleccionado ningún elemento para borrar.</strong>',
				   layout:'topRight',
				   type:'information',
				   animation: {
				        open: 'animated bounceInDown', // Animate.css class names
				        close: 'animated bounceOutUp', // Animate.css class names
				        easing: 'swing', // unavailable - no need
				        speed: 500 // unavailable - no need
				    },
				   timeout:10000
			   }
		);
		
		
		return false;
	}
	
	
	noty({
		text: 'Esta seguro que desea borrar?',
		modal:true,
		layout: 'center',
		type: "error",
		animation: {
	        open: 'animated bounceIn', // Animate.css class names
	        close: 'animated flipOutX', // Animate.css class names
	        easing: 'swing', // unavailable - no need
	        speed: 500 // unavailable - no need
	    },
		buttons: [
			{addClass: 'btn btn-success', text: 'Aceptar', onClick: function($noty) {
				
				$noty.close();
				
				$.ajax({ 
					   type    : "DELETE",
					   url     : Constants.CONTEXT_ROOT + "/app/service/broadcast/register",
					   dataType: 'json',
					   data: JSON.stringify({"ids" : idList}),
					   contentType: "application/json;",
					   success:function(data) {
						   if(data != null && data.status == 0){
							   
							   	var table = $("#" + tableId).DataTable();
							   	
							   	for(var i=0;i<idList.length;i++){
							   		
							   		var deletedRow = null;
							   		
							   		$("#" + tableId + " > tbody > tr").each(function(){
							   			
							   			var id = $(this).data("rowid");
							   			if(id == idList[i]){
							   				
							   				deletedRow = $(this);
							   				
							   				return false;
							   			}
							   			
							   			return;
							   		});
							   		
							   		table
							   			.row(deletedRow)
							   			.remove()
							   			.draw();
							   	}
							   	
							   noty(
								   {
									   text: '<strong>Los elementos seleccionados se han borrado con éxito!</strong>',
									   layout:'topRight',
									   type:'success',
									   timeout:10000,
									   animation: {
									        open: 'animated bounceInDown', // Animate.css class names
									        close: 'animated bounceOutUp', // Animate.css class names
									        easing: 'swing', // unavailable - no need
									        speed: 500 // unavailable - no need
									   }
								   }
							   );
							   
							   $("#" + checkAllId).prop("checked", false);
							   
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
									   text: '<strong>Error al intentar borrar. Mensaje: ' + data.responseJSON.cause + '</strong>',
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
			},
			{addClass: 'btn btn-default', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
			}
		]
	});
	
	return;
}

CommonsService.referencedRulesHandler = function(data, tableResultRef){
	
	if(tableResultRef == null){
		return false;
	}

	var thead = $("<thead></thead>");
	var trh = $("<tr style='text-align:center'></tr>");
	
	trh.append($("<th style='text-align:center'></th>").append("Indice"));
	trh.append($("<th style='text-align:center'></th>").append("Nombre Regla"));
	
	thead.append(trh);
	
	var tbody = $("<tbody></tbody>");
	
	if(data != null && data.length > 0){
		var idx = 1;
		$.each(data, function(){
			var tr = $("<tr style='text-align:center'></tr>");
			var td0 = $("<td></td>").append("" + idx++);
			var td1 = $("<td></td>").append("" + this);
			
			tr.append(td0).append(td1);
			tbody.append(tr);
			
			return;
		});
		
	} else {
		tbody.append($("<tr></tr>").append($("<td></td>").append("No se han encontrado resultados")));
	}
	
	tableResultRef.append(thead).append(tbody);
	
	return;
}
