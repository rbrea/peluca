<!-- Header starts -->
<header>
	<div class="container">
		<div class="row">

			<!-- Logo section -->
			<div class="col-md-4">
				<!-- Logo. -->
				<div class="logo">
					<h1>
						<img width="12%" src="${pageContext.request.contextPath}/app/public/img/inner/concrete-mixer-truck-scale.png"><a href="#">Cfa<span class="bold">Mixer</span></a>
					</h1>
					<p class="meta">Aplicaci&oacute;n para administrar reglas de catalogo</p>
				</div>
				<!-- Logo ends -->
			</div>

			<!-- Button section -->
			<div class="col-md-4">
				&nbsp;
			</div>

			<!-- Data section -->

			<div class="col-md-4">
				<div class="header-data">

					<!-- Traffic data -->
					<div id="versionBox" class="hdata hide">
						<div class="mcol-left">
							<!-- Icon with red background -->
							<i class="glyphicon glyphicon-barcode bred"></i>
						</div>
						<div class="mcol-right">
							<!-- Number of visitors -->
							<p>
								<a id="headerVersion" href="#">1.0</a> <em>vers.activa</em>
							</p>
						</div>
						<div class="clearfix"></div>
					</div>

					<!-- Members data -->
					<div class="hdata">
						<div class="mcol-left">
							<!-- Icon with blue background -->
							<i class="glyphicon glyphicon-wrench bblue"></i>
						</div>
						<div class="mcol-right">
							<!-- Number of visitors -->
							<p>
								<span id="initCatalogsCounter">1</span> <em>cat&aacute;logos</em>
							</p>
						</div>
						<div class="clearfix"></div>
					</div>

					<!-- revenue data -->
					<div class="hdata">
						<div class="mcol-left">
							<!-- Icon with green background -->
							<i class="glyphicon glyphicon-paperclip bgreen"></i>
						</div>
						<div class="mcol-right">
							<!-- Number of visitors -->
							<p>
								<span id="initRulesCounter">0</span><em>reglas</em>
							</p>
						</div>
						<div class="clearfix"></div>
					</div>

				</div>
			</div>

		</div>
	</div>
</header>
<div id="loading-message-div">
	<img src="${pageContext.request.contextPath}/app/public/img/inner/loader.gif" width="32px">&nbsp;&nbsp;Espere por favor ...
</div>