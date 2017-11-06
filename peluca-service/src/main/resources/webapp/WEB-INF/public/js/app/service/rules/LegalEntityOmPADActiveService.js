LegalEntityOmPADActiveService = function(){}

LegalEntityOmPADActiveService.init = function(){
	
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
	    ButtonsRulesAction.showCommentsRule("OM_LEGAL_ENTITY_PAD", "ACTIVE", true);
	    return;
	});
	
	$("#btnShowVersionList").on("click", function(e){
		e.preventDefault();
		$('#modalLegalEntytyOMPADVersionList').modal('show');		
		return;
	});
	
	$("#BtnRevertVersion").on("click", function(e){
	    var versionToRevert = $(this).attr("data-version");
	    ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
		return LegalEntityOmPADActiveService.revertToVersion(versionToRevert,"");
	    });  
	    return;
	});
		
	BtnRevertVersion

	$('#modalLegalEntytyOMPADVersionList').on('hidden.bs.modal', function (e) {
	    LegalEntityOmPADActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalLegalEntytyOMPADVersionList').on('show.bs.modal', function (e) {
		
	    LegalEntityOmPADActiveService.getVersionList();
	    
		return;
	});
	
	$('#modalLegalEntytyOMPADVersion').on('show.bs.modal', function (e) {
		
	    $('#modalLegalEntytyOMPADVersionList').modal('hide');
	    
		return;
	});
	$('#modalLegalEntytyOMPADVersion').on('hidden.bs.modal', function (e) {
	    $('#modalLegalEntytyOMPADVersionList').modal('show');
	    $("#RuleVersionTable").DataTable().destroy();
	});
			
	$('#btnBackToEdit').tooltip();
	$('#btnShowVersionList').tooltip();
	LegalEntityOmPADActiveService.get();
	ButtonMigration.init("om-legal-entity-pad");
		
	$("#btnOMPADAudited").on("click", function(){
	    ButtonsRulesAction.showActiveAuditedInfo("om-legal-entity-pad-active", "modalOMPADActiveAuditedTable", "auditedOMPADActiveTable", 
		    "auditedOMPADActiveTableBody", "rowOMPADAuditedSheet");
	});

	$("#btnRuleSellPointExport").on("click", function () {

		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pad-active/xls");
		$("#frmRuleSellPointExport").submit();

	});
	return;
}

LegalEntityOmPADActiveService.reset = function(){
	
	$("#spProductType option:selected").removeAttr("selected");
	$("#spProductType").multiselect('refresh');
	$("#spCountrySite option:selected").removeAttr("selected");
	$("#spCountrySite").multiselect('refresh');
	$("#spCountryDestiny option:selected").removeAttr("selected");
	$("#spCountryDestiny").multiselect('refresh');
	$("#spCountryProvider option:selected").removeAttr("selected");
	$('#spCountryProvider').multiselect("refresh");
	$("#spSsn").val("");
	$("#spEnabledDate").children('input').val("");
	$("#spSellType > option:first").prop("selected", true);
	$("#spSellType").multiselect('refresh');
	$("#ruleSellTypeFlag").val("A");
	$("#ruleSellTypeId").val("");
	
	$("#spProductTypeUnique option:selected").removeAttr("selected");
	$("#spProductTypeUnique").multiselect('refresh');
	$("#spCountrySiteUnique option:selected").removeAttr("selected");
	$("#spCountrySiteUnique").multiselect('refresh');
	$("#spCountryDestinyUnique option:selected").removeAttr("selected");
	$("#spCountryDestinyUnique").multiselect('refresh');
	$("#spCountryProviderUnique option:selected").removeAttr("selected");
	$("#spCountryProviderUnique").multiselect('refresh');
	   
	return;
}

LegalEntityOmPADActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "om-legal-entity-pad-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = LegalEntityOmPADActiveService.handler;
	
	RestConnector.get(settings);
	
	return;
}

LegalEntityOmPADActiveService.handler = function(data){
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
            	LegalEntityOmPADActiveService.getAuditedByCode($(this).attr("data-code"));
            	
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
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		var toShow = "[";
            		
            		var list = row.country_destiny_list;
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
	
	ReleaseVersionLog.initLastVersion("OM_LEGAL_ENTITY_PAD", "Entidades Legales OM PAD Activas - ", true);
	
	return;
}

LegalEntityOmPADActiveService.getVersionList = function(){
    
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=OM_LEGAL_ENTITY_PAD",
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
		       RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
		       $("#VersionListTable").dataTable({
			   "drawCallback": function() {       
			       $('[id^=showVersion_]').on("click", function(){
			            	
				   	LegalEntityOmPADActiveService.getAuditedByCode($(this).attr("data-code"));
			            	
			            	return;
			            });

				   if(Environment.isProd()){
					   $('[id^=revertVersion_]').hide();
				   }else {
					   $('[id^=revertVersion_]').on("click", function(){

						   var versionToRevert = $(this).attr("data-code")
						   ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
							   return LegalEntityOmPADActiveService.revertToVersion(versionToRevert,"");
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

LegalEntityOmPADActiveService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/om-legal-entity-pad-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPADVersion').modal('show');
	      
	       LegalEntityOmPADActiveService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

LegalEntityOmPADActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    LegalEntityOmPADActiveService.setInfoHeaderOldVersion(version);
    
}

LegalEntityOmPADActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/OM_LEGAL_ENTITY_PAD/"+ version,
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



LegalEntityOmPADActiveService.revertToVersion = function(version){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pad-active/revert?version="+ version,
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
		 	$('#modalLegalEntytyOMPADVersionList').modal('hide');
		 	$('#modalLegalEntytyOMPADVersion').modal('hide');
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
