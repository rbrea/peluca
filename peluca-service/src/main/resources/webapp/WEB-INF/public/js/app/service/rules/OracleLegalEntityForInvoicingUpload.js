OracleLegalEntityForInvoicingUpload = function(){}

OracleLegalEntityForInvoicingUpload.init = function(){
    
    $("#searchButon").on("click", function(){
	$("#OraLEfileupload").click();
    })

    var filename;
    $('#OraLEfileupload').on("change ",function () {
	filename = this.value.split(String.fromCharCode(92));
	$("#filename").val(filename[filename.length-1]);
    });

    $('#modalOraLEInvoice').on('hidden.bs.modal', function () {
	$("#LEBodyResult").hide();
	$('#uploadBtn').remove();
	$("#filename").val("");
	OracleLegalEntityForInvoicingService.reset();
	$("#btnLeInvoicingSearch").click();
    })

    $('#modalOraLEInvoice').on('shown.bs.modal', function () {   
	RestConnector.PostFile('#OraLEfileupload', '/app/upload/xls/', '#LEBodyResult', '#LE_Result_Upload', '#rowSheet');		
    }); 
}
