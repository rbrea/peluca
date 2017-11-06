ProviderCodeRuleService = function(){}
ProviderCodeRuleService.firstAdd = true;

ProviderCodeRuleService.init = function(){
 
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		
		return;
	});
	
	$("#btnSendToApproval").on("click", function(){
	    ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("PROVIDER_CODE","btnReleaseVersion", "WATING_APPROVAL");
	    });
	    return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	    return;
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("PROVIDER_CODE", "EDITION");
	    return;
	});
	
	$("#btnSubscritNotification").on("click", function(){
	    $("#modalSubscriptionRule").modal('show');
	    return;
	});
	
	$("#modalSubscriptionRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showSubcriptionOption("PROVIDER_CODE");
	    return;
	});
	
	$("#btnBackToEdition").on("click", function(){
	    ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("PROVIDER_CODE","btnReleaseVersion", "EDITION");
	    });
	    return;
	});
	
	$('#modalAddRule').on('hidden.bs.modal', function (e) {
		ProviderCodeRuleService.reset();
		return;
	});
	
	$('#modalAddRule').on('show.bs.modal', function (e) {
		
		if(ProviderCodeRuleService.firstAdd){
			ProviderCodeRuleService.firstAdd = false;
			ProviderCodeRuleService.initQCatalog(null,"PROVEEDOR VUELO",$("#spFlightProvider"), function(){
				ValuesService.applyMultiselect($("#spFlightProvider"));
			}, false);
			ProviderCodeRuleService.initQCatalog(null,"AEROLINEA",$("#spAirline"), function(){
				ValuesService.applyMultiselect($("#spAirline"));
			}, true);
			ProviderCodeRuleService.initQCatalog(null,"CONCILIACION VUELO",$("#spFlightConciliation"),function(){
				ValuesService.applyMultiselect($("#spFlightConciliation"));
			},true);

			ProviderCodeRuleService.initQCatalog(null,"TIPO DE EVENTO",$("#spEventType"),function(){
				ValuesService.applyMultiselect($("#spEventType"));
			}, false);
			ProviderCodeRuleService.initQCatalog(null,"PAIS",$("#spCountrySite"),function(){
				ValuesService.applyMultiselect($("#spCountrySite"));
				return;
			}, false);
			ProviderCodeRuleService.initQCatalog(null, "ITEM DE VUELO", $("#spFlightItem"), function(){
				ValuesService.applyMultiselect($("#spFlightItem"));
				return;
			}, false);
			ValuesService.applyMultiselect($("#spFlightType"));
		}
		$("#spFlightProvider").focus();
		
		return;
	});
	
	$("#btnAddSellType").on("click", function(){
		ProviderCodeRuleService.add();
		
		return;
	});
	
	$("#labelSelectAll").on("click", function(){
	    var rows = $('#tSpResult').dataTable().fnGetNodes();
	    $.each(rows, function(index, value){
		  var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
		  check.prop("checked", true);
	    });
	    $("#labelSelectAll").hide();
	});
	
	$("#spSelectAll").on("click", function(){
		var isChecked = $(this).prop("checked");
		var rows = $('#tSpResult').dataTable().fnGetNodes();
		if(isChecked){
		    if(rows.length > $('#tSpResult').dataTable().fnSettings()._iDisplayLength){
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
	
	$("#btnSpRemoveAll").on("click", function(){
		
		var list = [];
			
		var rows = $('#tSpResult').dataTable().fnGetNodes();
		
    $.each(rows, function (index, value) {
        var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
        var id = check.parent().parent().data("idlist");
        
        if (Commons.isValid(id)) {
            var ids = id.split(',');
            list = list.concat(ids);
        }
    });
	
		if(list.length > 0 ){
			ButtonRemove.remove(list,"provider-code","#tSpResult","rowid",ProviderCodeRuleService.getLastVersion);
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
	
	$("#btnSpSearch").on("click", function(){
		
		var params = [];
		
		params.push(RestConnector.buildPair("flightProvider", $("#filterSpFlightProvider").val())); 
		params.push(RestConnector.buildPair("airline", $("#filterSpAirline").val())); 
		params.push(RestConnector.buildPair("flightType", $("#filterSpFlightType").val()));
		params.push(RestConnector.buildPair("eventType", $("#filterSpEventType").val()));
		params.push(RestConnector.buildPair("flightConciliation", $("#filterSpFlightConciliation").val()));
		params.push(RestConnector.buildPair("countrySite", $("#filterSpCountrySite").val()));
		params.push(RestConnector.buildPair("flightItem", $("#filterSpFlightItem").val()));
		
		ProviderCodeRuleService.get(params);
		
		return;
	});
	
	ProviderCodeRuleService.get();
	Q.fcall(function(){
	ProviderCodeRuleService.initQCatalog(null,"PROVEEDOR VUELO",$("#filterSpFlightProvider"));
	ProviderCodeRuleService.initQCatalog(null,"AEROLINEA",$("#filterSpAirline"));
	ProviderCodeRuleService.initQCatalog(null,"CONCILIACION VUELO",$("#filterSpFlightConciliation"));
	ProviderCodeRuleService.initQCatalog(null,"TIPO DE EVENTO",$("#filterSpEventType"));
	ProviderCodeRuleService.initQCatalog(null,"PAIS",$("#filterSpCountrySite"));
	ProviderCodeRuleService.initQCatalog(null,"ITEM DE VUELO",$("#filterSpFlightItem"));
	
	return;
	}).then( function(){
		$("#filteredSearch").show();
		return;
	});
	
	ProviderCodeRuleService.showActionButtons();
	
	$("#btnImport").tooltip();
	$('#btnAddRule').tooltip();
	$('#btnRuleExport').tooltip();
	$('#btnReleaseVersion').tooltip();
	$('#btnSubscritNotification').tooltip();
	$("#btnRuleExport").on("click", function(){
		
		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/provider-code/xls");
		$("#frmRuleSellPointExport").submit();
		
		return;
	});
	
	$("#btnReleaseVersion").on("click", function(){
	    noty({
		text:  '<div class="noty_message"><span class="noty_text">Esta seguro de aprobar esta version? Ingrese fecha de inicio:</span>'+
		'<div id="spNewVersionDate" class="input-append input-group dtpicker">'+
		'<input data-format="dd/MM/yyyy" type="text" class="form-control">'+
		'<span class="input-group-addon add-on">'+
			'<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>'+
		'</span></div></div><div class="noty_close"></div>',
		modal:true,
		layout: 'topCenter',
		type: "error",
		callback:{

		    onShow: function() {
			$('#spNewVersionDate').datetimepicker({
			      	pickTime: false,
			      	autoclose: true
			    });
			
			 $('.bootstrap-datetimepicker-widget').css('z-index', 99999999999999);
			 $('#spNewVersionDate').datepicker('setDate', new Date());
		    },
		    afterShow: function() {},
		    onClose: function() {},
		    afterClose: function() {},
		    onCloseClick: function() {},
		    
		},
		animation: {
	        open: 'animated bounceIn', // Animate.css class names
	        close: 'animated flipOutX', // Animate.css class names
	        easing: 'swing', // unavailable - no need
	        speed: 500 // unavailable - no need
		},
		buttons: [
			{addClass: 'btn btn-success sm', text: 'Aceptar', onClick: function($noty) {
			    var versionDate = $("#spNewVersionDate").children('input').val();
			    if(Commons.isBlank(versionDate)){
			    	noty(
		 			   {
		 				   text: '<strong>La fecha de inicio es obligatoria</strong>',
		 				   layout:'topRight',
		 				   type:'error',
		 				   timeout:5000,
		 				   animation: {
		 				        open: 'animated bounceInDown', // Animate.css class names
		 				        close: 'animated bounceOutUp', // Animate.css class names
		 				        easing: 'swing', // unavailable - no need
		 				        speed: 500 // unavailable - no need
		 				   }
		 			   }
		 		   	);
			    	
			    	return false;
			    }
			    ProviderCodeRuleService.relaseNewVersion(versionDate); 
			    $noty.close();
			}
			},
			{addClass: 'btn btn-default sm', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
			}
		]
	    });
	    	
	    	
	});
	
	$("#frmRuleSellPointExport").on('submit', function() {
		$("#frmRuleSellPointExport").find("input[type='hidden']").remove();
		
		Commons.makeSubmitUrl("flightProvider", $("#filterSpFlightProvider").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("airline", $("#filterSpAirline").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("flightType", $("#filterSpFlightType").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("eventType", $("#filterSpEventType").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("flightConciliation", $("#filterSpFlightConciliation").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("countrySite", $("#filterSpCountrySite").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("flightItem", $("#filterSpFlightItem").val(), '#frmRuleSellPointExport');
		
		return;
	});
	
	$("#btnRevisionAudited").on("click", function(){
    	$('.auditoria').width('95%');
    	ProviderCodeRuleService.getAuditedByCode();
	});
	
	ProviderCodeRuleService.getLastVersion();	
}

ProviderCodeRuleService.showActionButtons = function () {
	ButtonsRulesAction.showSubscritNotificationButton();
	ButtonsRulesAction.showAddButton();
	ButtonsRulesAction.showLoadRuleButton();
	ButtonsRulesAction.showRuleExportButton();
	ButtonsRulesAction.showMakeCommentButton();
	ButtonsRulesAction.showRevisionAuditedButton();
};

ProviderCodeRuleService.reset = function(){
	$("#ruleSellTypeFlag").val("A");
	$("#spAirline").val("");
	$("#spFlightProvider").val("");
	$("#spFlightType").val("");
	$("#spEventType").val("");
	$("#spFlightConciliation").val("");
	
	$("#spAirline option:selected").removeAttr("selected");
	$("#spAirline").multiselect('refresh');
	
	$("#spFlightProvider option:selected").removeAttr("selected");
	$("#spFlightProvider").multiselect('refresh');
	
	$("#spFlightType option:selected").removeAttr("selected");
	$("#spFlightType").multiselect('refresh');
	
	$("#spEventType option:selected").removeAttr("selected");
	$('#spEventType').multiselect("refresh");
	
	$("#spFlightConciliation option:selected").removeAttr("selected");
	$('#spFlightConciliation').multiselect("refresh");
	
	//$("#spCountrySite option:selected").removeAttr("selected");
	//$('#spCountrySite').multiselect("refresh");
	
	$("#spFlightItem option:selected").removeAttr("selected");
	$('#spFlightItem').multiselect("refresh");
	
	$("#spCountrySite option:selected").removeAttr("selected");
	$('#spCountrySite').multiselect("refresh");
	
	var validator = $("#frmAddRuleSellType").validate();
    validator.resetForm();
	   
	return;
}

ProviderCodeRuleService.add = function(){
    
    var validator = $("#frmAddRuleSellType").validate();
    	

	validator.element("#spAirline");
	validator.element("#spFlightConciliation");
	
    var flightProviderList = $("#spFlightProvider > option:selected");
    var flightTypeList = $("#spFlightType > option:selected");
    var eventTypeList = $("#spEventType > option:selected");
    var flightItemList = $("#spFlightItem > option:selected");
    
    var emptyList = flightProviderList.length == 0 || flightTypeList.length == 0 || eventTypeList.lenght == 0;
		
    if (emptyList & $("#ruleSellTypeFlag").val() != "U") {
        Noty.notyTopCenterError('Todos los campos son requeridos !!!');
    }
    if (!validator.valid() || (emptyList & $("#ruleSellTypeFlag").val() != "U")) {
        return false;
    }
	
    var $type = "POST";
	var obj = new Object();
	if($("#ruleSellTypeFlag").val() == "U"){
		$type = "PUT";
		obj.id = $("#ruleSellTypeId").val();
		obj.flightProvider = $("#spFlightProvider").val(); 
		obj.airline = $("#spAirline").val();
		obj.flightType = $("#spFlightType").val(); 
		obj.eventType = $("#spEventType").val();
		obj.flightConciliation = $("#spFlightConciliation").val();
		obj.flightItem = $("#spFlightItem").val();
	} 
	obj.airline = $("#spAirline").val();
	obj.flightConciliation = $("#spFlightConciliation").val();
	obj.countrySite = $("#spCountrySite").val();
	
    obj.flightProviderList = [];
    obj.flightTypeList = [];
    obj.eventTypeList = [];
    obj.flightItemList = [];
    
    var optFlightProviderList = $("#spFlightProvider > option:selected");
    $.each(optFlightProviderList, function () {
        obj.flightProviderList.push($(this).val());
        return;
    });

    var optFlightTypeList = $("#spFlightType > option:selected");
    $.each(optFlightTypeList, function () {
        obj.flightTypeList.push($(this).val());
        return;
    });

    var optEventTypeList = $("#spEventType > option:selected");
    $.each(optEventTypeList, function () {
        obj.eventTypeList.push($(this).val());
        return;
    });
    
    var optFlightItemList = $("#spFlightItem > option:selected");
    $.each(optFlightItemList, function () {
        obj.flightItemList.push($(this).val());
        return;
    });
	
	var $data = Commons.toJsonSnakeCase(obj);
	var settings = new Object();
	settings.data = $data;
	settings.url = "provider-code";
	settings.params = "";
	
	$.ajax({ 
	   type    : $type,
	   url     : Constants.CONTEXT_ROOT + "/app/service/provider-code",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   $("#ruleSellTypeFlag").val("A");
		   
		   if(data != null && data.status == 0){
			   
			   ProviderCodeRuleService.reset();
			   $("#modalAddRule").modal("hide");
			   
			   var table = $('#tSpResult').DataTable();
			   table.clear().draw();
			   ProviderCodeRuleService.get();
			   
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

ProviderCodeRuleService.get = function(params){
	
	var settings = new Object();
	settings.url = "provider-code";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = ProviderCodeRuleService.handler;
	
	RestConnector.get(settings);
	$("#labelSelectAll").hide();
	
	return;
}

ProviderCodeRuleService.handler = function(data){
	var table = $("#tSpResult").dataTable( {
		"fnInitComplete": function(){
			$('#tSpResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(3)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		"order": [[ 2, "asc" ]],
		"bDestroy" : true,
		"createdRow": function ( row, data, index ) {
			$(row).attr("id", "rowid_" + data.id);
    		$(row).data('rowid', data.id);

    		var idList = Commons.buildIdList(data.id_list);
    		
    		$(row).data('idlist', idList);
    		
    		return;
        },
        "drawCallback": function() {
        	PermissionService.doJobWithRoleables();
            return;
        },
        "iDisplayLength": 50,
        "data": data,
        "columns": [
			{ 	
				"className": 'centered Edition',
				"orderable": false,
				"render": function (data, type, row) {
					return "<input type='checkbox' id='selectedRow_" + row.id + "' value='X'>";
			    }
			},
			{
                "className": 'centered',
                "orderable": false,
                "render": function (data, type, row) {

                    var toShow = "[";

                    var list = row.flight_provider_description_list;
                    if (list != null && list != "") {
                        toShow += list.join();
                    }

                    toShow += "]";

                    return "<b>" + toShow + "</b>";
                }
            },
			{ 	
            	"className": 'centered',
            	"orderable": false,
            	"data": "airline"
            },
			{ 	
            	"className": 'centered',
            	"orderable": false,
            	"data": "flight_type_description"
            },
			{ 	
            	"className": 'centered',
            	"orderable": false,
            	"data": "event_type_description"
            },
            { 	
            	"className": 'centered',
				"orderable": true,
				"data": "country_site" 
            },
            { 	
            	"className": 'centered',
				"orderable": true,
				"data": "flight_item_description" 
            },
            { 	
            	"className": 'centered highlight',
				"orderable": true,
				"data": "flight_conciliation" 
            },
            { 	
            	"className": 'centered Edition',
            	"orderable": false,
            	"render": function (data, type, row) {
 
            		var idList = Commons.buildIdList(row.id_list);
            		
            		return "<span><a id='rowRemoveBtn_" + row.id + "' href='javascript:void(0);' class='roleable ESCRITURA'  onclick='javascript:ProviderCodeRuleService.removeOnly(\"" + idList + "\");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>"; //"<span id='showList_" + row.id + "'><a id='sellTypeUpdBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:ProviderCodeRuleService.update(" + row.id + ");' title='Actualizar fila'><i class='glyphicon glyphicon-cog'></i></a></span>&nbsp;" + 
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
};

ProviderCodeRuleService.update = function(id){
	var settings = new Object();
	var params = [];
	params.push(RestConnector.buildPair("id",$("#ruleSellTypeId").val(id)));
	
	var url = "provider-code";
	$("#ruleSellTypeFlag").val("U");
	
	settings.params = params;
	settings.url = url;
	
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/provider-code?id=" + id,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data != null && data.length == 1){
				   var entity = data[0];
				   
				   $('#spEnabledDate').children('input').val(entity.rule_start_date);
				   
				   $("#modalAddRule").modal("show");
				   
				   $("#spFlightProvider").val(entity.flight_provider);
				   $("#spAirline").val(entity.airline);
				   $("#spFlightType").val(entity.flight_type);
				   $("#spEventType").val(entity.event_type);
				   $("#spFlightConciliation").val(entity.flight_conciliation);
				   $("#spCountrySite").val(entity.country_site);
				   $("#spFlightItem").val(entity.flight_item);
				   
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

ProviderCodeRuleService.removeOnly = function(id){
	ButtonRemove.removeOnly(id, "provider-code", "#tSpResult", "rowid", ProviderCodeRuleService.getLastVersion);
}

ProviderCodeRuleService.getAuditedByCode = function(){
    
    $('#modalRuleSellTypeAuditedTable').modal('show');
   
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/provider-code",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       $("#auditedRuleSellTypeTable").DataTable().destroy();
	       RestConnector.appendTemplateResults(data, "#auditedRuleSellTypeTableBody", "#rowSellTypeAuditedSheet");
	       $("#auditedRuleSellTypeTable").DataTable({
		   "order":{
			   "columnDefs": [ {
		    	      "targets"  : 'no-sort',
		    	      "orderable": true,
		    	    }]
		   		}	
	    	    
	       });
	   },
	   error:function(data){
		   noty(
                   {
                       text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
                       layout: 'topRight',
                       type: 'error',
                       timeout: 10000,
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

ProviderCodeRuleService.relaseNewVersion = function(versionDate){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/provider-code/newVersion?versionDate=" + versionDate ,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	     if(data.status == 0){
		 	ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ","topRight", "success", false);
		 	ButtonsRulesAction.getInfoRuleStatus("PROVIDER_CODE","btnReleaseVersion");
		 	ProviderCodeRuleService.getLastVersion();
	     }else{
		 ButtonsRulesAction.showNoty("Ups! Error en release de nueva version","topRight", "alert", false);
	     }
	   },
	   error:function(data){
		   ButtonsRulesAction.showNoty("Ups! Error al querer aprobar la version: " + data.responseJSON.cause,"topRight", "alert", false);
		   
		   return;
	   }
	});
}

ProviderCodeRuleService.getLastVersion = function(){
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=PROVIDER_CODE&activated=true",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data != null){
	    	   $("#versionBox").removeClass("hide");
	    	   $("#headerVersion").text(data.version +".0");
	       }
	       
	       return;
	   },
	   error:function(data){
		   console.log(data);
		   return;
	   }
	});
    
    ButtonsRulesAction.getInfoRuleStatus("PROVIDER_CODE","btnReleaseVersion");
}

ProviderCodeRuleService.initQCatalog = function(params, catalogType, comboElement, functionToApply, enabledFirstOpt){
	if(enabledFirstOpt == null || enabledFirstOpt == undefined){
		enabledFirstOpt = true;
	}
	var settings = new Object();
	settings.url = "catalogue";
	if(params == null || params === undefined){
		params = [];
	}
	params.push({"name" : "catalogueTypeDescription", "value": catalogType});
	settings.params = params;
	settings.handler = function(list){
		ValuesService.buildCombo(comboElement, list, enabledFirstOpt, true);
		
		if(functionToApply != null && functionToApply != undefined){
			functionToApply();
		}
		return;
	};
	RestConnector.qGet(settings);
	
	return;
}
