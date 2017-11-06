ProviderCodePendingService = function(){}

ProviderCodePendingService.init = function(){

    ProviderCodePendingService.getLastVersion();
		
    ProviderCodePendingService.get();
    $("#makeActive").on("click", function(){
	ProviderCodePendingService.activateRule();
    });
    
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("PROVIDER_CODE", "PENDING", true);
	    return;
	});
    
	return;
}

ProviderCodePendingService.get = function(params){
	var settings = new Object();
	settings.url = "provider-code-pending";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = ProviderCodePendingService.handler;
	
	RestConnector.get(settings);
	
	return;
}

ProviderCodePendingService.activateRule = function(){
    
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
		 	
//		 	ProviderCodePendingService.getLastVersion();
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

ProviderCodePendingService.handler = function(data){

	var table = $("#tSpResult").dataTable( {
		"fnInitComplete": function(){
			$('#tSpResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(3)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		"order": [[ 1, "asc" ]],
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
            	ProviderCodePendingService.getAuditedByCode($(this).attr("data-code"));
            	
            	return;
            });
            
            return;
        },
        "iDisplayLength": 50,
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
	
   return;
}

ProviderCodePendingService.getAuditedByCode = function(version){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/provider-code-active?id="+ version,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       var result = $.grep( data, function( n, i ) {
		   return n.rev_type == "ADD";
		 });
	       $('#modalLegalEntytyOMPPVersion').modal('show');
	      
	       ProviderCodePendingService.fillOldVersionTable(result, version);
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

ProviderCodePendingService.fillOldVersionTable = function(data, version){
    $('.ruleOldVersion').width('80%'); 
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    ProviderCodePendingService.setInfoHeaderOldVersion(version);
    
}

ProviderCodePendingService.setInfoHeaderOldVersion = function(version){
    
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



ProviderCodePendingService.revertToVersion = function(version){
    
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/fictional-charge-active/revert?version="+ version,
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

ProviderCodePendingService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=PROVIDER_CODE",
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
    
    
    return ReleaseVersionLog.initLastVersion("PROVIDER_CODE", "", false);
}
