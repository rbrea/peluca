ButtonMigration = function(){}

ButtonMigration.init = function(urlAction){
	
	$("#btnMigration").on("click", function(){
	    noty({
		text:  '<div class="noty_message"><span class="noty_text">Esta seguro de migrar a producción, esta version? Ingrese fecha de inicio:</span>' +
		'<div id="spNewVersionDate" class="input-append input-group dtpicker">' +
		'<input data-format="dd/MM/yyyy" type="text" class="form-control">' +
		'<span class="input-group-addon add-on">' +
			'<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>' +
		'</span></div>' + 
		'<div class="input-append"><br></div>' + 
		'<div class="input-append"><input id="jiraIdElem" type="text" class="form-control" placeholder="Ingrese Jira" required></div>' + 
		'</div><div class="noty_close"></div>',
		modal:true,
		layout: 'topCenter',
		type: "error",
		callback:{

		    onShow: function() {
			$('#spNewVersionDate').datetimepicker({
			      	pickTime: false,
			      	autoclose: true
			    });
			
			 $('.bootstrap-datetimepicker-widget').css('z-index', 99999999999999);
			 $('#spNewVersionDate').datepicker('setDate', new Date());
		    },
		    afterShow: function() {},
		    onClose: function() {},
		    afterClose: function() {},
		    onCloseClick: function() {},
		    
		},
		animation: {
	        open: 'animated bounceIn', // Animate.css class names
	        close: 'animated flipOutX', // Animate.css class names
	        easing: 'swing', // unavailable - no need
	        speed: 500 // unavailable - no need
		},
		buttons: [
			{addClass: 'btn btn-success sm', text: 'Aceptar', onClick: function($noty) {
			    var versionDate = $("#spNewVersionDate").children('input').val();
			    var jiraIdValue = $("#jiraIdElem").val();
			    if(Commons.isBlank(jiraIdValue)){
			    	noty(
		 			   {
		 				   text: '<strong>El nro de Jira es Obligatorio</strong>',
		 				   layout:'topRight',
		 				   type:'error',
		 				   timeout:5000,
		 				   animation: {
		 				        open: {height: 'toggle'}, // jQuery animate function property object
		 				        close: {height: 'toggle'}, // jQuery animate function property object
		 				        easing: 'swing', // easing
		 				        speed: 500 // opening & closing animation speed
		 				    }
		 			   }
		 			);
			    	return false;
			    }
			    ButtonMigration.doMigration(urlAction, versionDate, jiraIdValue);
			    $noty.close();
			}
			},
			{addClass: 'btn btn-default sm', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
			}
		]
	    });
	    	
	    	
		return;
	});
	
	return;
}

ButtonMigration.doMigration = function(urlAction, versionDate, jiraIdValue){
	
	$.ajax({ 
		type    : "POST",
		url     : Constants.CONTEXT_ROOT + "/app/service/migrate/" + urlAction + "?startDate=" + versionDate + "&jiraIdValue=" + jiraIdValue,
		dataType: 'json',
		contentType: "application/json;",
		success:function(data) {
			if(data != null){
				   
				return;
			} else {
				noty(
					{
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
						   layout:'topRight',
						   type:'alert',
						   timeout:5000
					}
				);
			}
			   
			return;
		},
		error:function(data){
			noty(
			   {
				   text: '<strong>Error, Mensaje: ' + data.responseJSON.cause + '</strong>',
				   layout:'topRight',
				   type:'error',
				   timeout:5000,
				   animation: {
				        open: {height: 'toggle'}, // jQuery animate function property object
				        close: {height: 'toggle'}, // jQuery animate function property object
				        easing: 'swing', // easing
				        speed: 500 // opening & closing animation speed
				    }
			   }
			);

			return;
		}
	});
	
	return;
}