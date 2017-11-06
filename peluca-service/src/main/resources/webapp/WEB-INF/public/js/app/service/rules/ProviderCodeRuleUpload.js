ProviderCodeRuleUpload = function(){}

ProviderCodeRuleUpload.init = function(){
    
    $("#sellTypeBulkSearchButton").on("click", function(){
    	$("#ruleSellPointfileupload").click();
    	
    	return;
    });

    var filename;
    $('#ruleSellPointfileupload').on("change ",function () {
    	filename = this.value.split(String.fromCharCode(92));
    	$("#filenameRuleSellType").val(filename[filename.length-1]);
    	
    	return;
    });

    $('#modalImport').on('hidden.bs.modal', function () {
    	$("#ruleSellPointResult").hide();
    	$('#uploadButtonRuleSellType').remove();
    	$("#filenameRuleSellType").val("");
    	ProviderCodeRuleService.reset();
    	$("#btnSpSearch").click();
    	
    	return;
    });

    $('#modalImport').on('shown.bs.modal', function () {   
    	RestConnector.postUploadFile('#ruleSellPointfileupload', 
    			'/app/service/provider-code/upload/xls', 
    			"uploadButtonRuleSellType", 
    			ProviderCodeRuleUpload.handler);
    	
    	return;
    });
    
}

ProviderCodeRuleUpload.handler = function(e, data){
	
	if(data.result != null){

		if(data.result.entity_error_list != null && data.result.entity_error_list.length > 0){
			data.result.entity_error_list.forEach(function(element){
				noty({
					text: '<strong>Error de Validacion - '+ element.description + '</strong>',
					layout:'topRight',
					type:'error',
					timeout:20000,
					animation: {
				        open: 'animated bounceInDown', // Animate.css class names
				        close: 'animated bounceOutUp', // Animate.css class names
				        easing: 'swing', // unavailable - no need
				        speed: 500 // unavailable - no need
				   }
				});
				
				return;
		    });
		}
		if(data.result.client_form_summary_list != null){
			console.log(data);
			if(data.result.client_form_summary_list.length > 0){
				$('#ruleSellPointResult').show();
				 $("#ruleSellPointResultTable").DataTable().destroy();
				RestConnector.appendTemplateResults(data.result.client_form_summary_list, '#ruleSellPoint_Result_Upload', '#rowSellTypeSheet');
				   $("#ruleSellPointResultTable").DataTable({
					   "order":[[1,"desc"]],
				    	    "columnDefs": [ {
				    	      "targets"  : 'no-sort',
				    	      "orderable": false,
				    	    }]
				    	});
				noty({
					text: '<strong>' + data.result.client_form_summary_list.length + ' Items cargados / actualizados con exito\n</strong>',
					layout:'topRight',
					type:'success',
					timeout:10000,
					animation: {
						open: 'animated bounceInDown', // Animate.css class names
			        	close: 'animated bounceOutUp', // Animate.css class names
			        	easing: 'swing', // unavailable - no need
			        	speed: 500 // unavailable - no need
					}
				});
			}
		}
	}
	
	return;
}
