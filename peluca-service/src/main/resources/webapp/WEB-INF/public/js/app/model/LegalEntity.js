LegalEntity = function(id, code, description, taxpayerId, operational, enabled, countryCode, creationDate, updatedDate, taxpayerIdFormatted, startDate,operationalTrx ){
	
	this.id = id;
	this.code = code;
	this.description = description;
	this.taxpayerId = taxpayerId;
	this.operational = operational;
	this.enabled = enabled;
	this.countryCode = countryCode;
	this.creationDate = creationDate;
	this.updatedDate = updatedDate;
	this.taxpayerIdFormatted = taxpayerIdFormatted;
	this.startDate = startDate;
	this.operationalTrx = operationalTrx;
	return;
}

LegalEntity.init = function(){
	
	$("#btnAddLegalEntitySave").on("click", function(){
		
		LegalEntityService.add();
		
		return;
	});
	
	$('#modalAddLegalEntity').on('hidden.bs.modal', function (e) {
	
		LegalEntityService.reset();
		
		return;
	});
		
	$('#modalAddLegalEntity').on('shown.bs.modal', function (e) {
		
		$("#leCode").focus();
		var m = moment().format("DD/MM/YYYY");
		$("#leDateFrom99").children('input').val(m);
		
		return;
	});
	
	$("#legalEntitySelectAll").on("click", function(){
		
		var isChecked = $(this).prop("checked");
		
		$("input[type='checkbox'][id*='selectedRow_']").each(function(){
			
			$(this).prop("checked", isChecked);
			
			return;
		});
		
		return;
	});
	
	$("#btnLegalEntityRemoveAll").on("click", function(){
		
		var list = [];
		
		$("input[type='checkbox'][id*='selectedRow_']:checked").each(function(){

			var id = $(this).parent().parent().data("legalentityid");
			
			list.push(id);
			
			return;
		});
		if(list.length > 0 ){
			LegalEntityService.remove(list);
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
	
	$("#btnLeSearch").on("click", function(){
		LegalEntityService.get(LegalEntityService.handler);
		
		return;
	});
	
	$("#btnLeReset").on("click", function(e){
		e.preventDefault();
		
		$(this).closest('form').find("input[type=text], textarea").val("");
		$(this).closest('form').find("select").each(function(){ $(this).children("option:first").prop("selected", true);});
		$('#filterLeCountry').multiselect("refresh");
		
		return;
	});
	
	 $("#frmLegalEntitySearch").on('submit', function() {
	     $("#frmLegalEntitySearch").find("input[type='hidden']").remove();
	     
	        var code = $("#filterLeCode").val();
	        var description = $("#filterLeDescription").val();
	        var taxpayer = $("#filterLeTaxpayerId").val();
	        var countryCode = $("#filterLeCountry").val();
	        var operational = $("#filterLeOperational").val();
	        var enabled = $("#filterLeEnabled").val();
	        var taxpayerFormatted = $("#filterLeTaxpayerIdFormatted").val();
	        var startDate = $("#filterLeDateFrom99").children('input').val();
	        
	        Commons.makeSubmitUrl("code", code, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("description", description, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("taxPayerId", taxpayer, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("countryCode", countryCode, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("operational", operational, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("enabled", enabled, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("taxpayerIdFormatted", taxpayerFormatted, '#frmLegalEntitySearch');
	        Commons.makeSubmitUrl("startDate", startDate, '#frmLegalEntitySearch');
	        return;
	    });

	$('#tLegalEntityResult').on( 'page.dt', function () {
		
		LoginService.getUserData();
		
		return;
	} );
	
	$("#btnLeExport").on("click", function(){
		
		$("#frmLegalEntitySearch").submit();
		
		return;
	});
	
	$("#btnLeLoad").on("click", function(){
		
		$("#modalCargaMasiva").modal("show");
		
		return;
	});
	
	$("#btnLeExport").tooltip();
    	$("#btnLeLoad").tooltip();
    	$('#btnAddLegalEntity').tooltip();
    	$('#btnLeInfo').tooltip();
    	$('#btnRevInfo').tooltip();

	LegalEntityService.buildReferencedRules();
	
	return;
}