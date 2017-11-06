SellTypeService = function(){}

SellTypeService.firstAdd = true;

SellTypeService.showAddOrUpdateCombo = function (){
		$("#spProductType").focus();
	if($("#ruleSellTypeFlag").val() == "A"){
		$("#spProductTypeUnique").next().addClass("hide");
		$("#spProductType").next().removeClass("hide");
		
		$("#spCountrySiteUnique").next().addClass("hide");
		$("#spCountrySite").next().removeClass("hide");
		$("#spCountryDestinyUnique").next().addClass("hide");
		$("#spCountryDestiny").next().removeClass("hide");
	} else {
		$("#spProductType").next().addClass("hide");
		$("#spProductTypeUnique").next().removeClass("hide");
		
		$("#spCountrySite").next().addClass("hide");
		$("#spCountrySiteUnique").next().removeClass("hide");
		$("#spCountryDestiny").next().addClass("hide");
		$("#spCountryDestinyUnique").next().removeClass("hide");
	}
};

SellTypeService.init = function(){
 
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});

		$('#filterSpCountrySite :selected').removeAttr("selected");
		$('#filterSpCountrySite').multiselect("refresh");
		$('#filterSpCountryDestiny :selected').removeAttr("selected");
		$('#filterSpCountryDestiny').multiselect("refresh");
		
		return;
	});
	
	$("#btnSendToApproval").on("click", function(){
	    ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("SELL_TYPE","btnReleaseVersion", "WATING_APPROVAL");
	    });
	    return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("SELL_TYPE", "EDITION");
	    return;
	});
	
	$("#btnSubscritNotification").on("click", function(){
	    $("#modalSubscriptionRule").modal('show');
	});
	
	$("#modalSubscriptionRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showSubcriptionOption("SELL_TYPE");
	    return;
	});
	
	$("#btnBackToEdition").on("click", function(){
	    ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function(){
		return ButtonsRulesAction.updateRuleStatus("SELL_TYPE","btnReleaseVersion", "EDITION");
	    });
	    return;
	});
	
	$('#modalAddRule').on('hidden.bs.modal', function (e) {
		
		SellTypeService.reset();
		
		return;
	});
	
	$('#modalAddRule').on('show.bs.modal', function (e) {
		if(SellTypeService.firstAdd){
			SellTypeService.firstAdd = false;
			SellTypeService.initQCatalog(null,"TIPO DE VENTA",$("#spSellType"));
			SellTypeService.initQCatalog(null,"TIPO DE PRODUCTO",$("#spProductType"), function(){
				ValuesService.applyMultiselect($("#spProductType,#spProductTypeUnique"));
				SellTypeService.showAddOrUpdateCombo();
			});
			SellTypeService.initQCountry(null,"PAIS",[$("#spCountrySite"), $("#spCountryDestiny"),  $("#spCountrySiteUnique"), $("#spCountryDestinyUnique")]
			, null, null, SellTypeService.showAddOrUpdateCombo);
			}else{
				SellTypeService.showAddOrUpdateCombo();
			}	
		return;
		});
	
	$("#btnAddSellType").on("click", function(){
		SellTypeService.add();
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
			var id = check.parent().parent().data("idlist");
			
			if(Commons.isValid(id)){
				var ids = id.split(',');
				
				for(var k=0;k<ids.length;k++){
					list.push(ids[k]);
				}
			}
			
			return;
		});

		if(list.length > 0 ){
			ButtonRemove.remove(list,"rule-sell-type","#tSpResult","rowid",SellTypeService.getLastVersion);
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
		
		params.push(RestConnector.buildPair("productType", $("#filterSpProductType").val())); 
		params.push(RestConnector.buildPair("countryCodeSite", $("#filterSpCountrySite").val())); 
		params.push(RestConnector.buildPair("countryCodeDestiny", $("#filterSpCountryDestiny").val()));
		params.push(RestConnector.buildPair("sourceSystemNumber", $("#filterSpSsn").val()));
		params.push(RestConnector.buildPair("supplier", $("#filterSpSupplier").val()));
		params.push(RestConnector.buildPair("gateway", $("#filterSpGateway").val()));
		params.push(RestConnector.buildPair("affiliatedAgency", $("#filterSpAffiliatedAgency").val()));
		params.push(RestConnector.buildPair("prepayment", $("#filterSpPrepayment").val()));
		params.push(RestConnector.buildPair("ruleStartDate", $("#filterSpEnabledDate").children('input').val()));
		params.push(RestConnector.buildPair("sellType", $("#filterSpSellType").val()));
		
		params.push(RestConnector.buildPair("channel", $("#filterSpChannel").val()));
		
		SellTypeService.get(params);
		
		return;
	});
	
		SellTypeService.get();
		SellTypeService.initQCatalog(null,"TIPO DE VENTA",$("#filterSpSellType"));
		SellTypeService.initQCatalog(null,"TIPO DE PRODUCTO",$("#filterSpProductType"));
		SellTypeService.initQCountry(null,"PAIS",[$("#filterSpCountrySite"), $("#filterSpCountryDestiny")], null,true);
		SellTypeService.showActionButtons();
	

	
	$("#btnImport").tooltip();
	$('#btnAddRule').tooltip();
	$('#btnRuleExport').tooltip();
	$('#btnReleaseVersion').tooltip();
	$('#btnSubscritNotification').tooltip();
	$("#btnRuleExport").on("click", function(){
		
		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/rule-sell-type/xls");
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
			    SellTypeService.relaseNewVersion(versionDate); 
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
	     
		Commons.makeSubmitUrl("productType", $("#filterSpProductType").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("countryCodeSite", $("#filterSpCountrySite").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("countryCodeDestiny", $("#filterSpCountryDestiny").val(), '#frmRuleSellPointExport');
		Commons.makeSubmitUrl("affiliatedAgency", $("#filterSpAffiliatedAgency").val(), '#frmRuleSellPointExport');
		
		Commons.makeSubmitUrl("channel", $("#filterSpChannel").val(), '#frmRuleSellPointExport');

		Commons.makeSubmitUrl("sellType", $("#filterSpSellType").val(), '#frmRuleSellPointExport');
		
	});
	
	$("#btnRevisionAudited").on("click", function(){
    	$('.auditoria').width('95%');
    	SellTypeService.getAuditedByCode();
	});
	
		
}

SellTypeService.showActionButtons = function () {
	ButtonsRulesAction.showSubscritNotificationButton();
	ButtonsRulesAction.showAddButton();
	ButtonsRulesAction.showLoadRuleButton();
	ButtonsRulesAction.showRuleExportButton();
	ButtonsRulesAction.showMakeCommentButton();
	ButtonsRulesAction.showRevisionAuditedButton();
};

SellTypeService.reset = function(){
	
	$("#spProductType option:selected").removeAttr("selected");
	$("#spProductType").multiselect('refresh');
	$("#spCountrySite option:selected").removeAttr("selected");
	$("#spCountrySite").multiselect('refresh');
	$("#spCountryDestiny option:selected").removeAttr("selected");
	$("#spCountryDestiny").multiselect('refresh');
	
	$("#spAffiliatedAgency > option:first").prop("selected", true);
	//$("#spAffiliatedAgency").multiselect('refresh');
	//$("#spPrepayment").multiselect('refresh');
	$("#spEnabledDate").children('input').val("");
	$("#spSellType > option:first").prop("selected", true);
	//$("#spSellType").multiselect('refresh');
	$("#ruleSellTypeFlag").val("A");
	$("#spChannel").val("");
	$("#ruleSellTypeId").val("");
	
	$("#spProductTypeUnique option:selected").removeAttr("selected");
	//$("#spProductTypeUnique").multiselect('refresh');
	$("#spCountrySiteUnique option:selected").removeAttr("selected");
	$("#spCountrySiteUnique").multiselect('refresh');
	$("#spCountryDestinyUnique option:selected").removeAttr("selected");
	$("#spCountryDestinyUnique").multiselect('refresh');
	
	var validator = $("#frmAddRuleSellType").validate();
    validator.resetForm();
	   
	return;
}

SellTypeService.add = function(){
    
    	var validator = $("#frmAddRuleSellType").validate();
    	
	validator.element("#spCountrySite");
	validator.element("#spCountryDestiny");
	validator.element("#spChannel");
	validator.element("#spAffiliatedAgency");
	validator.element("#spSellType");
	
	var producList = $("#spProductType > option:selected");
	var countrySitList = $("#spCountrySite > option:selected");
	var countryDestList = $("#spCountryDestiny > option:selected");
	

	var emptyList = producList.length == 0 || countrySitList.length == 0 || countryDestList.length == 0;
	if (emptyList  & $("#ruleSellTypeFlag").val() != "U"){
	    noty(
			   {
				   text: '<strong>Todos los campos son requeridos !!!</strong>',
				   layout:'topCenter',
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
	if(!validator.valid() || (emptyList & $("#ruleSellTypeFlag").val() != "U")){
		return false;
	}
	var $type = "POST";
	var obj = new Object();
	if($("#ruleSellTypeFlag").val() == "U"){
		$type = "PUT";
		obj.id = $("#ruleSellTypeId").val();
		obj.productType = $("#spProductTypeUnique").val(); 
		obj.countryCodeSite = $("#spCountrySiteUnique").val();
		obj.countryCodeDestiny = $("#spCountryDestinyUnique").val(); 
	} else {
		obj.productTypeList = [];
		obj.countrySiteList = [];
		obj.countryDestinyList = [];

		var optProductTypeList = $("#spProductType > option:selected");
		var optCountrySiteList = $("#spCountrySite > option:selected");
		var optCountryDestinyList = $("#spCountryDestiny > option:selected");
		
		$.each(optProductTypeList, function(){
			obj.productTypeList.push($(this).val());
			
			return;
		});
		$.each(optCountrySiteList, function(){
			obj.countrySiteList.push($(this).val());
			
			return;
		});
		$.each(optCountryDestinyList, function(){
			obj.countryDestinyList.push($(this).val());
			
			return;
		});
	}
	obj.affiliatedAgency = $("#spAffiliatedAgency").val();
	
	obj.channel = $("#spChannel").val();
	
	obj.ruleStartDate = $("#spEnabledDate").children('input').val();
	obj.sellType = $("#spSellType").val();
	
	var $data = Commons.toJsonSnakeCase(obj);

	var settings = new Object();
	settings.data = $data;
	settings.url = "rule-sell-type";
	settings.params = "";
	
	$.ajax({ 
	   type    : $type,
	   url     : Constants.CONTEXT_ROOT + "/app/service/rule-sell-type",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   
		   $("#ruleSellTypeFlag").val("A");
		   
		   if(data != null && data.status == 0){
			   
			   SellTypeService.reset();
			   $("#modalAddRule").modal("hide");
			   
			   var table = $('#tSpResult').DataTable();
			   table.clear().draw();
			   SellTypeService.get();
			   
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

SellTypeService.get = function(params){
	
	var settings = new Object();
	settings.url = "rule-sell-type";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = SellTypeService.handler;
	
	RestConnector.get(settings);
	$("#labelSelectAll").hide();
	SellTypeService.getLastVersion();
	
	return;
}

SellTypeService.handler = function(data){

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
            	"orderable": true,
            	"data": "channel_description"
            },
			{ 	
            	"className": 'centered',
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		var toShow = "[";
            		
            		var list = row.product_type_description_list;
            		if(list != null && list != ""){
            			var flag = true;
            			$.each(list, function(){
            				
            				if(flag){
            					toShow += "" + this;
            					flag = false;
            				} else {
            					toShow += "," + this;
            				}
            				
            				return;
            			});
            		}
            		
            		toShow += "]";
            		
					return "<b>" + toShow + "</b>";
			    }
            },
            { 	
            	"className": 'centered',
				"orderable": true,
				"data": "country_code_site" 
            },
            { 	
            	"className": 'centered',
				"orderable": true,
				"data": "country_code_destiny" 
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "affiliated_agency_description"
            },
            { 
            	"className": 'centered highlight',
            	"orderable": true,
            	"data": "sell_type_description"
            },
            { 	
            	"className": 'centered Edition',
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		var idList = Commons.buildIdList(row.id_list);
            		
            		return "<span><a id='rowRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:SellTypeService.removeOnly(\"" + idList + "\");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>"; 
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

SellTypeService.update = function(id){
	var settings = new Object();
	var params = [];
	params.push(RestConnector.buildPair("id",$("#ruleSellTypeId").val(id)));
	
	var url = "rule-sell-type";
	$("#ruleSellTypeFlag").val("U");
	
	settings.params = params;
	settings.url = url;
	
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/rule-sell-type?id=" + id,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data != null && data.length == 1){
				   
				   var entity = data[0];
				   
				   Commons.setOptionValue("spProductTypeUnique", entity.product_type);
				   Commons.setMultiselectOptionValue("spCountrySiteUnique", entity.country_code_site);
				   Commons.setMultiselectOptionValue("spCountryDestinyUnique", entity.country_code_destiny);
				   
				   $("#spSsn").val(entity.source_system_number);
				   $("#spSupplier").val(entity.supplier);
				   $("#spGateway").val(entity.gateway);

				   $('#spEnabledDate').children('input').val(entity.rule_start_date);
				   
				   $("#modalAddRule").modal("show");
				   
				   $("#spSellType").val(entity.sell_type);
				   $("#spAffiliatedAgency").val(entity.affiliated_agency);
				   $("#spPrepayment").val(entity.prepayment);

				   return;
			   } else {
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

SellTypeService.countryHandler = function(countryList){
	
	var firstOption = new Object();
	firstOption.value = "*";
	firstOption.description = "*";
	
	CountryService.doComboFill($('#spCountrySite'), countryList, firstOption);
	CountryService.doComboFill($('#spCountryDestiny'), countryList, firstOption);
	CountryService.doComboFill($('#spCountrySiteUnique'), countryList, firstOption);
	CountryService.doComboFill($('#spCountryDestinyUnique'), countryList, firstOption);
	CountryService.doComboFill($('#filterSpCountrySite'), countryList, firstOption, true);
	CountryService.doComboFill($('#filterSpCountryDestiny'), countryList, firstOption, true);
	
	return;
}

SellTypeService.removeOnly = function(id){

	ButtonRemove.removeOnly(id,"rule-sell-type","#tSpResult","rowid",SellTypeService.getLastVersion);
}

SellTypeService.getAuditedByCode = function(){
    
    $('#modalRuleSellTypeAuditedTable').modal('show');
   
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/rule-sell-type",
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

SellTypeService.relaseNewVersion = function(versionDate){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/rule-sell-type/newVersion?versionDate=" + versionDate ,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	     if(data.status == 0){
		 	ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ","topRight", "success", false);
		 	ButtonsRulesAction.getInfoRuleStatus("SELL_TYPE","btnReleaseVersion");
		 	SellTypeService.getLastVersion();
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

SellTypeService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=SELL_TYPE&activated=true",
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
    
    ButtonsRulesAction.getInfoRuleStatus("SELL_TYPE","btnReleaseVersion");
    
}

SellTypeService.initQCountry = function(params, catalogType, comboElementList,firstOption, blankOptionEnabled, toResponseFunction){
	
	var settings = new Object();
	settings.url = "catalogue";
	if(params == null || params === undefined){
		params = [];
	}
	params.push({"name" : "catalogueTypeDescription", "value": catalogType});
	settings.params = params;
	settings.handler = function(countryList){
	 $.each( comboElementList, function( key, value ) {
			CountryService.doComboFill(value, countryList, firstOption, blankOptionEnabled);
		});
		$("#filteredSearch").show();
		if (toResponseFunction != null && toResponseFunction != undefined){
			toResponseFunction();
		}
	};
	return RestConnector.qGet(settings);
}

SellTypeService.initQCatalog = function(params, catalogType, comboElement, toResponseFunction){
	
	var settings = new Object();
	settings.url = "catalogue";
	if(params == null || params === undefined){
		params = [];
	}
	params.push({"name" : "catalogueTypeDescription", "value": catalogType});
	settings.params = params;
	settings.handler = function(list){
		ValuesService.buildCombo(comboElement, list, true, true);
		if (toResponseFunction != null && toResponseFunction != undefined){
			toResponseFunction();
		}
		
		return;
	};
	
	return RestConnector.qGet(settings);
}