PaymentRefundPendingService = function(){}

PaymentRefundPendingService.init = function(){
    PaymentRefundPendingService.getLastVersion();
		
    PaymentRefundPendingService.get();
    
	$("#btnMakeComment").on("click", function(){
	    $("#modalCommentRule").modal('show');
	});
	
	$("#modalCommentRule").on('show.bs.modal', function (e) {
	    ButtonsRulesAction.showCommentsRule("PAYMENT_REFUND", "PENDING", true);
	    return;
	});
	
	return;
}

PaymentRefundPendingService.get = function(params){
	
	var settings = new Object();
	settings.url = "payment-refund-pending";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = PaymentRefundPendingService.handler;
	
	RestConnector.get(settings);
	
	return;
}

PaymentRefundPendingService.handler = function(data){

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
            	PaymentRefundPendingService.getAuditedByCode($(this).attr("data-code"));
            	
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
	
   return;
}

PaymentRefundPendingService.getLastVersion = function(){
    
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=PAYMENT_REFUND",
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
    
    return ReleaseVersionLog.initLastVersion("PAYMENT_REFUND", "", false);
}
