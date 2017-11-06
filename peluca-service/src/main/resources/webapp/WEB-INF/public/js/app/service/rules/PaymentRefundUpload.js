PaymentRefundUpload = function(){}

PaymentRefundUpload.init = function(){
    
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
	PaymentRefundService.reset();
	$("#btnSpSearch").click();
    })

    $('#modalImport').on('shown.bs.modal', function () {   
	$('.exportar').width('70%');  
	 $("#ruleSellPointResultTable").DataTable().destroy();
	RestConnector.PostFile('#ruleSellPointfileupload', '/app/service/payment-refund/upload/xls/', '#ruleSellPointResult', '#ruleSellPoint_Result_Upload', '#rowSellTypeSheet');
	 $("#ruleSellPointResultTable").DataTable({
		   "order":[[1,"desc"]],
	    	    "columnDefs": [ {
	    	      "targets"  : 'no-sort',
	    	      "orderable": false,
	    	    }]
	    	});
    }); 
}
