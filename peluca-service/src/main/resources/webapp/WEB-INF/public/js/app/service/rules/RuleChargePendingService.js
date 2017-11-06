RuleChargePendingService = function(){}

RuleChargePendingService.init = function(){
    RuleChargePendingService.getLastVersion();
    
    $("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("RULE_CHARGE","PENDING", true);
	    return;
	});
    RuleChargePendingService.get();    
	return;
}

RuleChargePendingService.get = function(params){
	
	var settings = new Object();
	settings.url = "rule-charge-pending";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = RuleChargePendingService.handler;
	
	RestConnector.get(settings);
	
	return;
}

RuleChargePendingService.handler = function(data){

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
            	RuleChargePendingService.getAuditedByCode($(this).attr("data-code"));
            	
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
	
   return;
}


RuleChargePendingService.getAuditedByCode = function(version){
    
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
	      
	       RuleChargePendingService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

RuleChargePendingService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    RuleChargePendingService.setInfoHeaderOldVersion(version);
    
}

RuleChargePendingService.setInfoHeaderOldVersion = function(version){
    
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

RuleChargePendingService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=RULE_CHARGE",
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
	       $("#headerPageVersion span").text(" No hay reglas pendientes de activacion");
	   }
	});
    
    return ReleaseVersionLog.initLastVersion("RULE_CHARGE", "", false);
}
