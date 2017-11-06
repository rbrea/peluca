POLegalEntityActiveService = function(){}

POLegalEntityActiveService.init = function(){
	
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
	    ButtonsRulesAction.showCommentsRule("PO_LEGAL_ENTITY", "ACTIVE", true);
	    return;
	});
	
	$("#btnShowVersionList").on("click", function(e){
		e.preventDefault();
		$('#modalLegalEntityPOVersionList').modal('show');		
		return;
	});
	
	$("#BtnRevertVersion").on("click", function(e){
	    var versionToRevert = $(this).attr("data-version");
	    ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
		return POLegalEntityActiveService.revertToVersion(versionToRevert,"");
	    });  
	    return;
	});
		
	$('#modalLegalEntityPOVersionList').on('hidden.bs.modal', function (e) {
	    POLegalEntityActiveService.get();
	    $("#VersionListTable").DataTable().destroy();
		return;
	});
	
	$('#modalLegalEntityPOVersionList').on('show.bs.modal', function (e) {
		
	    POLegalEntityActiveService.getVersionList();
	    
		return;
	});
	
	$('#modalLegalEntityPOVersion').on('show.bs.modal', function (e) {
		
	    $('#modalLegalEntityPOVersionList').modal('hide');
	    
		return;
	});
	$('#modalLegalEntityPOVersion').on('hidden.bs.modal', function (e) {
	    $('#modalLegalEntityPOVersionList').modal('show');
	    $("#RuleVersionTable").DataTable().destroy();
	});
			
	$('#btnBackToEdit').tooltip();
	$('#btnShowVersionList').tooltip();
	$("#btnRuleSellPointExport").tooltip();
	$("#btnMakeComment").tooltip();
	$("#btnAudited").tooltip();
	$("#btnMigration").tooltip();
	$("#btnBackToPending").tooltip();
	POLegalEntityActiveService.get();
	ButtonMigration.init("po-legal-entity");
		
	$("#btnAudited").on("click", function(){
	    ButtonsRulesAction.showActiveAuditedInfo("po-legal-entity-active", "modalActiveAuditedTable", "auditedActiveTable",
		    "auditedActiveTableBody", "rowAuditedSheet");
	});

	$("#btnRuleSellPointExport").on("click", function () {

		$("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/po-legal-entity-active/xls");
		$("#frmRuleSellPointExport").submit();

	});
	return;
}

POLegalEntityActiveService.reset = function(){
	
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

POLegalEntityActiveService.get = function(params){
	
	var settings = new Object();
	settings.url = "po-legal-entity-active";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = POLegalEntityActiveService.handler;
	
	RestConnector.get(settings);
	
	return;
}

POLegalEntityActiveService.handler = function(data){
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
            	POLegalEntityActiveService.getAuditedByCode($(this).attr("data-code"));
            	
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

					var list = row.country_destiny_list;

					var toShow = "";

					if (list != null && list != "") {
						toShow += "[";
						toShow += list.join();
						toShow += "]";
					} else {
						toShow += "-";
					}

					return "<b>" + toShow + "</b>";
				}
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "sell_type_description"
            },
			{
				"className": 'centered',
				"orderable": true,
				"data": "model_description"
			},
			{
				"className": 'centered',
				"orderable": true,
				"render": function (data, type, row) {

					var vcc = row.virtual_credit_card_description;

					if (vcc != null && vcc != "") {
						return vcc;
					} else {
						return "-";
					}
				}
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
	
	ReleaseVersionLog.initLastVersion("PO_LEGAL_ENTITY", "Entidades Legales PO Activas - ", true);
	
	return;
}

POLegalEntityActiveService.getVersionList = function(){
    
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log?type=PO_LEGAL_ENTITY",
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
		       RestConnector.appendTemplateResults(data, "#VersionListTableBody", "#rowSellTypeVersionSheet");
		       $("#VersionListTable").dataTable({
			   "drawCallback": function() {       
			       $('[id^=showVersion_]').on("click", function(){
			            	
				   	POLegalEntityActiveService.getAuditedByCode($(this).attr("data-code"));
			            	
			            	return;
			            });

				   if(Environment.isProd()){
					   $('[id^=revertVersion_]').hide();
				   }else {
					   $('[id^=revertVersion_]').on("click", function(){

						   var versionToRevert = $(this).attr("data-code")
						   ButtonsRulesAction.showNoty("Esta seguro que desea recuperar la version N° " + versionToRevert+ "? *los datos de edicion seran afectados*", "topCenter","error", true,function(){
							   return POLegalEntityActiveService.revertToVersion(versionToRevert,"");
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

POLegalEntityActiveService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/po-legal-entity-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntityPOVersion').modal('show');
	      
	       POLegalEntityActiveService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

POLegalEntityActiveService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    POLegalEntityActiveService.setInfoHeaderOldVersion(version);
    
}

POLegalEntityActiveService.setInfoHeaderOldVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/PO_LEGAL_ENTITY/"+ version,
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



POLegalEntityActiveService.revertToVersion = function(version){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/po-legal-entity-active/revert?version="+ version,
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
		 	$('#modalLegalEntityPOVersionList').modal('hide');
		 	$('#modalLegalEntityPOVersion').modal('hide');
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
