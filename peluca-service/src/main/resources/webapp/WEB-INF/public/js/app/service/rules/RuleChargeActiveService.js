RuleChargeActiveService = function(){}

RuleChargeActiveService.init = function(){
	
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		$('#filterSpCountrySite').multiselect("refresh");
		$('#filterSpCountryProvider').multiselect("refresh");
		
		return;
	});
	
	$("#btnShowVersionList").on("click", function(e){
		e.preventDefault();
		$('#modalRuleSellTypeVersionList').modal('show');		
		return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
		
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("RULE_CHARGE","ACTIVE", true);
	    return;
	});
	
	$("#btnRevisionAudited").on("click", function(){
	    RuleChargeActiveService.getAuditedByCode();
	});
	
	$("#BtnRevertVersion").on("click", function(e){
	    var versionToRevert = $(this).attr("data-version");
	    ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
		return RuleChargeActiveService.revertToVersion(versionToRevert,"");
	    });  	    	
	    return;
	});
		
	$('#modalRuleSellTypeVersionList').on('hidden.bs.modal', function (e) {
	    RuleChargeActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalRuleSellTypeVersionList').on('show.bs.modal', function (e) {
		
	    RuleChargeActiveService.getVersionList();
	    
		return;
	});
	
	$('#modalRuleSellTypeVersion').on('show.bs.modal', function (e) {
		
	    $('#modalRuleSellTypeVersionList').modal('hide');
	    
		return;
	});
	$('#modalRuleSellTypeVersion').on('hidden.bs.modal', function (e) {
	    $('#modalRuleSellTypeVersionList').modal('show');
	    $("#RuleVersionTable").DataTable().destroy();
	});
			
	$('#btnBackToEdit').tooltip();
	$('#btnShowVersionList').tooltip();
	RuleChargeActiveService.get();

	ButtonMigration.init("rule-charge");
	
	$("#btnRevisionActiveAudited").on("click", function(){
	    ButtonsRulesAction.showActiveAuditedInfo("rule-charge-active", "modalRuleChargeActiveAudited", "auditedRuleChargeActiveTable",
		    "auditedRuleChargeActiveTableBody", "rowRuleChargeAuditedActiveSheet");
	});

	$("#btnRuleChargeExport").on("click", function () {

		$("#frmRuleChargeExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/rule-charge-active/xls");
		$("#frmRuleChargeExport").submit();

	});
	return;
}

RuleChargeActiveService.reset = function(){
	
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

RuleChargeActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "rule-charge-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = RuleChargeActiveService.handler;
	
	RestConnector.get(settings);
	
	return;
}

RuleChargeActiveService.handler = function(data){
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
            	RuleChargeActiveService.getAuditedByCode($(this).attr("data-code"));
            	
            	return;
            });
            
            return;
        },
        "data": data,
        "columns": [
		        	{
		                "className": 'centered',
		                "orderable": true,
		                "data": "legal_entity_taxpayer_id"
		            },
                    { 	
                    	"className": 'centered',
                    	"orderable": true,
                    	"data": "legal_entity_description"
                    },
        			{ 	
        				"className": 'centered',
        				"orderable": true,
        				"data": "merchant_charge_description" 
        			},
                    { 
                    	"className": 'centered',
                    	"orderable": true,
                    	"data": "date_from"
                    },
                    { 
                    	"className": 'centered',
                    	"orderable": true,
                    	"data": "date_to"
                    },
                    { 
                    	"className": 'centered',
                    	"orderable": true,
                    	"data": "installments"
                    },
                    { 
                    	"className": 'centered highlight',
                    	"orderable": true,
                    	"data": "divide_on_installments_si_no"
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
	
	ReleaseVersionLog.initLastVersion("RULE_CHARGE", " Regla Activa - Cobranza en Cuotas - ", true);
	
	return;
}

RuleChargeActiveService.getVersionList = function () {

	$.ajax({
		type: "GET",
		url: Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=RULE_CHARGE",
		dataType: 'json',
		contentType: "application/json;",
		success: function (data) {
			RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
			$("#VersionListTable").dataTable({
				"drawCallback": function () {
					$('[id^=showVersion_]').on("click", function () {
						RuleChargeActiveService.getAuditedByCode($(this).attr("data-code"));
					});

					if (Environment.isProd()) {
						$('[id^=revertVersion_]').hide();
					} else {
						$('[id^=revertVersion_]').on("click", function () {

							var versionToRevert = $(this).attr("data-code");
							ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert + "? *los datos de edicion seran afectados*", "topCenter", "error", true, function () {
								return RuleChargeActiveService.revertToVersion(versionToRevert, "");
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

RuleChargeActiveService.getAuditedByCode = function(version){
    
    $('#modalRuleChargeActiveAudited').modal('show');
    $('.auditoria').width('80%'); 
    var idParamVersion = "";
    if(version!= undefined){
	idParamVersion="?id="+ version;
    }
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/rule-charge-active"+idParamVersion,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       RuleChargeActiveService.fillOldVersionTable(data, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
    
}

RuleChargeActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#auditedRuleChargeActiveTableBody", "#rowRuleChargeAuditedActiveSheet");
    $("#RuleVersionTable").dataTable();
    if(version!= undefined){
    	RuleChargeActiveService.setInfoHeaderOldVersion(version);
    }
   
    return;
}

RuleChargeActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/RULE_CHARGE/"+ version,
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



RuleChargeActiveService.revertToVersion = function(version, date){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/rule-charge-active/revert?version="+ version + "&date=" + date,
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
		 	$('#modalRuleSellTypeVersionList').modal('hide');
		 	$('#modalRuleSellTypeVersion').modal('hide');
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
