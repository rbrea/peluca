PermissionService = function(){}

PermissionService.userPermissions = [];
PermissionService.userObjects = [];

PermissionService.initPermissions = function(loginData) {
	var objects = loginData.objects;
	if(objects != null){
		$.each(objects, function(){
			PermissionService.userObjects.push(this);
			
			return;
		});
	}
}

PermissionService.doJobWithRoleables = function(){
	
	var objects = PermissionService.userObjects;
	$.each(objects,function () {
		if($("." + this.name).length){

			$.each(this.permissions, function(){
				$('.' + this).removeClass("roleable");
		
				return;
			});
		} else {
			$('.LECTURA').removeClass("roleable");
		}
		
		return;
	});
}

PermissionService.doHideOfProductionElements = function(){
	
	$("#aRuleCharge").attr("href", Constants.CONTEXT_ROOT + "/app/html/rule-charge-active");
	$("#aFictionalCharge").attr("href", Constants.CONTEXT_ROOT + "/app/html/fictional-charge-active");
	$("#aPaymentRefund").attr("href", Constants.CONTEXT_ROOT + "/app/html/payment-refund-active");
	$("#aOmLegalEntityPAD").attr("href", Constants.CONTEXT_ROOT + "/app/html/om-legal-entity-pad-active");
	$("#aOmLegalEntityPP").attr("href", Constants.CONTEXT_ROOT + "/app/html/om-legal-entity-pp-active");
	$("#aPOLegalEntity").attr("href", Constants.CONTEXT_ROOT + "/app/html/po-legal-entity-active");
	$("#aRuleSellType").attr("href", Constants.CONTEXT_ROOT + "/app/html/rule-sell-type-active");
	$("#aProviderCodeRule").attr("href", Constants.CONTEXT_ROOT + "/app/html/provider-code-active");
	
	$("#btnBackToEdit").addClass("hide");
	
	return;
}