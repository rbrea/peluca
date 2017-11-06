<script src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/model/LegalEntity.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/LegalEntityService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/rules/FictionalChargeService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/rules/FictionalChargeUpload.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>

<script>
	
	$(document).ready(
		function(){
			
			$("#nav li").removeClass("open");
			$("li.has_sub ul li").removeClass("current");
			$("#sidebarRules").addClass("open");
			$("#optFictionalCharge").addClass("current");
			
 			FictionalChargeService.init();
	  		FictionalChargeUpload.init();

			$('#spEnabledDate').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			$('#spNewVersionDate').datetimepicker({
			      	pickTime: false,
				defaultDate: "11/1/2013",	
			      	autoclose: true
			    });
			
			 if(window.location.href.indexOf('#modalCommentRule') != -1) {
			      $('#modalCommentRule').modal('show');
			    }
			return;
		}
	);

</script>
