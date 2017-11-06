LegalEntityUpload = function(){};

LegalEntityUpload.init = function(){
    
    $("#searchButon").on("click", function(){
	    $("#LEfileupload").click();
    })

    var filename;
    $('#LEfileupload').on("change ",function () {
	  filename = this.value.split(String.fromCharCode(92));
	  $("#filename").val(filename[filename.length-1]);
    });

    $('#modalCargaMasiva').on('hidden.bs.modal', function () {
	$("#LEBodyResult").hide();
	$('#uploadBtn').remove();
	$("#filename").val("");
	LegalEntityService.reset();  
	$("#btnLeSearch").click();
    })

    $('#modalCargaMasiva').on('shown.bs.modal', function () {
	RestConnector.PostFile('#LEfileupload', '/app/upload/xls/add', '#LEBodyResult', '#LE_Result_Upload', '#rowSheet');     
    });
    
}
