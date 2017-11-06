LegalEntityService = function(){}

LegalEntityService.get = function(handler){
	
	var code = $("#filterLeCode").val();
	var description = $("#filterLeDescription").val();
	var taxpayerId = $("#filterLeTaxpayerId").val();
	var operational = $("#filterLeOperational").val();
	var operationalTrx = $("#filterLeOperationalTrx").val();
	var enabled = $("#filterLeEnabled").val();
	var countryCode = $("#filterLeCountry").val();
	var taxpayerIdFormatted = $("#filterLeTaxpayerIdFormatted").val();
	var startDate = $("#filterLeDateFrom99").children('input').val();
	
	var urlQueryString = "";
	
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "code", code);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "description", description);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "taxpayerId", taxpayerId);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "operational", operational);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "enabled", enabled);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "countryCode", countryCode);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "taxpayerIdFormatted", taxpayerIdFormatted);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "startDate", startDate);
	urlQueryString = Commons.buildUrlQueryString(urlQueryString, "operationalTrx", operationalTrx);
	
	$.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/legalEntity" + urlQueryString,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       	   (data.length);
		   if(data != null){
		       	if (data.length > 0){
				$('#btnLeExport').prop('disabled', false);
			    } else{
				$('#btnLeExport').prop('disabled', true);
			    }
		       
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
		   if(data.status != 200){
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
		   }

		   return;
	   }
	});
}

LegalEntityService.handler = function(data){

	var table = $("#tLegalEntityResult").dataTable( {
		"fnInitComplete": function(){
			$('#tLegalEntityResult tbody tr').each(function(){
				$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(4)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(8)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(9)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(10)').attr('nowrap', 'nowrap');
				$(this).find('td:eq(11)').attr('nowrap', 'nowrap');
				return;
			});
			
			return;
		},
		//"bAutoWidth": false,
		"bDestroy" : true,
		responsive: false,
		"createdRow": function ( row, data, index ) {
    		$(row).attr("id", "leRow_" + data.id);
    		$(row).data('legalentityid', data.id);
    		
    		$('td', row).eq(1).data("columnname", "code");
    		$('td', row).eq(2).data("columnname", "description");
    		$('td', row).eq(4).data("columnname", "taxpayerid");
    		$('td', row).eq(5).data("columnname", "operational");
    		$('td', row).eq(6).data("columnname", "operationalTrx");
    		$('td', row).eq(7).data("columnname", "enabled");
    		$('td', row).eq(10).data("columnname", "taxpayeridformatted");
    		$('td', row).eq(11).data("columnname", "startDate");
    		return;
        },
        "iDisplayLength" : "25",
        "data": data,
        "drawCallback": function() {
            $('[id^=showAudited_]').on("click", function(){
	    	  $('.auditoria').width('80%');  
	    	LegalEntityService.getAduitedByCode($(this).attr("data-code"));
            });  
            LoginService.getUserData();
        },
        "columns": [
            {
            	"className": 'centered',
				"orderable": false,
            	"render": function ( data, type, row ) {
			        
			        return "<input type='checkbox' id='selectedRow_" + row.id + "' value='X'>";
			    } 
            },
			{ 	
				"className": 'centered',
				"orderable": true,
				"data": "code" 
			},
			{ 	
            	"className": 'editable-field',
            	"orderable": false,
            	"data": "description"
            },
            { 
            	"className": 'centered editable-field-select',
            	"orderable": true,
            	"data": "country_code"
            },
            { 
            	"className": 'centered editable-field',
            	"orderable": true,
            	"data": "taxpayer_id"
            },
            { 
            	"className": 'centered editable-b-select',
            	"orderable": false,
            	"data": "operational_si_no" // FIXME: [roher] HACK: si no, no funciona el fnUpdate de DataTables
            },
            { 
            	"className": 'centered editable-b-select',
            	"orderable": false,
            	"data": "operational_trx_si_no" // FIXME: [roher] HACK: si no, no funciona el fnUpdate de DataTables
            },
            { 
            	"className": 'centered editable-b-select',
            	"orderable": false,
            	"data": "enabled_si_no" // FIXME: [roher] HACK: si no, no funciona el fnUpdate de DataTables
            },
            { 
            	"className": 'centered',
            	"orderable": false,
            	"data": "creation_date"
            },
            { 
            	"className": 'centered',
            	"orderable": false,
            	"data": "updated_date"
            },
            { 
            	"className": 'centered centered editable-field',
            	"orderable": false,
            	"data": "taxpayer_id_formatted"
            },
            { 
            	"className": 'centered centered editable-field',
            	"orderable": false,
            	"data": "start_date"
            },
            { 	
            	"className": 'centered',
            	"orderable": false,
            	"render": function (data, type, row) {
            	
            	return 	"<span id='showAudited_" + row.code + "' data-code=" + row.code+ ">" +
			"<a class='roleable ESCRITURA' href='javascript:void(0);' title='Auditoria'>" +
			"<i class='glyphicon glyphicon-eye-open'></i></a></span> &nbsp;" +  
			"<span id='showList_" + row.id + "'>" +
            		"<a class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:LegalEntityService.removeOnly(" + row.id + ");' title='Remover fila'>" +
            		"<i class='glyphicon glyphicon-trash'></i></a></span>";
            		
            	/*return "<span id='showList_" + row.id + "'><a id='leLegalEntityBtn_" + row.id + "' href='javascript:void(0);' onclick='javascript:LegalEntityService.update(" + row.id + ");' title='Actualizar fila'><i class='glyphicon glyphicon-cog'></i></a>"
            			"&nbsp;*/;
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
	
	var valueTmp = "";
	
	table.$('td.editable-field-select').editable(Constants.CONTEXT_ROOT + "/app/service/legalEntity", {
		"method": "PUT", 
		"loadurl" : Constants.CONTEXT_ROOT + "/app/service/countries/values",
		//data   : " {'AR':'Argentina','BR':'Brasil','CO':'Colombia', 'MX':'México','UY':'Uruguay','selected':'AR'}",
	     type   : 'select',
	     submit : 'OK',
//	     cssclass : 'form-control',
		"ajaxoptions": {
			"dataType": 'json',
			"contentType": "application/json;",
			"type": "PUT"
		},
		placeholder: "-", 
        "callback": function( sValue, y ) {
        	
        	var aPos = table.fnGetPosition( this );
        	var v = valueTmp;
        	if(sValue.status == 0){
        		v = sValue.value;
                noty(
    				   {
    					   text: '<strong>La entidad legal se ha actualizado correctamente!</strong>',
    					   layout:'topRight',
    					   type:'success',
    					   timeout:5000,
    					   animation: {
    					        open: 'animated bounceInDown', // Animate.css class names
    					        close: 'animated bounceOutUp', // Animate.css class names
    					        easing: 'swing', // unavailable - no need
    					        speed: 500 // unavailable - no need
    					   }
    				   }
    		   );	
        	} else {
        		noty(
 					   {
 						   text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
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
        	}
            table.fnUpdate(v, aPos[0], aPos[1] );

            return;
        },
        "submitdata": function ( value, settings ) {
        	
        	valueTmp = value;
        	
        	var rowId = this.parentNode.getAttribute('id');

        	var legalEntityId = $(this).parent().data('legalentityid');
        	
        	var tdList = $("#" + rowId).children();
        	
        	var code = tdList.eq(1).html().trim();
        	
        	var changedColumnName = $(this).data('columnname');
        	
        	var description = tdList.eq(2).html().trim();
        	if(changedColumnName == tdList.eq(2).data('columnname')){
        		description = $(this).children().children("input[name='value']").val();
        	}
        	
        	var countryCode = tdList.eq(3).html().trim();
        	if(changedColumnName == tdList.eq(3).data('columnname')){
        		countryCode = $(this).children().children("select").val();
        	}
        	
        	var taxpayerId = tdList.eq(4).html().trim();
        	if(changedColumnName == tdList.eq(4).data('columnname')){
        		taxpayerId = $(this).children().children("input[name='value']").val();
        	}
        	
        	var operational = Commons.SiNoToBoolean(tdList.eq(5).html().trim());
        	if(changedColumnName == tdList.eq(5).data('columnname')){
        		operational = $(this).children().children("select").val();
        	}
        	
         	var operationalTrx = Commons.SiNoToBoolean(tdList.eq(6).html().trim());
        	if(changedColumnName == tdList.eq(6).data('columnname')){
        		operationalTrx = $(this).children().children("select").val();
        	}
        	
        	var enabled = Commons.SiNoToBoolean(tdList.eq(7).html().trim());
        	if(changedColumnName == tdList.eq(7).data('columnname')){
        		enabled = $(this).children().children("select").val();
        	}
        	var taxpayerIdFormatted = tdList.eq(10).html().trim();
        	if(changedColumnName == tdList.eq(10).data('columnname')){
        		taxpayerIdFormatted = $(this).children().children("input[name='value']").val();
        	}
        	
        	var startDate = tdList.eq(11).html().trim();
        	if(changedColumnName == tdList.eq(11).data('columnname')){
        	    startDate = $(this).children().children("input[name='value']").val();
        	}
        	
        	var legalEntity = new LegalEntity(legalEntityId, code, description, taxpayerId, operational, enabled, countryCode, null, null, taxpayerIdFormatted, startDate, operationalTrx);
            return legalEntity;
        },

        "width": "90%",
        "height": "100%"
    } );
	
	valueTmp = "";
	
	table.$('td.editable-b-select').editable(Constants.CONTEXT_ROOT + "/app/service/legalEntity", {
		"method": "PUT", 
		//loadurl : 'http://www.example.com/json.php',
		data   : " {'false':'No', 'true':'Si','selected':'false'}",
	     type   : 'select',
	     submit : 'OK',
//	     cssclass : 'form-control',
		"ajaxoptions": {
			"dataType": 'json',
			"contentType": "application/json;",
			"type": "PUT"
		},
		placeholder: "-", 
        "callback": function( sValue, y ) {
        	
        	var aPos = table.fnGetPosition( this );
        	var v = valueTmp;
        	if(sValue.status == 0){
        		v = Commons.booleanToSiNo(sValue.value);
                noty(
    				   {
    					   text: '<strong>La entidad legal se ha actualizado correctamente!</strong>',
    					   layout:'topRight',
    					   type:'success',
    					   timeout:5000,
    					   animation: {
    					        open: 'animated bounceInDown', // Animate.css class names
    					        close: 'animated bounceOutUp', // Animate.css class names
    					        easing: 'swing', // unavailable - no need
    					        speed: 500 // unavailable - no need
    					   }
    				   }
    		   );	
        	} else {
        		noty(
 					   {
 						   text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
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
        	}
            table.fnUpdate(v, aPos[0], aPos[1] );
        	
            return;
        },
        "submitdata": function ( value, settings ) {
        	
        	valueTmp = value;
        	
        	var rowId = this.parentNode.getAttribute('id');

        	var legalEntityId = $(this).parent().data('legalentityid');
        	
        	var tdList = $("#" + rowId).children();
        	
        	var code = tdList.eq(1).html().trim();
        	
        	var changedColumnName = $(this).data('columnname');
        	
        	var description = tdList.eq(2).html().trim();
        	if(changedColumnName == tdList.eq(2).data('columnname')){
        		description = $(this).children().children("input[name='value']").val();
        	}
        	
        	var countryCode = tdList.eq(3).html().trim();
        	if(changedColumnName == tdList.eq(3).data('columnname')){
        		countryCode = $(this).children().children("select").val();
        	}
        	
        	var taxpayerId = tdList.eq(4).html().trim();
        	if(changedColumnName == tdList.eq(4).data('columnname')){
        		taxpayerId = $(this).children().children("input[name='value']").val();
        	}
        	
        	var operational = Commons.SiNoToBoolean(tdList.eq(5).html().trim());
        	if(changedColumnName == tdList.eq(5).data('columnname')){
        		operational = $(this).children().children("select").val();
        	}
        	
        	var operationalTrx = Commons.SiNoToBoolean(tdList.eq(6).html().trim());
        	if(changedColumnName == tdList.eq(6).data('columnname')){
        		operationalTrx = $(this).children().children("select").val();
        	}
        	
        	
        	var enabled = Commons.SiNoToBoolean(tdList.eq(7).html().trim());
        	if(changedColumnName == tdList.eq(7).data('columnname')){
        		enabled = $(this).children().children("select").val();
        	}
        	var taxpayerIdFormatted = tdList.eq(10).html().trim();
        	if(changedColumnName == tdList.eq(10).data('columnname')){
        		taxpayerIdFormatted = $(this).children().children("input[name='value']").val();
        	}
        	var startDate = tdList.eq(11).html().trim();
        	if(changedColumnName == tdList.eq(11).data('columnname')){
        	    startDate = $(this).children().children("input[name='value']").val();
        	}
        	
        	var legalEntity = new LegalEntity(legalEntityId, code, description, taxpayerId, operational, enabled, countryCode, null, null, taxpayerIdFormatted,startDate,operationalTrx);
        	
            return legalEntity;
        },

        "width": "90%",
        "height": "100%"
    } );
	
	valueTmp = "";
	
	table.$('td.editable-field').editable(Constants.CONTEXT_ROOT + "/app/service/legalEntity", {
		"method": "PUT", 
		"submit" : 'OK',
		"ajaxoptions": {
			"dataType": 'json',
			"contentType": "application/json;",
			"type": "PUT"
		},
		placeholder: "", 
        "callback": function( sValue, y ) {
        	
        	var aPos = table.fnGetPosition( this );
        	var v = valueTmp;
        	if(sValue.status == 0){
        		v = sValue.value;
                noty(
    				   {
    					   text: '<strong>La entidad legal se ha actualizado correctamente!</strong>',
    					   layout:'topRight',
    					   type:'success',
    					   timeout:5000,
    					   animation: {
    					        open: 'animated bounceInDown', // Animate.css class names
    					        close: 'animated bounceOutUp', // Animate.css class names
    					        easing: 'swing', // unavailable - no need
    					        speed: 500 // unavailable - no need
    					   }
    				   }
    		   );	
        	} else {
        		noty(
 					   {
 						   text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
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
        	}
            table.fnUpdate(v, aPos[0], aPos[1] );

            return;
        },
        "submitdata": function ( value, settings ) {
        	
        	valueTmp = value;
        	
        	var rowId = this.parentNode.getAttribute('id');

        	var legalEntityId = $(this).parent().data('legalentityid');
        	
        	var tdList = $("#" + rowId).children();
        	
        	var code = tdList.eq(1).html().trim();
        	
        	var changedColumnName = $(this).data('columnname');
        	
        	var description = tdList.eq(2).html().trim();
        	if(changedColumnName == tdList.eq(2).data('columnname')){
        		description = $(this).children().children("input[name='value']").val();
        	}
        	
        	var countryCode = tdList.eq(3).html().trim();
        	
        	var taxpayerId = tdList.eq(4).html().trim();
        	if(changedColumnName == tdList.eq(4).data('columnname')){
        		taxpayerId = $(this).children().children("input[name='value']").val();
        	}
        	
        	var operational = Commons.SiNoToBoolean(tdList.eq(5).html().trim());
        	var operationalTrx = Commons.SiNoToBoolean(tdList.eq(6).html().trim());
        	var enabled = Commons.SiNoToBoolean(tdList.eq(7).html().trim());
        	
        	var taxpayerIdFormatted = tdList.eq(10).html().trim();
        	if(changedColumnName == tdList.eq(10).data('columnname')){
        		taxpayerIdFormatted = $(this).children().children("input[name='value']").val();
        	}
        	
        	var startDate = tdList.eq(11).html().trim();
        	if(changedColumnName == tdList.eq(11).data('columnname')){
        	    startDate = $(this).children().children("input[name='value']").val();
        	}
        	
        	var legalEntity = new LegalEntity(legalEntityId, code, description, taxpayerId, operational, enabled, countryCode, null, null, taxpayerIdFormatted,startDate,operationalTrx);
        	
            return legalEntity;
        },

        "width": "90%",
        "height": "100%"
    } );

	LoginService.getUserData();

	return;
}

LegalEntityService.add = function(){
	var validator = $("#frmAddLegalEntity").validate();
	validator.element("#leDescription");
	validator.element("#leTaxpayerId");
	validator.element("#leCountry");
	validator.element("#leOperationalAdd");
	validator.element("#leEnabledLegalEntityAdd");
	validator.element("#leTaxpayerIdFormatted");
	if(!validator.valid()){
		return false;
	}
	var legalEntity = new LegalEntity(
			null,
			null,
			$("#leDescription").val(), 
			$("#leTaxpayerId").val(), 
			$("#leOperationalAdd").prop("checked"), 
			$("#leEnabledLegalEntityAdd").prop("checked"), 
			$("#leCountry").val(),
			null, 
			null,
			$("#leTaxpayerIdFormatted").val(),
			$("#leDateFrom99").children('input').val(),
			$("#leOperationalTrxAdd").prop("checked"));
	
	var $data = Commons.toJsonSnakeCase(legalEntity);
	
	$.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/legalEntity",
	   dataType: 'json',
	   data: $data,
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null && data.status == 0){
			   
			   LegalEntityService.reset();
			   $("#modalAddLegalEntity").modal("hide");
			   
			   var table = $('#tLegalEntityResult').DataTable();
			   //table.ajax.reload( null, false );
			   table.clear().draw();
			   LegalEntityService.get(LegalEntityService.handler);
			   
			   
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


LegalEntityService.reset = function(){

	$("#leDescription").val(""); 
	$("#leTaxpayerId").val("");
	$("#leCountry > option:first").prop("selected", true);
	
	$("#leCountry").multiselect('refresh');
	
	$("#leOperationalAdd").prop("checked", false);
	$("#leEnabledLegalEntityAdd").prop("checked", false);
	$("#leTaxpayerIdFormatted").val("");
	$("#leDateFrom99").children('input').val("");
	return;
}

LegalEntityService.getAduitedByCode = function(code){
    
    $('#modalLEAuditedTable').modal('show');
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/catalog/legalEntity?code="+ code,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       $("#auditedTable").DataTable().destroy();
	       RestConnector.appendTemplateResults(data, "#auditedTableBody", "#rowAuditedSheet");
	       $("#auditedTable").DataTable();
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
}

LegalEntityService.removeOnly = function(id){
	
	var idList = [];
	idList.push(id);	
	return LegalEntityService.remove(idList);
}

LegalEntityService.remove = function(idList){
	
	if(idList == null || idList === undefined || idList == "" || idList.length == 0){
		noty(
			   {
				   text: '<strong>No se ha seleccionado ningún elemento para borrar.</strong>',
				   layout:'topRight',
				   type:'information',
				   animation: {
				        open: 'animated bounceInDown', // Animate.css class names
				        close: 'animated bounceOutUp', // Animate.css class names
				        easing: 'swing', // unavailable - no need
				        speed: 500 // unavailable - no need
				    },
				   timeout:10000
			   }
		);
		
		
		return false;
	}
	
	
	noty({
		text: 'Esta seguro que desea borrar?',
		modal:true,
		layout: 'center',
		type: "error",
		animation: {
	        open: 'animated bounceIn', // Animate.css class names
	        close: 'animated flipOutX', // Animate.css class names
	        easing: 'swing', // unavailable - no need
	        speed: 500 // unavailable - no need
	    },
		buttons: [
			{addClass: 'btn btn-success', text: 'Aceptar', onClick: function($noty) {
				
				$noty.close();
				
				$.ajax({ 
					   type    : "DELETE",
					   url     : Constants.CONTEXT_ROOT + "/app/service/legalEntity",
					   dataType: 'json',
					   data: JSON.stringify({"ids" : idList}),
					   contentType: "application/json;",
					   success:function(data) {
						   if(data != null && data.status == 0){
							   
							   	var table = $("#tLegalEntityResult").DataTable();
							   	
							   	for(var i=0;i<idList.length;i++){
							   		
							   		var deletedRow = null;
							   		
							   		$("#tLegalEntityResult > tbody > tr").each(function(){
							   			
							   			var id = $(this).data("legalentityid");
							   			if(id == idList[i]){
							   				
							   				deletedRow = $(this);
							   				
							   				return false;
							   			}
							   			
							   			return;
							   		});
							   		
							   		table
							   			.row(deletedRow)
							   			.remove()
							   			.draw();
							   	}
							   	
							   noty(
								   {
									   text: '<strong>Los elementos seleccionados se han borrado con éxito!</strong>',
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
									   text: '<strong>Error al intentar borrar. Mensaje: ' + data.responseJSON.cause + '</strong>',
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

				}
			},
			{addClass: 'btn btn-default', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
			}
		]
	});
	
	return;
}

LegalEntity.update = function(id){

	$("#legalEntityFlag").val("U");
	$("#legalEntityId").val(id);
	
	$.ajax({ 
		   type    : "GET",
		   url     : Constants.CONTEXT_ROOT + "/app/service/legalEntity?id=" + id,
		   dataType: 'json',
		   contentType: "application/json;",
		   success:function(data) {
			   if(data != null){

				   var optCountries = $("#leInvoicingCountryCode > option");
				   
				   $.each(optCountries, function(){
					   
					   if($(this).val() == data.country_code){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   $("#leInvoicingCountryCode").multiselect("refresh");

				   var optChannels = $("#leInvoicingChannel > option");
				   
				   $.each(optChannels, function(){
					   
					   if($(this).html().trim() == data.channel){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   
				   var optProductTypes = $("#leInvoicingProductType > option");
				   
				   $.each(optProductTypes, function(){
					   
					   if($(this).html().trim() == data.product_type){
						   $(this).prop("selected",true);
						   
						   return false;
					   }
					   
					   return;
				   });
				   
				   $('#leInvoicingEnabledDate').children('input').val(data.rule_start_date);
				   $("#leInvoicingLegalEntityType").val(data.legal_entity_code);
				   $("#leInvoicingLegalEntityType").multiselect('refresh');
				   
				   $("#modalAddOraLeInvoicing").modal("show");
				   
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

LegalEntityService.buildReferencedRules = function(){
	
	var settings = new Object();
	settings.params = [];
	settings.params.push({
		"name" : "type",
		"value" : "LEGAL_ENTITY" 
	});
	settings.url = "referenced-rules";
	settings.handler = LegalEntityService.referencedRulesHandler;
	
	RestConnector.get(settings);

	return;
}

LegalEntityService.referencedRulesHandler = function(data){
	return CommonsService.referencedRulesHandler(data, $("#tLeInfo"));
}


