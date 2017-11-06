FictionalChargeService = function(){}

FictionalChargeService.init = function(){
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		$('#filterSpCountrySite').multiselect("refresh");
		
		return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("FICTIONAL_CHARGE","EDITION");
	    return;
	});
	
	$("#btnSubscritNotification").on("click", function(){
	    $("#modalSubscriptionRule").modal('show');
	});
	
	$("#modalSubscriptionRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showSubcriptionOption("FICTIONAL_CHARGE");
	    return;
	});
	
	$("#btnSendToApproval").on("click", function(){
	    ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("FICTIONAL_CHARGE","btnReleaseVersion", "WATING_APPROVAL");
	    });
	    return;
	});
	
	$("#btnBackToEdition").on("click", function(){
	    ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("FICTIONAL_CHARGE","btnReleaseVersion", "EDITION");
	    });
	    return;
	});
	
	$('#modalAddRule').on('hidden.bs.modal', function (e) {
		
	    FictionalChargeService.reset();
		
		return;
	});
	
	$('#modalAddRule').on('show.bs.modal', function (e) {
		
		$("#spProductType").focus();
		if($("#ruleSellTypeFlag").val() == "A"){
			$("#spProductTypeUnique").next().addClass("hide");
			$("#spProductType").next().removeClass("hide");
			
			$("#spCountrySiteUnique").next().addClass("hide");
			$("#spCountrySite").next().removeClass("hide")
				
			$("#spCurrencyTypeUnique").next().addClass("hide");
			$("#spCurrencyType").next().removeClass("hide");
			
			$("#spCollectionChannelUnique").next().addClass("hide");
			$("#spCollectionChannel").next().removeClass("hide");
			
			$("#spMerchantUnique").next().addClass("hide");
			$("#spMerchant").next().removeClass("hide");
			
			$("#spPaymentMethodUnique").next().addClass("hide");
			$("#spPaymentMethod").next().removeClass("hide");
		} else {
			$("#spProductType").next().addClass("hide");
			$("#spProductTypeUnique").next().removeClass("hide");
			
			$("#spCountrySite").next().addClass("hide");
			$("#spCountrySiteUnique").next().removeClass("hide");
			
			$("#spCurrencyType").next().addClass("hide");
			$("#spCurrencyTypeUnique").next().removeClass("hide");
			
			$("#spCollectionChannel").next().addClass("hide");
			$("#spCollectionChannelUnique").next().removeClass("hide");
			
			$("#spMerchant").next().addClass("hide");
			$("#spMerchantUnique").next().removeClass("hide");
			
			$("#spPaymentMethod").next().addClass("hide");
			$("#spPaymentMethodUnique").next().removeClass("hide");
		}
		
		return;
	});
	
	$("#btnAddSellType").on("click", function(){
		
	    FictionalChargeService.add();
		
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
		
		 $.each(rows, function(index, value){
			  var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
			  var id = check.parent().parent().data("rowid");
			 
			  if(id != undefined){
			      list.push(id.toString())
			  }
			 
		    });
		 
		if(list.length > 0 ){
			ButtonRemove.remove(list,"fictional-charge","#tSpResult","rowid",FictionalChargeService.getLastVersion);
		} else {
		    ButtonsRulesAction.showNoty("No ha seleccionado ningún elemento para borrar","topRight", "warning", false);
		}
		
		return;
	});
	
	$("#btnSpSearch").on("click", function(){
		
		var params = [];
		
		params.push(RestConnector.buildPair("legalOM", $("#filterSpLegalEntityOM").val())); 
		params.push(RestConnector.buildPair("legalARRF", $("#filterSpLegalEntityARRF").val()));
		params.push(RestConnector.buildPair("fictionalCharge", $("#filterFictionalCharge").val()));
				
		FictionalChargeService.get(params);
		
		return;
	});
	
	FictionalChargeService.get();
	LegalEntityService.get(FictionalChargeService.legalEntityHandler);
	CountryService.get(null, null, FictionalChargeService.countryHandler);
	FictionalChargeService.initProductType();
	FictionalChargeService.initCurrencyType();
	FictionalChargeService.initPaymentMethod();
	FictionalChargeService.initCollectionChannel();
	FictionalChargeService.initMerchant();
	FictionalChargeService.showActionButtons();
	
	$("#btnImport").tooltip();
	$('#btnAddRule').tooltip();
	$('#btnRuleExport').tooltip();
	$('#btnReleaseVersion').tooltip();
	$('#btnSendToApproval').tooltip();
	$('#btnBackToEdition').tooltip();
	$('#btnRevisionAudited').tooltip();
	$('#btnSubscritNotification').tooltip();
	$('#btnMakeComment').tooltip();
	
	
	$("#btnRuleExport").on("click", function(){
		
		$("#frmExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/fictional-charge/xls");
		$("#frmExport").submit();
		
		return;
	});
	
	$("#btnReleaseVersion").on("click", function(){
	    noty({
		text: '<div class="noty_message"><span class="noty_text">Esta seguro de aprobar esta version? Ingrese fecha de inicio:</span>'+
		'<div id="spNewVersionDate" class="input-append input-group dtpicker">'+
		'<input data-format="dd/MM/yyyy" type="text" class="form-control">'+
		'<span class="input-group-addon add-on">'+
			'<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>'+
		'</span></div></div><div class="noty_close"></div>',
		modal:true,
		layout: 'topCenter',
		type: "error",
		callback: {
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
			    FictionalChargeService.relaseNewVersion(versionDate); 
			    $noty.close();
			}
			},
			{addClass: 'btn btn-default sm', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
			}
		]
	    });
	    	
	    	
		return;
	});
	
	$("#frmExport").on('submit', function() {
		$("#frmExport").find("input[type='hidden']").remove();
	     
		Commons.makeSubmitUrl("productType", $("#filterSpProductType").val(), '#frmExport');
		Commons.makeSubmitUrl("countryCodeSite", $("#filterSpCountrySite").val(), '#frmExport');
		Commons.makeSubmitUrl("countryCodeProvider", $("#filterSpCountryProvider").val(), '#frmExport');
		Commons.makeSubmitUrl("sourceSystemNumber", $("#filterSpSsn").val(), '#frmExport');
		Commons.makeSubmitUrl("supplier", $("#filterSpSupplier").val(), '#frmExport');
		Commons.makeSubmitUrl("gateway", $("#filterSpGateway").val(), '#frmExport');
		Commons.makeSubmitUrl("assistanceType", $("#filterSpAssistanceType").val(), '#frmExport');
		Commons.makeSubmitUrl("affiliatedAgency", $("#filterSpAffiliatedAgency").val(), '#frmExport');
		Commons.makeSubmitUrl("prepayment", $("#filterSpPrepayment").val(), '#frmExport');
		Commons.makeSubmitUrl("sellType", $("#filterSpSellType").val(), '#frmExport');
		
		return;
	});
	
	$("#btnRevisionAudited").on("click", function(){
		FictionalChargeService.getAuditedByCode();
	});
	
	return;
};

FictionalChargeService.showActionButtons = function () {
	ButtonsRulesAction.showSubscritNotificationButton();
	ButtonsRulesAction.showAddButton();
	ButtonsRulesAction.showLoadRuleButton();
	ButtonsRulesAction.showRuleExportButton();
	ButtonsRulesAction.showMakeCommentButton();
	ButtonsRulesAction.showRevisionAuditedButton();
};

FictionalChargeService.reset = function(){
	
	$("#spLegalEntityOM option:selected").removeAttr("selected");
	$("#spLegalEntityOM").multiselect('refresh');
	$("#spLegalEntityARRF option:selected").removeAttr("selected");
	$("#spLegalEntityARRF").multiselect('refresh');
	
	$("#spCountryProvider option:selected").removeAttr("selected");
	$('#spCountryProvider').multiselect("refresh");
	$("#spSsn").val("");
	$("#spFictionalCharge > option:first").prop("selected", true);
	   
	return;
}

FictionalChargeService.add = function(){

	var $type = "POST";
	var obj = new Object();
	if($("#ruleSellTypeFlag").val() == "U"){
		$type = "PUT";
		obj.id = $("#ruleSellTypeId").val();
		obj.productType = $("#spProductTypeUnique").val(); 
		obj.countryCodeSite = $("#spCountrySiteUnique").val(); 
		
		obj.currencyType = $("#spCurrencyTypeUnique").val(); 
		obj.paymentMethod = $("#spPaymentMethodUnique").val(); 
		obj.collectionChannel = $("#spCollectionChannelUnique").val(); 
		obj.merchant = $("#spMerchantUnique").val(); 
	}
	obj.ruleStartDate = $("#spEnabledDate").children('input').val();
	
	obj.legalEntityOMCode=$("#spLegalEntityOM").val();
	obj.legalEntityOMDesctiption=$("#spLegalEntityOM").val();
	
	obj.legalEntityARRFCode=$("#spLegalEntityARRF").val();
	obj.legalEntityARRFDesctiption=$("#spLegalEntityARRFs").val();
	
	obj.fictionalCharge =$("#spFictionalCharge").val(); 
	
	var $data = Commons.toJsonSnakeCase(obj);
	
	$.ajax({ 
	   type    : $type,
	   url     : Constants.CONTEXT_ROOT + "/app/service/fictional-charge",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   
		   $("#ruleSellTypeFlag").val("A");
		   
		   if(data != null && data.status == 0){
			   
			   FictionalChargeService.reset();
			   $("#modalAddRule").modal("hide");
			   
			   var table = $('#tSpResult').DataTable();
			   table.clear().draw();
			   FictionalChargeService.get();
			   
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

FictionalChargeService.get = function(params){
	
	var settings = new Object();
	settings.url = "fictional-charge";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = FictionalChargeService.handler;

	RestConnector.get(settings);
	 $("#labelSelectAll").hide();
	FictionalChargeService.getLastVersion();
	return;
}

FictionalChargeService.legalEntityHandler = function(data){
	
	var leType = $("#filterSpLegalEntityOM");
	var filterARRF = $("#filterSpLegalEntityARRF");
	var spOM = $("#spLegalEntityOM");
	var spARRF = $("#spLegalEntityARRF");
		
	$.each(data, function(){
		
		var le = this;
		
		leType.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
		
		return;
	});
	
        	leType.multiselect({
            enableFiltering: true,
            buttonWidth: '100%',
            enableCaseInsensitiveFiltering: true,
            maxHeight: 400
        	});
            
        $.each(data, function(){
        		
        		var le = this;
        		
        		filterARRF.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
        		
        		return;
        });
        	
        	filterARRF.multiselect({
                enableFiltering: true,
                buttonWidth: '100%',
                enableCaseInsensitiveFiltering: true,
                maxHeight: 400
        	});
        
        $.each(data, function(){
        	
        	var le = this;
        	
        	spARRF.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
        	
        	return;
        });
        
        	spARRF.multiselect({
                enableFiltering: true,
                buttonWidth: '100%',
                enableCaseInsensitiveFiltering: true,
                maxHeight: 400
                });
        	
        	   $.each(data, function(){
               	
               	var le = this;
               	
               	spOM.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
               	
               	return;
               });
               
        	   spOM.multiselect({
                       enableFiltering: true,
                       buttonWidth: '100%',
                       enableCaseInsensitiveFiltering: true,
                       maxHeight: 400
                       });
	
	return;
}

FictionalChargeService.handler = function(data){
    	var table = $("#tSpResult").dataTable( {
		"fnInitComplete": function(){
			$('#tSpResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(3)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		"bDestroy" : true,
		responsive: false,
		"createdRow": function ( row, data, index ) {
			$(row).attr("id", "rowid_" + data.id);
    		$(row).data('rowid', data.id);
    		
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
            	"orderable": true,
            	"data": "legal_entity_omdesctiption"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "legal_entity_arrfdesctiption"
            },
            { 
            	"className": 'centered highlight',
            	"orderable": true,
            	"render": function (data,type,row) {
					if (row.fictional_charge) {
						return "Verdadero";
					} else {
						return "Falso";
					}
				}
            },
            { 	
            	"className": 'centered Edition',
            	"orderable": false,
            	"render": function (data, type, row) {
            		return 	"<span id='showList_" + row.id + "'><a id='sellTypeUpdBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:FictionalChargeService.update(" + row.id + ");' title='Actualizar fila'><i class='glyphicon glyphicon-cog'></i></a></span>&nbsp;" + 
     		       			"<span><a id='rowRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:FictionalChargeService.removeOnly(" + row.id + ");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>";
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

FictionalChargeService.update = function(id){

	$("#ruleSellTypeFlag").val("U");
	$("#ruleSellTypeId").val(id);
	
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/fictional-charge?id=" + id,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data != null && data.length == 1){
				 
				   var entity = data[0];  

				   $("#spLegalEntityOM").val(entity.legal_entity_omcode);
				   $("#spLegalEntityOM").multiselect('refresh');
				   
				   $("#spLegalEntityARRF").val(entity.legal_entity_arrfcode);
				   $("#spLegalEntityARRF").multiselect('refresh');
				   
				   $("#spFictionalCharge").val(""+entity.fictional_charge);				   
				   
				   $("#modalAddRule").modal("show");
				   
				   return;
			   }else{
			       ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.message ,"topRight", "alert", false);
			   }
			   
			   return;
		   },
		   error:function(data){
		       ButtonsRulesAction.showNoty("Se ha producido un error, mensaje: " + data.responseJSON.cause ,"topRight", "error", false);

			   return;
		   }
		});
	
	return;
}

FictionalChargeService.countryHandler = function(countryList){
	
	var firstOption = new Object();
	firstOption.value = "*";
	firstOption.description = "*";
	
	CountryService.doComboFill($('#spCountrySite'), countryList, firstOption);
	CountryService.doComboFill($('#spCountrySiteUnique'), countryList, firstOption);
	CountryService.doComboFill($('#filterSpCountrySite'), countryList, firstOption, true);
	
	return;
}

FictionalChargeService.initProductType = function(params){
	
	var settings = new Object();
	settings.url = "values/product-types/all";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#spProductType"), list, false, true);
		ValuesService.buildCombo($("#spProductTypeUnique"), list, false, true);
		ValuesService.buildCombo($("#filterSpProductType"), list, true, true);
		
		$("#spProductType,#spProductTypeUnique").multiselect({
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
	};
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargeService.initCurrencyType = function(params){
	
	var settings = new Object();
	settings.url = "values/currency-type/all";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#spCurrencyType"), list, false, true);
		ValuesService.buildCombo($("#spCurrencyTypeUnique"), list, false, true);
		ValuesService.buildCombo($("#filterSpCurrencyType"), list, true, true);
		
		$("#spCurrencyType,#spCurrencyTypeUnique").multiselect({
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
	};
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargeService.initPaymentMethod = function(params){
	
	var settings = new Object();
	settings.url = "values/payment-method/all";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#spPaymentMethod"), list, false, true);
		ValuesService.buildCombo($("#spPaymentMethodUnique"), list, false, true);
		ValuesService.buildCombo($("#filterSpPaymentMethod"), list, true, true);
		
		$("#spPaymentMethod,#spPaymentMethodUnique").multiselect({
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
	};
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargeService.initCollectionChannel = function(params){
	
	var settings = new Object();
	settings.url = "values/collection-channel/all";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#spCollectionChannel"), list, false, true);
		ValuesService.buildCombo($("#spCollectionChannelUnique"), list, false, true);
		ValuesService.buildCombo($("#filterSpCollectionChannel"), list, true, true);
		
		$("#spCollectionChannel,#spCollectionChannelUnique").multiselect({
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
	};
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargeService.initMerchant = function(params){
	
	var settings = new Object();
	settings.url = "values/merchant/all";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#spMerchant"), list, false, true);
		ValuesService.buildCombo($("#spMerchantUnique"), list, false, true);
		ValuesService.buildCombo($("#filterSpMerchant"), list, true, true);
		
		$("#spMerchant,#spMerchantUnique").multiselect({
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
	};
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargeService.removeOnly = function(id){
	return ButtonRemove.removeOnly(id.toString(),"fictional-charge","#tSpResult","rowid",FictionalChargeService.getLastVersion);
}

FictionalChargeService.getAuditedByCode = function(){
    
    $('#modalRuleFictionalAuditedTable').modal('show');
    $('.auditoria').width('80%');
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/fictional-charge",
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
	       console.log(data);
	   }
	});
}

FictionalChargeService.relaseNewVersion = function(versionDate){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/fictional-charge/newVersion?versionDate=" + versionDate ,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	     if(data.status == 0){
		 	ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ","topRight", "success", false)
		 	ButtonsRulesAction.getInfoRuleStatus("FICTIONAL_CHARGE","btnReleaseVersion");
		 	FictionalChargeService.getLastVersion();
	     }else{
		 ButtonsRulesAction.showNoty("Ups! Error en release de nueva version","topRight", "alert", false);
	     }
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

FictionalChargeService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=FICTIONAL_CHARGE&activated=true",
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
	   }
	});
    ButtonsRulesAction.getInfoRuleStatus("FICTIONAL_CHARGE","btnReleaseVersion");    
}