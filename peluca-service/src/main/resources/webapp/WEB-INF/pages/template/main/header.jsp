<div class="navbar navbar-fixed-top bs-docs-nav" role="banner">

	<div class="conjtainer">
		<!-- Menu button for smallar screens -->
		<div class="navbar-header">
			<button class="navbar-toggle btn-navbar" type="button"
				data-toggle="collapse" data-target=".bs-navbar-collapse">
				<span>Menu</span>
			</button>
			<!-- Site name for smallar screens -->
			<a href="index.html" class="navbar-brand hidden-lg">MacBeth</a>
		</div>
		<!-- Navigation starts -->
		<nav class="collapse navbar-collapse bs-navbar-collapse"
			role="navigation">
			<!-- Links -->
			<ul class="nav navbar-nav pull-right">
				<li class="dropdown pull-right"><a data-toggle="dropdown"
					class="dropdown-toggle" href="#"> <i class="fa fa-user"></i><span id="loggedUsernameContainer"></span><b class="caret"></b>
				</a> <!-- Dropdown menu -->
					<ul class="dropdown-menu">
						<form id="frmLogout" action="${pageContext.request.contextPath}/app/atp/3/logout">
						<a id="aLogout" href="javascript:void(0);">
						<li>
							<i class="fa fa-sign-out"></i>Cerrar Sesi&oacute;n
						</li>
						</a>
						</form>
					</ul></li>
			</ul>
		</nav>
	</div>
</div>
