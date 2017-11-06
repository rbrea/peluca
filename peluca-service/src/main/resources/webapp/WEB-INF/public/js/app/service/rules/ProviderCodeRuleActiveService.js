ProviderCodeRuleActiveService = function(){}

ProviderCodeRuleActiveService.init = function(){
	
	$("#btnShowVersionList").on("click", function(e){
		e.preventDefault();
		$('#modalRuleSellTypeVersionList').modal('show');		
		return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("PROVIDER_CODE", "ACTIVE", true);
	    return;
	});
	
	$("#BtnRevertVersion").on("click", function(e){
	    var versionToRevert = $(this).attr("data-version");
	    ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
		return ProviderCodeRuleActiveService.revertToVersion(versionToRevert,"");
	    });  
	    return;
	});
		
	$('#modalRuleSellTypeVersionList').on('hidden.bs.modal', function (e) {
	    ProviderCodeRuleActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalRuleSellTypeVersionList').on('show.bs.modal', function (e) {
		
	    ProviderCodeRuleActiveService.getVersionList();
	    
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
	ProviderCodeRuleActiveService.get();
	
	$('#btnRevisionActiveAudited').on("click", function(){
	    ButtonsRulesAction.showActiveAuditedInfo("provider-code-active", 
		    "modalActiveSellTypeAudited", "auditedActiveSellTypeTable","auditedActiveSellTypeTableBody","rowSellTypeActiveAuditedSheet");
	});

	$("#btnRuleSellPointExport").on("click", function(){

		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/provider-code-active/xls");
		$("#frmRuleSellPointExport").submit();

	});
	
	return;
}

ProviderCodeRuleActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "provider-code-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = ProviderCodeRuleActiveService.handler;
	
	RestConnector.get(settings);
	
	return;
}

ProviderCodeRuleActiveService.handler = function(data){
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
		"order": [[ 1, "asc" ]],
		responsive: false,
		"createdRow": function ( row, data, index ) {
			$(row).attr("id", "rowid_" + data.id);
    		$(row).data('rowid', data.id);
    		
    		return;
        },
        "drawCallback": function() {
            $('[id^=showSellTypeAudited_]').on("click", function(){
            	$('.auditoria').width('80%');  
            	ProviderCodeRuleActiveService.getAuditedByCode($(this).attr("data-code"));
            	
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
	
	ButtonMigration.init("provider-code");
	
	ReleaseVersionLog.initLastVersion("PROVIDER_CODE", " Regla Activa - Codigo Proveedores - ", true);
	
	return;
}

ProviderCodeRuleActiveService.getVersionList = function(){
    
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=PROVIDER_CODE",
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
		       RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
		       $("#VersionListTable").dataTable({
			   "drawCallback": function() {       
			       $('[id^=showVersion_]').on("click", function(){
			            	
				   	ProviderCodeRuleActiveService.getAuditedByCode($(this).attr("data-code"));
			            	
			            	return;
			            });

				   if(Environment.isProd()){
					   $('[id^=revertVersion_]').hide();
				   }else {
					   $('[id^=revertVersion_]').on("click", function(){

						   var versionToRevert = $(this).attr("data-code")
						   ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
							   return ProviderCodeRuleActiveService.revertToVersion(versionToRevert,"");
						   });
						   return;

					   });
				   }
			       PermissionService.doJobWithRoleables();
			        }
		       });
		       
		   },
		   error:function(data){
		       console.log(data);
		   }
		});
}

ProviderCodeRuleActiveService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/provider-code-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalRuleSellTypeVersion').modal('show');
	      
	       ProviderCodeRuleActiveService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
    
}

ProviderCodeRuleActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    ProviderCodeRuleActiveService.setInfoHeaderOldVersion(version);
    
}

ProviderCodeRuleActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/PROVIDER_CODE/"+ version,
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



ProviderCodeRuleActiveService.revertToVersion = function(version, date){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/provider-code-active/revert?version="+ version + "&date=" + date,
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
