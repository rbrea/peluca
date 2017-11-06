PaymentRefundActiveService = function(){}

PaymentRefundActiveService.init = function(){
	
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});	
		return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("PAYMENT_REFUND", "ACTIVE", true);
	    return;
	});
	
	$("#btnShowVersionList").on("click", function(e){
		e.preventDefault();
		$('#modalLegalEntytyOMPPVersionList').modal('show');		
		return;
	});
	
	$("#BtnRevertVersion").on("click", function(e){
	    var versionToRevert = $(this).attr("data-version");
	    ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
		return PaymentRefundActiveService.revertToVersion(versionToRevert,"");
	    });  	  
	    return;
	});
		
	$('#modalLegalEntytyOMPPVersionList').on('hidden.bs.modal', function (e) {
	    PaymentRefundActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalLegalEntytyOMPPVersionList').on('show.bs.modal', function (e) {
		
	    PaymentRefundActiveService.getVersionList();
	    
		return;
	});
	
	$('#modalLegalEntytyOMPPVersion').on('show.bs.modal', function (e) {
		
	    $('#modalLegalEntytyOMPPVersionList').modal('hide');
	    
		return;
	});
	$('#modalLegalEntytyOMPPVersion').on('hidden.bs.modal', function (e) {
	    $('#modalLegalEntytyOMPPVersionList').modal('show');
	    $("#RuleVersionTable").DataTable().destroy();
	});
			
	$('#btnBackToEdit').tooltip();
	$('#btnShowVersionList').tooltip();
	PaymentRefundActiveService.get();
	ButtonMigration.init("payment-refund");
	
	$('#btnPaymentRefundRevisionAudited').on("click", function(){
	    ButtonsRulesAction.showActiveAuditedInfo("payment-refund-active", "modalPaymentRefundActiveAudited", 
		    "auditedPaymenRefundActiveTable","auditedPaymentRefundActiveTableBody","rowPaymentRefundAuditedActiveSheet");
	});

	$("#btnPaymentaRefundExport").on("click", function () {

		$("#frmPaymentRefundExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/payment-refund-active/xls");
		$("#frmPaymentRefundExport").submit();

		return;
	});
	
	return;
}

PaymentRefundActiveService.reset = function(){
	
	$("#spProductType option:selected").removeAttr("selected");
	$("#spProductType").multiselect('refresh');
	$("#spCountrySite option:selected").removeAttr("selected");
	$("#spCountrySite").multiselect('refresh');
	$("#spCountryProvider option:selected").removeAttr("selected");
	$('#spCountryProvider').multiselect("refresh");
	$("#spSsn").val("");
	$("#spSupplier").val("");
	$("#spGateway").val("");
	$("#spAssistanceType > option:first").prop("selected", true);
	$("#spAssistanceType").multiselect('refresh');
	$("#spAffiliatedAgency > option:first").prop("selected", true);
	$("#spAffiliatedAgency").multiselect('refresh');
	$("#spPrepayment > option:first").prop("selected", true);
	$("#spPrepayment").multiselect('refresh');
	$("#spEnabledDate").children('input').val("");
	$("#spSellType > option:first").prop("selected", true);
	$("#spSellType").multiselect('refresh');
	$("#ruleSellTypeFlag").val("A");
	$("#ruleSellTypeId").val("");
	
	$("#spProductTypeUnique option:selected").removeAttr("selected");
	$("#spProductTypeUnique").multiselect('refresh');
	$("#spCountrySiteUnique option:selected").removeAttr("selected");
	$("#spCountrySiteUnique").multiselect('refresh');
	$("#spCountryProviderUnique option:selected").removeAttr("selected");
	$("#spCountryProviderUnique").multiselect('refresh');
	   
	return;
}

PaymentRefundActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "payment-refund-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = PaymentRefundActiveService.handler;
	
	RestConnector.get(settings);
	
	return;
}

PaymentRefundActiveService.handler = function(data){
	var table = $("#tSpResult").dataTable( {
		"fnInitComplete": function(){
			$('#tSpResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(3)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		"iDisplayLength": "50",
		"bDestroy" : true,
		responsive: false,
		"createdRow": function ( row, data, index ) {
			$(row).attr("id", "rowid_" + data.id);
    		$(row).data('rowid', data.id);
    		
    		return;
        },
        "drawCallback": function() {
            $('[id^=showSellTypeAudited_]').on("click", function(){
            	$('.auditoria').width('80%');  
            	PaymentRefundActiveService.getAuditedByCode($(this).attr("data-code"));
            	
            	return;
            });
            
            return;
        },
        "data": data,
        "columns": [
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
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		var toShow = "[";
            		
            		var list = row.country_site_list;
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
            	"data": "payment_method_description"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "collection_channel_description"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "merchant_description"
            },
            { 
            	"className": 'centered highlight',
            	"orderable": true,
            	"data": "legal_entity_description"
            },
            { 	
            	"className": 'centered',
            	"orderable": true,
            	"data": "version"
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
	
	PermissionService.doJobWithRoleables();
	
	ReleaseVersionLog.initLastVersion("PAYMENT_REFUND", " Entidades Legales Cobro/Refund Activas - ", true);
	
	return;
};

PaymentRefundActiveService.getVersionList = function () {

	$.ajax({
		type: "GET",
		url: Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=PAYMENT_REFUND",
		dataType: 'json',
		contentType: "application/json;",
		success: function (data) {
			console.log(data);
			RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
			$("#VersionListTable").dataTable({
				"drawCallback": function () {
					$('[id^=showVersion_]').on("click", function () {

						PaymentRefundActiveService.getAuditedByCode($(this).attr("data-code"));

					});

					if (Environment.isProd()) {
						$('[id^=revertVersion_]').hide();
					} else {
						$('[id^=revertVersion_]').on("click", function () {

							var versionToRevert = $(this).attr("data-code")
							ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert + "? *los datos de edicion seran afectados*", "topCenter", "error", true, function () {
								return PaymentRefundActiveService.revertToVersion(versionToRevert, "");
							});

						});
					}
					PermissionService.doJobWithRoleables();
				}
			});

		},
		error: function (data) {
			console.log(data);
		}
	});
};

PaymentRefundActiveService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/payment-refund-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPPVersion').modal('show');
	      
	       PaymentRefundActiveService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

PaymentRefundActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    PaymentRefundActiveService.setInfoHeaderOldVersion(version);
    
}

PaymentRefundActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/PAYMENT_REFUND/"+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	   
	       var header = "Regla version N° " + version + " - Usario responsable: " +  data.user_aproved +
	       		" - Fecha de Inicio: " + data.release_version_date;
	       $("#versionRuleTitle").text(header);
	       $("#BtnRevertVersion").attr("data-version", version);	
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}



PaymentRefundActiveService.revertToVersion = function(version, date){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/payment-refund-active/revert?version="+ version + "&date=" + date,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data.status == 0){
		 	noty(
			   {
				   text: '<strong> Nueva version Actualizada con exito!! </strong>',
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
		 	$('#modalLegalEntytyOMPPVersionList').modal('hide');
		 	$('#modalLegalEntytyOMPPVersion').modal('hide');
	     }else{
		 noty(
			   {
				   text: '<strong>Ups! Error en release de nueva version</strong>',
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
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
    
}
