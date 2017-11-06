FictionalChargePendingService = function(){}

FictionalChargePendingService.init = function(){
    FictionalChargePendingService.getLastVersion();
		
    FictionalChargePendingService.get();    
    
    $("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
    $("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("FICTIONAL_CHARGE","PENDING", true);
	    return;
    });
	return;
}

FictionalChargePendingService.reset = function(){
	
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

FictionalChargePendingService.get = function(params){
	
	var settings = new Object();
	settings.url = "fictional-charge-pending";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = FictionalChargePendingService.handler;
	
	RestConnector.get(settings);
	
	return;
}

FictionalChargePendingService.handler = function(data){

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
            $('[id^=showSellTypeAudited_]').on("click", function(){
            	$('.auditoria').width('80%');  
            	FictionalChargePendingService.getAuditedByCode($(this).attr("data-code"));
            	
            	return;
            });
            
            return;
        },
        "data": data,
        "columns": [
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
		            	"className": 'centered',
		            	"orderable": true,
		            	"data": "rule_start_date"
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
	
   return;
}

FictionalChargePendingService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/fictional-charge-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPPVersion').modal('show');
	      
	       FictionalChargePendingService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

FictionalChargePendingService.getFullAuditedVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/fictional-charge-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       
	       $('#modalLegalEntytyOMPPVersionList').modal('hide');
	       $('#modalFullAuditedVersion').modal('show');
	       
	       $('.ruleOldVersion').width('80%'); 
	       console.log(data);
	       RestConnector.appendTemplateResults(data, "#RuleFullVersionTableBody", "#rowFullVersionAuditedSheet");
	       $("#RuleFullVersionTable").dataTable();
	       FictionalChargePendingService.setInfoHeaderOldVersion(version);
	       
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

FictionalChargePendingService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    FictionalChargePendingService.setInfoHeaderOldVersion(version);
    
}

FictionalChargePendingService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/FICTIONAL_CHARGE/"+ version,
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


FictionalChargePendingService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=FICTIONAL_CHARGE",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data != null){
		   var date= "Proximo release: " + data.release_version_date;
		   var usr = "Aprobado por: " + data.user_aproved;
		   $("#headerPageVersion span").text(" Pendiente de Activacion - " + date + " - " + usr);
	       }	       
	   },
	   error:function(data){
	       $("#headerPageVersion span").text("No hay reglas pendientes de activacion");
	   }
	});
    
    return ReleaseVersionLog.initLastVersion("FICTIONAL_CHARGE", "", false);
}
