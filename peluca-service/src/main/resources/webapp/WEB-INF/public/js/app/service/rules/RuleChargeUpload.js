RuleChargeUpload = function(){}

RuleChargeUpload.init = function(){
    
    $("#sellTypeBulkSearchButton").on("click", function(){
	$("#ruleSellPointfileupload").click();
    })

    var filename;
    $('#ruleSellPointfileupload').on("change ",function () {
	filename = this.value.split(String.fromCharCode(92));
	$("#filenameRuleSellType").val(filename[filename.length-1]);
    });

    $('#modalImport').on('hidden.bs.modal', function () {
	$("#ruleSellPointfileupload").hide();
	$('#uploadButtonRuleSellType').remove();
	$("#filenameRuleSellType").val("");
	RuleChargeService.reset();
	$("#btnCiSearch").click();
    })

    $('#modalImport').on('shown.bs.modal', function () {   
	$('.exportar').width('70%');  
	RestConnector.PostFile('#ruleSellPointfileupload', '/app/service/rule-charge/upload/xls/', '#ruleSellPointResult', '#ruleSellPoint_Result_Upload', '#rowRuleChargeSheet');		
    }); 
}

RuleChargeUpload.handler = function(e, data){
	
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
			if(data.result.client_form_summary_list.length > 0){
				$('#ruleChargeResult').show(); 
				 $("#ruleSellPointResultTable").DataTable().destroy();
				RestConnector.appendTemplateResults(data.result.client_form_summary_list, '#ruleCharge_Result_Upload', '#rowRuleChargeSheet');
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
