<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<!-- Title and other stuffs -->
<title>CFA-Mixer Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="author" content="">

<!-- Stylesheets -->
<link href="${pageContext.request.contextPath}/app/public/css/bootstrap.min.css" rel="stylesheet">

<link href="${pageContext.request.contextPath}/app/public/css/bootstrap-theme.min.css" rel="stylesheet">

<link rel="stylesheet" href="${pageContext.request.contextPath}/app/public/css/font-awesome.min.css">


<link href="${pageContext.request.contextPath}/app/public/css/style.css" rel="stylesheet">

<link href="${pageContext.request.contextPath}/app/public/css/app/main.css" rel="stylesheet">

<script src="${pageContext.request.contextPath}/app/public/js/lib/respond.min.js"></script>

<!--[if lt IE 9]>
  <script src="js/html5shiv.js"></script>
  <![endif]-->

<!-- Favicon -->
<link rel="shortcut icon" href="${pageContext.request.contextPath}/app/public/img/inner/concrete-mixer-truck-icon.jpg">

<style type="text/css">

.noty-message{
    width:400px;
}

</style>

</head>
<!-- Header starts -->
<body>
	<div id="loading-message-div">
		<img src="${pageContext.request.contextPath}/app/public/img/inner/loader.gif" width="32px">&nbsp;&nbsp;Espere por favor ...
	</div>
	<!-- Form area -->
	<div class="admin-form">
		<div class="container">
			<h1 class="text-center">
				<a href="#"><span class="bold">CFA <img width="15%" src="${pageContext.request.contextPath}/app/public/img/inner/concrete-mixer-truck-scale.png"></span> Mixer</a>
			</h1>
			<div class="row">
				<div class="col-md-12">
					<!-- Widget starts -->
					<div class="widget worange">
						<!-- Widget head -->
						<div class="widget-head">
							<i class="fa fa-lock"></i> Login
						</div>

						<div class="widget-content">
							<div class="padd">
								<!-- Login form -->
								<form id="frmLogin" class="form-horizontal" method="POST">
									<!-- Email -->
									<div class="form-group">
										<label class="control-label col-lg-3" for="inputUsername">Usuario</label>
										<div class="col-lg-9">
											<input type="text" class="form-control" id="inputUsername" name="username"
												placeholder="Nombre de Usuario" required>
										</div>
									</div>
									<!-- Password -->
									<div class="form-group">
										<label class="control-label col-lg-3" for="inputPassword">Contrase&ntilde;a</label>
										<div class="col-lg-9">
											<input type="password" class="form-control" name="password"
												id="inputPassword" placeholder="Contrase&ntilde;a" required>
										</div>
									</div>
									<!-- Remember me checkbox and sign in button -->
									<!-- 
									<div class="form-group">
										<div class="col-lg-9 col-lg-offset-3">
											<div class="checkbox">
												<label> <input type="checkbox"> Remember me
												</label>
											</div>
										</div>
									</div>
									 -->
									<div class="col-lg-9 col-lg-offset-3">
										<button id="btnLoginSubmit" type="button" class="btn btn-info btn-sm">Enviar</button>
										<button id="btnLoginReset" type="reset" class="btn btn-default btn-sm">Limpiar</button>
									</div>
									<br />
								</form>

							</div>
						</div>

						<div class="widget-foot">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<!-- JS -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/app/public/js/lib/bootstrap.min.js"></script>
	<!-- jQuery Notification - Noty -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.noty.js"></script> <!-- jQuery Notify -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/themes/default.js"></script> <!-- jQuery Notify -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/bottom.js"></script> <!-- jQuery Notify -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/topRight.js"></script> <!-- jQuery Notify -->
	<script src="${pageContext.request.contextPath}/app/public/js/lib/layouts/top.js"></script> <!-- jQuery Notify -->
	
	<script src="${pageContext.request.contextPath}/app/public/js/lib/jquery.validate.min.js"></script>
	<!-- app's scripts -->
	<script src="${pageContext.request.contextPath}/app/public/js/app/utils/Constants.js"></script>
	<script src="${pageContext.request.contextPath}/app/public/js/app/service/LoginService.js"></script>
	<script src="${pageContext.request.contextPath}/app/public/js/app/model/LoginData.js"></script>
	
	<script>
		
		$(document).ready(function(){
			
			Constants.CONTEXT_ROOT = "${pageContext.request.contextPath}";
		    			
			$("#loading-message-div").css({"display": "none"});
			
			$(document).ajaxStart(function () {
				$("#loading-message-div").css({"display": "block"});
			
				return;
			});
		
			$(document).ajaxStop(function () {
				$("#loading-message-div").css({"display": "none"});
			
				return;
			});
		
			LoginService.init();
		
			return;
		});
	
	</script>
	
</body>
</html>