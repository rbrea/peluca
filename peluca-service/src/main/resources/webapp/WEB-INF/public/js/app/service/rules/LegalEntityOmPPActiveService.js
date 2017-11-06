LegalEntityOmPPActiveService = function(){}

LegalEntityOmPPActiveService.init = function(){
	
	$("#btnSpReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		$('#filterSpCountrySite').multiselect("refresh");
		$('#filterSpCountryProvider').multiselect("refresh");
		
		return;
	});
	
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("OM_LEGAL_ENTITY_PP", "ACTIVE", true);
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
		return LegalEntityOmPPActiveService.revertToVersion(versionToRevert,"");
	    });  
	    return;
	});
		
	BtnRevertVersion

	$('#modalLegalEntytyOMPPVersionList').on('hidden.bs.modal', function (e) {
	    LegalEntityOmPPActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalLegalEntytyOMPPVersionList').on('show.bs.modal', function (e) {
		
	    LegalEntityOmPPActiveService.getVersionList();
	    
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
	LegalEntityOmPPActiveService.get();
	ButtonMigration.init("om-legal-entity-pp");
	
	$("#btnOMPPActiveRevisionAudited").on("click", function(){
	    
	    ButtonsRulesAction.showActiveAuditedInfo("om-legal-entity-pp-active", "modalOMPPActiveAudited", "auditedOMPPActiveTable",
		    "auditedOMPPActiveTableBody", "rowOMPPActiveAuditedSheet");
	    
	});

	$("#btnRuleSellPointExport").on("click",function() {
		$('#btnSubscritNotification').tooltip();
		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pp-active/xls");
		$("#frmRuleSellPointExport").submit();

		});
	
};

LegalEntityOmPPActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "om-legal-entity-pp-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = LegalEntityOmPPActiveService.handler;
	
	RestConnector.get(settings);
	
};

LegalEntityOmPPActiveService.handler = function(data){
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
            	LegalEntityOmPPActiveService.getAuditedByCode($(this).attr("data-code"));
            	
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
            	"orderable": true,
            	"data": "country_code_site"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "afiliated_description"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "sell_type_description"
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
	
	ReleaseVersionLog.initLastVersion("OM_LEGAL_ENTITY_PP", "Entidades Legales OM PP Activas - ", true);
	
	return;
}

LegalEntityOmPPActiveService.getVersionList = function () {

	$.ajax({
		type: "GET",
		url: Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=OM_LEGAL_ENTITY_PP",
		dataType: 'json',
		contentType: "application/json;",
		success: function (data) {
			RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
			$("#VersionListTable").dataTable({
				"drawCallback": function () {
					$('[id^=showVersion_]').on("click", function () {

						LegalEntityOmPPActiveService.getAuditedByCode($(this).attr("data-code"));

					});

					if(Environment.isProd()){
						$('[id^=revertVersion_]').hide();
					}else{
						$('[id^=revertVersion_]').on("click", function () {

							var versionToRevert = $(this).attr("data-code");
							ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert + "? *los datos de edicion seran afectados*", "topCenter", "error", true, function () {
								return LegalEntityOmPPActiveService.revertToVersion(versionToRevert, "");
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

LegalEntityOmPPActiveService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/om-legal-entity-pp-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPPVersion').modal('show');
	      
	       LegalEntityOmPPActiveService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

LegalEntityOmPPActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    LegalEntityOmPPActiveService.setInfoHeaderOldVersion(version);
    
}

LegalEntityOmPPActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/OM_LEGAL_ENTITY_PP/"+ version,
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



LegalEntityOmPPActiveService.revertToVersion = function(version){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pp-active/revert?version="+ version,
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
