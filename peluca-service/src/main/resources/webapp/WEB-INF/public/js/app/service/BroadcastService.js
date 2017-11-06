BroadcastService = function(){}

BroadcastService.init = function(){
	
	$('#modalAddBroadcast').on('hidden.bs.modal', function (e) {
		
		BroadcastService.reset();
		
		return;
	});
	
	$('#modalAddBroadcast').on('show.bs.modal', function (e) {
		
		$("#broadcastType").focus();
		
		return;
	});
	
	$("#btnAddBroadcastSave").on("click", function(){
		
		BroadcastService.add();
		
		return;
	});
	
	$("#subscriberSelectAll").on("click", function(){
		
		var isChecked = $(this).prop("checked");
		
		$("input[type='checkbox'][id*='selectedRow_']").each(function(){
			
			$(this).prop("checked", isChecked);
			
			return;
		});
		
		return;
	});
	
	$("#btnBroadcastRemoveAll").on("click", function(){
		
		var list = [];
		
		$("input[type='checkbox'][id*='selectedRow_']:checked").each(function(){

			var appName = $(this).parent().parent().data("rowid");
			
			list.push(appName);
			
			return;
		});
		if(list.length > 0 ){
			BroadcastService.remove(list);
		} else {
			noty(
			   {
				   text: '<strong>No ha seleccionado ningún elemento para borrar.</strong>',
				   layout:'topRight',
				   type:'warning',
				   timeout:5000,
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
	});
	
	$("#btnBroadcastAdd").on('click', function(){
		
		$("#modalAddBroadcast").modal('show');
		
		return;
	});
	
	
	BroadcastService.get(BroadcastService.handler);
	
	return;
}

BroadcastService.get = function(handler){
	
	var urlQueryString = "";
	
	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/broadcast/app" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null){
			   
			   if(handler != null 
					   && handler != undefined 
					   && handler != ""){
				   handler(data);
			   }
			   
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

BroadcastService.handler = function(data){

	var table = $("#tBroadcastResult").dataTable( {
	   //"iDisplayLength": 25,
		
		//"fnRowCallback": function(nRow, aData, iDisplayIndex){
		//	$('td', nRow).attr('nowrap', 'nowrap');
			
		//	return nRow;
		//},
		"fnInitComplete": function(){
			$('#tBroadcastResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(3)').attr('nowrap', 'nowrap');
				
				return;
			});
			
			return;
		},
		//"bAutoWidth": false,
		"bDestroy" : true,
		responsive: false,
		"createdRow": function ( row, data, index ) {
			$(row).attr("id", "rowid_" + data.id);
    		$(row).data('rowid', data.id);
    		
    		return;
        },
        "data": data,
        "columns": [
			{ 	
				"className": 'centered',
				"orderable": false,
				"render": function (data, type, row) {
            		
					return "<input type='checkbox' id='selectedRow_" + row.id + "' value='X'>";
			    }
			},
			{ 	
            	"className": 'centered',
            	"orderable": true,
            	"data": "subscriber_type"
            },
			{ 	
				"className": '',
				"orderable": true,
				"data": "app_name" 
			},
            { 
            	"className": '',
            	"orderable": true,
            	"data": "callback_url"
            },
            { 
            	"className": 'centered',
            	"orderable": true,
            	"data": "creation_date"
            },
            { 	
            	"className": 'centered',
            	"orderable": false,
            	"render": function (data, type, row) {
            		
            		return "<span><a id='rowRemoveBtn_" + row.id + "' href='javascript:void(0);' onclick='javascript:BroadcastService.removeOnly(" + row.id + ");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a>" 
        			+ "</span>";
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
}

BroadcastService.reset = function(){
	
	$("#broadcastAppName").val("");
	$("#broadcastUrl").val("");
	$("#broadcastType > option:first").prop("selected", true);
	
	return;
}

BroadcastService.add = function(){
	var validator = $("#frmAddBroadcast").validate();
	validator.element("#broadcastType");
	validator.element("#broadcastAppName");
	validator.element("#broadcastUrl");

	if(!validator.valid()){
		return false;
	}
	
	var $type = "POST";
	
	var obj = new Object();
	obj.appName = $("#broadcastAppName").val();
	obj.subscriberType = $("#broadcastType").val();
	obj.callbackUrl = $("#broadcastUrl").val();
	
	var $data = Commons.toJsonSnakeCase(obj);
	
	$.ajax({ 
	   type    : $type,
	   url     : Constants.CONTEXT_ROOT + "/app/service/broadcast/register",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   
		   if(data != null && data.status == 0){
			   
			   BroadcastService.reset();
			   $("#modalAddBroadcast").modal("hide");
			   
			   var table = $('#tBroadcastResult').DataTable();
			   table.clear().draw();
			   BroadcastService.get(BroadcastService.handler);
			   
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
					   text: '<strong>Error al intentar dar de Alta. Mensaje: ' + data.responseJSON.cause + '</strong>',
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

BroadcastService.removeOnly = function(id){
	
	var idList = [];
	idList.push(id);	
		
	return BroadcastService.remove(idList);
}

BroadcastService.remove = function(idList){
	
	return CommonsService.remove(
			idList, 
			Constants.CONTEXT_ROOT + "/app/service/broadcast/register",
			"tBroadcastResult",
			"subscriberSelectAll");
}
