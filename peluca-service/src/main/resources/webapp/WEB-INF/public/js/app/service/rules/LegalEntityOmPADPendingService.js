LegalEntityOmPADPendingService = function(){}

LegalEntityOmPADPendingService.init = function(){
    LegalEntityOmPADPendingService.getLastVersion();
		
    LegalEntityOmPADPendingService.get();
    $("#makeActive").on("click", function(){
	LegalEntityOmPADPendingService.activateRule();
    });
    
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("OM_LEGAL_ENTITY_PAD", "PENDING", true);
	    return;
	});
    
	return;
}

LegalEntityOmPADPendingService.reset = function(){
	
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

LegalEntityOmPADPendingService.get = function(params){
	
	var settings = new Object();
	settings.url = "om-legal-entity-pad-pending";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = LegalEntityOmPADPendingService.handler;
	
	RestConnector.get(settings);
	
	return;
}

LegalEntityOmPADPendingService.activateRule = function(){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/fictional-charge-pending/approve" ,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	     if(data.status == 0){
		 	noty(
			   {
				   text: '<strong> Nueva Regla Activada con exito!! </strong>',
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
		 	
		 	LegalEntityOmPADPendingService.getLastVersion();
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

LegalEntityOmPADPendingService.handler = function(data){

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
            	LegalEntityOmPADPendingService.getAuditedByCode($(this).attr("data-code"));
            	
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
	
   return;
}

LegalEntityOmPADPendingService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/fictional-charge-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPADVersion').modal('show');
	      
	       LegalEntityOmPADPendingService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

LegalEntityOmPADPendingService.getFullAuditedVersion = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/fictional-charge-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       
	       $('#modalLegalEntytyOMPADVersionList').modal('hide');
	       $('#modalFullAuditedVersion').modal('show');
	       
	       $('.ruleOldVersion').width('80%');
	       RestConnector.appendTemplateResults(data, "#RuleFullVersionTableBody", "#rowFullVersionAuditedSheet");
	       $("#RuleFullVersionTable").dataTable();
	       LegalEntityOmPADPendingService.setInfoHeaderOldVersion(version);
	       
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

LegalEntityOmPADPendingService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    LegalEntityOmPADPendingService.setInfoHeaderOldVersion(version);
    
}

LegalEntityOmPADPendingService.setInfoHeaderOldVersion = function(version){
    
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

LegalEntityOmPADPendingService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=OM_LEGAL_ENTITY_PAD",
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
    
    return ReleaseVersionLog.initLastVersion("OM_LEGAL_ENTITY_PAD", "", false);
}
