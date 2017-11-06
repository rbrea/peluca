<!-- JS -->

<script src="${pageContext.request.contextPath}/app/public/js/lib/q.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/bootstrap.min.js"></script> <!-- Bootstrap -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery-ui.min.js"></script> <!-- jQuery UI -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/moment.min.js"></script> <!-- Moment js for full calendar -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/fullcalendar.min.js"></script> <!-- Full Google Calendar - Calendar -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.rateit.min.js"></script> <!-- RateIt - Star rating -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.prettyPhoto.js"></script> <!-- prettyPhoto -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.slimscroll.min.js"></script> <!-- jQuery Slim Scroll -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.dataTables.min.js"></script> <!-- Data tables -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.jeditable.js"></script>

<!-- jQuery Flot -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/excanvas.min.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.flot.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.flot.resize.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.flot.pie.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.flot.stack.js"></script>

<!-- jQuery Upload -->
<script src="${pageContext.request.contextPath}/app/public/js/app/service/jquery.ui.widget.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/jquery.fileupload.js"></script>

<!-- jQuery Notification - Noty -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.noty.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/themes/default.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/bottom.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/topRight.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/top.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/center.js"></script> <!-- jQuery Notify -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/topCenter.js"></script> <!-- jQuery Notify -->
<!-- jQuery Notification ends -->

<script src="${pageContext.request.contextPath}/app/public/js/lib/sparklines.js"></script> <!-- Sparklines -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.cleditor.min.js"></script> <!-- CLEditor -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/bootstrap-datetimepicker.min.js"></script> <!-- Date picker -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.onoff.min.js"></script> <!-- Bootstrap Toggle -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/filter.js"></script> <!-- Filter for support page -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/custom.js"></script> <!-- Custom codes -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/charts.js"></script> <!-- Charts & Graphs -->
<script src="${pageContext.request.contextPath}/app/public/js/lib/handlebars-v4.0.5.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.validate.min.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/lib/bootstrap-multiselect.js"></script>
<!-- app's scripts -->

<script src="${pageContext.request.contextPath}/app/public/js/app/utils/Commons.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/model/LoginData.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/LoginService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/CommonsService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/connector/RestConnector.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/RuleCatalogService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/PermissionService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/ButtonMigration.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/ButtonRemove.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/ReleaseVersionLog.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/RuleStateMessage.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/Environment.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/Noty.js"></script>

<script src="${pageContext.request.contextPath}/app/public/js/lib/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>

<script>

	$(document).ready(function(){
		
		$("#loading-message-div").css({"display": "none"});
		
		$(document).ajaxStart(function () {
			$("#loading-message-div").css({"display": "block"});
		
			return;
		});
	
		$(document).ajaxStop(function () {
			$("#loading-message-div").css({"display": "none"});
		
			return;
		});
	
		LoginService.getUserData();
		
		$("#aLogout").on("click", function(){
			
			LoginService.doLogout();
			
			return;
		});
		RuleCatalogService.initCounter();
		
		return;
	});
</script>
