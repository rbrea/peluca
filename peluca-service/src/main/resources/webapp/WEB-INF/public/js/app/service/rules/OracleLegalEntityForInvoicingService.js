OracleLegalEntityForInvoicingService = function(){}

OracleLegalEntityForInvoicingService.init = function(){

	$("#btnLeInvoicingReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		$('#leInvoicingCountryCode').multiselect("refresh");
		$("#filterLeInvoicingCountryCode :selected").removeAttr("selected");
		$('#filterLeInvoicingCountryCode').multiselect("refresh");
		
		return;
	});
	
	$('#modalAddOraLeInvoicing').on('hidden.bs.modal', function (e) {
		
		OracleLegalEntityForInvoicingService.reset();
		
		return;
	});
	
	$('#modalAddOraLeInvoicing').on('show.bs.modal', function (e) {
		
		//OracleLegalEntityForInvoicingService.reset();
		$("#leCode").focus();
		
		return;
	});
	
	$("#btnAddLegalEntitySave").on("click", function(){
		
		OracleLegalEntityForInvoicingService.add();
		
		return;
	});
	
	$("#labelSelectAll").on("click", function(){
	    var rows = $('#tLeInvoicingResult').dataTable().fnGetNodes();
	    $.each(rows, function(index, value){
		  var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
		  check.prop("checked", true);
	    });
	    $("#labelSelectAll").hide();
	});
	
	$("#leInvoicingSelectAll").on("click", function(){
	    var isChecked = $(this).prop("checked");
		var rows = $('#tLeInvoicingResult').dataTable().fnGetNodes();
		if(isChecked){
		    if(rows.length > 10){
			 $("#labelSelectAll").show();
			 $("#allCheckText").text("Seleccionar los "+ rows.length + " registros totales");
		    };
		    $("input[type='checkbox'][id*='selectedRow_']").each(function(){
			$(this).prop("checked", isChecked);
			return;
			});
		}else{
		    $("#labelSelectAll").hide();
		    $.each(rows, function(index, value){
			  var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
			  check.prop("checked", isChecked);
		    }); 
		}
		return;
	});
	
	$("#btnLeRemoveAll").on("click", function(){
	    	var list = [];
		var rows = $('#tLeInvoicingResult').dataTable().fnGetNodes();
		
		 $.each(rows, function(index, value){
			  var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
			  var id = check.parent().parent().data("leinvoiceid");
			  if(id != undefined){
			      list.push(id)
			  }
			 
		    });
		if(list.length > 0 ){
			OracleLegalEntityForInvoicingService.remove(list);
		} else {
			noty(
			   {
				   text: '<strong>No ha seleccionado ningún elemento para borrar.</strong>',
				   layout:'topRight',
				   type:'warning',
				   timeout:5000,
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
	});
	
	$("#btnLeInvoicingSearch").on("click", function(){
		var countryCode = $("#filterLeInvoicingCountryCode").val();
		var channel = $("#filterLeInvoicingChannel").val();
		var productType = $("#filterLeInvoicingProductType").val();
		var leCode = $("#filterLegalEntity").val();
		
		OracleLegalEntityForInvoicingService.get(OracleLegalEntityForInvoicingService.handler, countryCode, channel, productType, leCode);
		
		return;
	});
	

	 $("#frmOracleLegalEntityExport").on('submit', function() {
	     $("#frmOracleLegalEntityExport").find("input[type='hidden']").remove();
	     
	        var countryCode = $("#filterLeInvoicingCountryCode").val();
	        var channel = $("#filterLeInvoicingChannel").val();
	        var producType = $("#filterLeInvoicingProductType").val();
	       
	       
	        Commons.makeSubmitUrl("countryCode", countryCode, '#frmOracleLegalEntityExport');
	        Commons.makeSubmitUrl("channel", channel, '#frmOracleLegalEntityExport');
	        Commons.makeSubmitUrl("producType", producType, '#frmOracleLegalEntityExport');
	        
	        return;
	    });
	
		
	OracleLegalEntityForInvoicingService.get(OracleLegalEntityForInvoicingService.handler, null, null, null, null);
	LegalEntityService.get(OracleLegalEntityForInvoicingService.legalEntityHandler);
	
	ValuesService.getChannels(function(list){
		
		ValuesService.buildCombo($("#filterLeInvoicingChannel"), list, true, false)
		
		return;
	});
	
	ValuesService.getProductTypes(function(list){
		
		ValuesService.buildCombo($("#filterLeInvoicingProductType"), list, true, false)
		
		return;
	});
	
	CountryService.get(null, null, OracleLegalEntityForInvoicingService.countryHandler);
	
	$('#tLeInvoicingResult').on( 'page.dt', function () {
		
		PermissionService.doJobWithRoleables();
		
		return;
	} );
	
  	$("#btnOraLeExport").tooltip();
  	
  	$("#btnOraLeExport").on("click", function(){
		
		$("#frmOracleLegalEntityExport").attr("action", Constants.CONTEXT_ROOT + "/app/html/oracleLegalEntityInvoicing/xls");
		$("#frmOracleLegalEntityExport").submit();
		
		return;
	});
    	
    $("#btnLoad").tooltip();
    	
    $("#btnLoad").on("click", function(){
    	$("#modalOraLEInvoice").modal("show");
    	
    	return;
    });
    	
    $('#btnAddOracleLeInvoicing').tooltip();
    
    $("#btnRevisionAudited").on("click", function(){
    	$('.auditoria').width('80%');
    	OracleLegalEntityForInvoicingService.getAuditedByCode();
	});
	    	
	return;
}

OracleLegalEntityForInvoicingService.legalEntityHandler = function(data){
	
	var leType = $("#leInvoicingLegalEntityType");
	var filterLe = $("#filterLegalEntity");
	
	$.each(data, function(){
		
		var le = this;
		
		leType.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
		filterLe.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
		
		return;
	});
	
	leType.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });
	
	filterLe.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });
	
	return;
}

OracleLegalEntityForInvoicingService.get = function(handler, countryCode, channel, productType, leCode){
	
	$("#leInvoicingCountryCode").val(""); 
	$("#leInvoicingChannel").prop("checked", false);
	$("#leInvoicingProductType").prop("checked", false);
	$("#leInvoicingEnabledDate").val("");
	
	var urlQueryString = "";
	
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "countryCode", countryCode);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "channel", channel);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "productType", productType);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "legalEntityCode", leCode);
	
	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/oracleLegalEntityInvoicing" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null){
			   if(data.length > 0){
			       $("#btnOraLeExport").prop('disabled', false);
			   }else{
			       $("#btnOraLeExport").prop('disabled', true);
			   }
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
	
	return;
}

OracleLegalEntityForInvoicingService.handler = function(data){

	var table = $("#tLeInvoicingResult").dataTable( {
		"fnInitComplete": function(){
			$('#tLeInvoicingResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(4)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(7)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(8)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		"aoColumnDefs": [
			{ "sClass": "table-column-output-color", "aTargets": [ 4 ] }
		],
		"iDisplayLength" : 50,
		"bDestroy" : true,
		responsive: false,
		"createdRow": function ( row, data, index ) {
    		$(row).attr("id", "leRow_" + data.id);
    		$(row).data('leinvoiceid', data.id);
    		
    		$('td', row).eq(1).data("columnname", "countryCode");
    		$('td', row).eq(2).data("columnname", "channel");
    		$('td', row).eq(3).data("columnname", "productType");
    		$('td', row).eq(4).data("columnname", "enabledInvoicingDate");
    		
    		return;
        },
        "data": data,
        "drawCallback": function() {
        	PermissionService.doJobWithRoleables();
        	return;
        },
        "columns": [
            {
            	"className": 'centered',
				"orderable": false,
            	"render": function ( data, type, row ) {
			        
			        return "<input type='checkbox' id='selectedRow_" + row.id + "' value='X'>";
			    } 
            },
			{ 	
				"className": 'centered editable-field',
				"orderable": true,
				"data": "country_code" 
			},
			{ 	
            	"className": 'centered editable-field-select',
            	"orderable": true,
            	"data": "channel"
            },
            { 
            	"className": 'centered editable-field-select',
            	"orderable": true,
            	"data": "product_type"
            },
            { 
            	"className": 'editable-field-select-le highlight',
            	"orderable": true,
            	"data": "legal_entity_description"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "creation_date"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "updated_date"
            },
            { 	
            	"className": 'centered',
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		return "<span id='showList_" + row.id + "'><a id='leInvoicingUpdBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:OracleLegalEntityForInvoicingService.update(" + row.id + ");' title='Actualizar fila'><i class='glyphicon glyphicon-cog'></i></a>" 
            			+ "&nbsp;<a id='leInvoicingRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:OracleLegalEntityForInvoicingService.removeOnly(" + row.id + ");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a>" 
            			+ "</span>";
			    }
            }
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por p&aacute;gina",
            "zeroRecords": "No se ha encontrado ningun elemento",
            "info": "P&aacute;gina _PAGE_ de _PAGES_ <b>(Total: _MAX_)</b>",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "", //"(filtrados de un total de _MAX_ registros)",
            "search": "Buscar: ",
            "paginate": {
            	"previous": "<i class='glyphicon glyphicon-step-backward'></i>",
				"next": "<i class='glyphicon glyphicon-step-forward'></i>"
			}
        } 
	});
	
	return;
}

OracleLegalEntityForInvoicingService.reset = function(){
	
	$("#leInvoicingCountryCode").val(""); 
	$("#leInvoicingChannel > option:first").prop("selected", true);
	$("#leInvoicingProductType > option:first").prop("selected", true);
	$("#leInvoicingEnabledDate").children('input').val("");
	$("#leInvoicingLegalEntityType > option:first").prop("selected", true);
	$("#leInvoicingLegalEntityType").multiselect('refresh');
	$("#leInvoicingCountryCode > option:first").prop("selected", true);
	$('#leInvoicingCountryCode').multiselect("refresh");
	$("#filterLeInvoicingCountryCode :selected").removeAttr("selected");
	$('#filterLeInvoicingCountryCode').multiselect("refresh");
	
	return;
}

OracleLegalEntityForInvoicingService.editableHandlerSelect = function(value, settings, me){
	var rowId = me.parentNode.getAttribute('id');

	var objId = $(me).parent().data('leinvoiceid');
	
	var tdList = $("#" + rowId).children();
	
	var changedColumnName = $(me).data('columnname');
	
	var countryCode = tdList.eq(1).html().trim();
	if(changedColumnName == tdList.eq(1).data('columnname')){
		countryCode = $(me).children().children("input[name='value']").val();
	}
	
	var channel = tdList.eq(2).html().trim();
	if(changedColumnName == tdList.eq(2).data('columnname')){
		channel = $(this).children().children("select").val();
	}
	var productType = tdList.eq(3).html().trim();
	if(changedColumnName == tdList.eq(3).data('columnname')){
		productType = $(this).children().children("select").val();
	}
	
	var ruleStartDate = tdList.eq(4).html().trim();
	
	var legalEntityDescription = tdList.eq(5).html().trim();
	if(changedColumnName == tdList.eq(5).data('columnname')){
		legalEntityDescription = $(this).children().children("select").val();
	}
	
	var creationDate = tdList.eq(6).html().trim();
	var updatedDate = tdList.eq(7).html().trim();
	
	var obj = new OracleLegalEntityForInvoicing(countryCode, channel, productType, ruleStartDate, null, legalEntityDescription, objId);
	
    return obj;
}

OracleLegalEntityForInvoicingService.add = function(){
	var validator = $("#frmAddOraLeInvoicing").validate();
	validator.element("#leInvoicingCountryCode");
	validator.element("#leInvoicingChannel");
	validator.element("#leInvoicingProductType");
	validator.element("#leInvoicingLegalEntityType");

	if(!validator.valid()){
		return false;
	}
	
	var $type = "POST";
	var objId = null;
	if($("#leInvoicingFlag").val() == "U"){
		$type = "PUT";
		objId = $("#leInvoicingId").val();
	}
	
	var obj = new OracleLegalEntityForInvoicing(
			$("#leInvoicingCountryCode").val(), 
			$("#leInvoicingChannel").val(), 
			$("#leInvoicingProductType").val(), 
			$("#leInvoicingEnabledDate").children('input').val(),
			$("#leInvoicingLegalEntityType").val(),
			null, 
			objId);
	
	var $data = Commons.toJsonSnakeCase(obj);
	
	$.ajax({ 
	   type    : $type,
	   url     : Constants.CONTEXT_ROOT + "/app/service/oracleLegalEntityInvoicing",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   
		   $("#leInvoicingFlag").val("A");
		   
		   if(data != null && data.status == 0){
			   
			   OracleLegalEntityForInvoicingService.reset();
			   $("#modalAddOraLeInvoicing").modal("hide");
			   
			   var table = $('#tLeInvoicingResult').DataTable();
			   table.clear().draw();
			   OracleLegalEntityForInvoicingService.get(OracleLegalEntityForInvoicingService.handler, null, null, null, null);
			   
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
					   text: '<strong>Error al intentar dar de Alta. Mensaje: ' + data.responseJSON.cause + '</strong>',
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
	
	return;
}

OracleLegalEntityForInvoicingService.update = function(id){

	$("#leInvoicingFlag").val("U");
	$("#leInvoicingId").val(id);
	
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/oracleLegalEntityInvoicing/unique?id=" + id,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data != null){

				   var optCountries = $("#leInvoicingCountryCode > option");
				   
				   $.each(optCountries, function(){
					   
					   if($(this).val() == data.country_code){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   $("#leInvoicingCountryCode").multiselect("refresh");

				   var optChannels = $("#leInvoicingChannel > option");
				   
				   $.each(optChannels, function(){
					   
					   if($(this).html().trim() == data.channel){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   
				   var optProductTypes = $("#leInvoicingProductType > option");
				   
				   $.each(optProductTypes, function(){
					   
					   if($(this).html().trim() == data.product_type){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   
				   $('#leInvoicingEnabledDate').children('input').val(data.rule_start_date);
				   $("#leInvoicingLegalEntityType").val(data.legal_entity_code);
				   $("#leInvoicingLegalEntityType").multiselect('refresh');
				   
				   $("#modalAddOraLeInvoicing").modal("show");
				   
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
	
	return;
}

OracleLegalEntityForInvoicingService.removeOnly = function(id){
	
	var idList = [];
	idList.push(id);
		
	
	return OracleLegalEntityForInvoicingService.remove(idList);
}

OracleLegalEntityForInvoicingService.remove = function(idList){
	
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
		text: 'Esta seguro que desea borrar ' + idList.length + ' elementos ?',
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
					   url     : Constants.CONTEXT_ROOT + "/app/service/oracleLegalEntityInvoicing",
					   dataType: 'json',
					   data: JSON.stringify({"ids" : idList}),
					   contentType: "application/json;",
					   success:function(data) {
						   if(data != null && data.status == 0){
							   
							   	var table = $("#tLeInvoicingResult").DataTable();
							   	
							   	for(var i=0;i<idList.length;i++){
							   		
							   		var deletedRow = null;
							   		
							   		$("#tLeInvoicingResult > tbody > tr").each(function(){
							   			
							   			var id = $(this).data("leinvoiceid");
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
							   
							   $("#leInvoicingSelectAll").prop("checked", false);
							   
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

OracleLegalEntityForInvoicingService.countryHandler = function(countryList){
	
	var firstOption = new Object();
	firstOption.value = "*";
	firstOption.description = "*";
	
	
	CountryService.doComboFill($('#filterLeInvoicingCountryCode'), countryList, null, true);
	$("#filteredSearch").show();
	CountryService.doComboFill($('#leInvoicingCountryCode'), countryList, firstOption);
	return;
}

OracleLegalEntityForInvoicingService.handlerChannels = function(list){
	
	return ValuesService.buildCombo($("#leInvoicingChannel"), list, true, true);
}

OracleLegalEntityForInvoicingService.handlerProductTypes = function(list){
	
	return ValuesService.buildCombo($("#leInvoicingProductType"), list, true, true);
}

OracleLegalEntityForInvoicingService.getAuditedByCode = function(){
    
    $('#modalOraInvoicAuditedTable').modal('show');
   
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/rule/oracleInvoice",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       
	       $("#auditedOraTable").DataTable().destroy();
	       RestConnector.appendTemplateResults(data, "#auditedOraTableBody", "#rowOraAuditedSheet");
	       $("#auditedOraTable").DataTable({
	    	    "order": [],
	    	    "columnDefs": [ {
	    	      "targets"  : 'no-sort',
	    	      "orderable": false,
	    	    }]
	    	});
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

