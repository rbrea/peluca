MonitorClusterService = function(){}

MonitorClusterService.init = function(nodeName){
	
	MonitorClusterService.getNodes();
	MonitorClusterService.getCacheElements(null);
	
	$("#btnSearchCacheNames").click(function(){
		MonitorClusterService.getCacheElements($("#filterCacheName").val());
		
		return;
	});
	
	return;
}

MonitorClusterService.getNodes = function(){

	var urlQueryString = "";
	
	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/api/cluster-monitor" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null){
			   
			   var table = $("#tNodesResult").dataTable( {
					"fnInitComplete": function(){
						$('#tNodesResult tbody tr').each(function(){
							return;
						});
						
						return;
					},
					"bDestroy" : true,
					responsive: false,
					"createdRow": function ( row, data, index ) {
			    		return;
			        },
			        "iDisplayLength" : "25",
			        "data": data,
			        "drawCallback": function() {
			        	return;
			        },
			        "columns": [
						{ 	
							"className": 'centered',
							"orderable": true,
							"data": "name" 
						},
						{ 	
			            	"className": 'centered',
			            	"orderable": true,
			            	"data": "last_start"
			            },
						{ 	
			            	"className": 'centered',
			            	"orderable": false,
			            	"render": function (data, type, row) {
			                	return 	"<span id='updateNode_" + row.id + "'><a id='aValue_" + row.id + "' href='javascript:void(0);' onclick='javascript:MonitorClusterService.updateNode();' title='Mostrar nodo'><i class='glyphicon glyphicon-play-circle'></i></a></span>&nbsp;";
			    			}
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
			   
		   }else{
			   noty(
					   {
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
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
		   
		   return;
	   },
	   error:function(data){
		   noty(
				   {
					   text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
					   layout:'topRight',
					   type:'error',
					   timeout:10000,
					   animation: {
					        open: 'animated bounceInDown', // Animate.css class names
					        close: 'animated bounceOutUp', // Animate.css class names
					        easing: 'swing', // unavailable - no need
					        speed: 500 // unavailable - no need
					   }
				   }
		   );

		   return;
	   }
	});
	
	return;
}

MonitorClusterService.getCacheElements = function(cacheName){

	var urlQueryString = "";
	if(cacheName != null && cacheName != undefined && cacheName != ""){
		urlQueryString += "?cache_name=" + cacheName;
	}
	
	$.ajax({ 
	   type    : "GET",
	   //url     : /*Constants.CONTEXT_ROOT + */"http://" + nodeName + ":9290" + Constants.CONTEXT_ROOT + "/app/internal/api/cluster-cache-element" + urlQueryString,
	   url: Constants.CONTEXT_ROOT + "/app/internal/api/cluster-cache-element" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null){
			   
			   var table = $("#tSearchResult").dataTable( {
					"fnInitComplete": function(){
						$('#tSearchResult tbody tr').each(function(){
							return;
						});
						
						return;
					},
					"bDestroy" : true,
					responsive: false,
					"createdRow": function ( row, data, index ) {
						$(row).attr("id", data.id);

						return;
			        },
			        "iDisplayLength" : "100",
			        "data": data,
			        "drawCallback": function() {
			        	return;
			        },
			        "columns": [
						{ 	
							"className": 'centered',
							"orderable": true,
							"data": "cache_name" 
						},
						{ 	
			            	"className": 'centered',
			            	"orderable": true,
			            	"data": "key"
			            },
			            { 	
							"className": 'centered',
							"orderable": true,
							"data": "update_date" 
						},
						{ 	
			            	"className": 'centered',
			            	"orderable": true,
			            	"render": function (data, type, row) {
			                	return 	"<span id='showValue_" + row.key + "'><a id='aValue_" + row.key + "' href='javascript:void(0);' onclick='javascript:MonitorClusterService.showValue(\"" + row.key + "\", " + row.value + ");' title='Mostrar Valor'><i class='glyphicon glyphicon-search'></i></a></span>";
			    			}
			            },
			            { 	
			            	"className": 'centered',
			            	"orderable": true,
			            	"data": "cache_type"
			            },
			            { 	
							"className": 'centered',
							"orderable": false,
							"render": function (data, type, row) {
							
								var icon = "glyphicon glyphicon-ok-circle";
								
								if(row.different == true){
									icon = "glyphicon glyphicon-ban-circle";
								} else if(row.different == null){
									icon = "glyphicon glyphicon-question-sign";
								}
								
			                	return 	"<span id='showDifferent_" + row.id + "'><i class='" + icon + "'></i></span>&nbsp;<span id='showRemove_" + row.id + "'>" + 
			                	"<a id='rValue_" + row.id + "' href='javascript:void(0);' onclick='javascript:MonitorClusterService.removeValue(\"" + row.cache_name + "\");'><i class='glyphicon glyphicon-trash'></i></a>" +
			                	"</span>";
			    			} 
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
			   
			   return;
		   }else{
			   noty(
					   {
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
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
		   
		   return;
	   },
	   error:function(data){
		   noty(
				   {
					   text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
					   layout:'topRight',
					   type:'error',
					   timeout:10000,
					   animation: {
					        open: 'animated bounceInDown', // Animate.css class names
					        close: 'animated bounceOutUp', // Animate.css class names
					        easing: 'swing', // unavailable - no need
					        speed: 500 // unavailable - no need
					   }
				   }
		   );

		   return;
	   }
	});
	
	return;
}

MonitorClusterService.showValue = function(key, value){
	
	BootstrapDialog.show({
		onshown: function(){
			
			return;
		},
		onhidden:function(){
			
			return;
		},
		draggable: true,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: "Valor del cache",
		autodestroy: true,
		closable: true,
		cssClass: 'dialog-large dialog-flow-detail',
        message: function(dialog) {
        	
        	var input = JSON.stringify(value, null, 2);
        				        	
        	input = Commons.syntaxHighlight(input);
        
	        var divContainer = '<div class="row"><div class="col-md-12"><div class="panel panel-default">' +
	        	'<div class="panel-heading">Valor de key: \"' + "" +'\" &nbsp;-&nbsp;<a href="javascript:void(0);" onclick="javascript:Commons.selectAllText(\'txtInputContainer_' + key + '\');">seleccionar todo ...</a></div><div class="panel-body">' +
	        		'<pre id="txtInputContainer_' + key + '" style="min-height: 230px;max-height: 70%;background-color: white; overflow-x: scroll;overflow-y: scroll;">' +
	        						input +
		                        '</pre></div></div></div>' + 
		            '</div></div></div>';
        
        	return divContainer;
        },
        buttons: [
            {
	        	id: 'btnDetailClose',
	        	label: 'Cerrar',
	        	icon: 'glyphicon glyphicon-ok-sign',
	        	cssClass: 'btn-primary',
	        	action: function(dialog){
	        		var btn = this;
	        		
	        		dialog.close();
					
	        		return;
	        	}
            }
        ]
    });
	
	return;
}

MonitorClusterService.removeValue = function(cacheName){
	
	$.ajax({ 
		   type    : "DELETE",
		   url     : Constants.CONTEXT_ROOT + "/app/api/cluster-monitor/" + cacheName,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data == null){
				   noty(
						   {
							   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
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
			   } else {
				   MonitorClusterService.getCacheElements("");				   
			   }
			   
			   return;
		   },
		   error:function(data){
			   noty(
					   {
						   text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
						   layout:'topRight',
						   type:'error',
						   timeout:10000,
						   animation: {
						        open: 'animated bounceInDown', // Animate.css class names
						        close: 'animated bounceOutUp', // Animate.css class names
						        easing: 'swing', // unavailable - no need
						        speed: 500 // unavailable - no need
						   }
					   }
			   );

			   return;
		   }
		});
	
	return;
}
