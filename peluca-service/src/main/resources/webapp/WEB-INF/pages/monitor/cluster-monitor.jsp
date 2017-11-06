<style>
pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
        .string { color: green; }
        .number { color: darkorange; }
        .boolean { color: blue; }
        .null { color: magenta; }
        .key { color: red; }
   
	.highlight { background-color: DARKGREY !important; }    

</style>

<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> Monitor de Cache Cluster
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/cluster-monitor"><i
			class="fa fa-home"></i> Home</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Monitor de Cache Cluster</a>
	</div>

	<div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter MONITOR_CLUSTER">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="container">
					<div class="row">
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">
								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Nodos&nbsp; 
									</div>
									<div class="widget-icons pull-right">
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="widget-content">
									<div class="padd">
										<br />
										<!-- Table Page -->
										<div class="page-tables">
											<!-- Table -->
											<div class="table-responsive">
												<table cellpadding="0" cellspacing="0" border="0" id="tNodesResult" width="100%">
													<thead>
														<tr style="font-weight:bold;">
															<th class="centered">Nombre Nodo</th>
															<th class="centered">&Uacute;ltimo Arranque</th>
															<th class="centered">Acciones</th>
														</tr>
													</thead>
													<tbody>
													</tbody>
												</table>
												<div class="clearfix"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="widget-foot">
								<!-- Footer goes here -->
								<div class="container">
									<div class="row">
										<div class="col-md-offset-1 col-md-4">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="container">
					<div class="row">
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">
								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Nodos&nbsp; 
									</div>
									<div class="widget-icons pull-right">
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="widget-content">
									<div class="padd">
										<div class="container">
											<div class="row">
												<div class="form-group">
													<label class="col-md-4 control-label" for="txtCacheName">Nombre Cache</label>
													<div class="col-md-6">
														<select id="filterCacheName" class="form-control">
															<option value="" selected>Seleccione una opci&oacute;n</option>
															<option value="legal-entity">Entidades Legales</option>
															<option value="rule-fictional-charge-active">Regla Fictional Charge</option>
															<option value="rule-om-legal-entity-pad-active">Regla OM LegalEntity PAD</option>
															<option value="rule-om-legal-entity-pp-active">Regla OM LegalEntity PP</option>
															<option value="rule-payment-refund-active">Regla Payment Refund</option>
															<option value="rule-sell-type-active">Regla Tipo Venta</option>
															<option value="release-version-log">Release Version Log</option>
														</select>
													</div>
												</div>
											</div>
											<div class="row">
												&nbsp;
											</div>
											<div class="row">
												<div class="form-group">
													<div class="col-md-8">
														&nbsp;
													</div>
													<div class="col-md-2">
														<button id="btnSearchCacheNames" class="form-control btn btn-primary btn-sm"><i class="glyphicon glyphicon-search"></i>&nbsp;Buscar</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="widget-foot">
								<!-- Footer goes here -->
								<div class="container">
									<div class="row">
										<div class="col-md-offset-1 col-md-4">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="container">
					<div class="row">
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">
								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Monitor de Cache Cluster&nbsp; 
									</div>
									<div class="widget-icons pull-right">
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="widget-content">
									<div class="padd">
										<br />
										<!-- Table Page -->
										<div class="page-tables">
											<!-- Table -->
											<div class="table-responsive">
												<table cellpadding="0" cellspacing="0" border="0" id="tSearchResult" width="100%">
													<thead>
														<tr style="font-weight:bold;">
															<th class="centered">Nombre Cache</th>
															<th class="centered">Key</th>
															<th class="centered">Fecha Actualizaci&oacute;n</th>
															<th class="centered">Valor</th>
															<th class="centered">Tipo</th>
															<th class="centered">Estado</th>
														</tr>
													</thead>
													<tbody>
													</tbody>
												</table>
												<div class="clearfix"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="widget-foot">
								<!-- Footer goes here -->
								<div class="container">
									<div class="row">
										<div class="col-md-offset-1 col-md-4">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Matter ends -->
<script src="${pageContext.request.contextPath}/app/public/js/app/service/monitor/MonitorClusterService.js"></script>

<script>
	
	$(document).ready(
		function(){
			
			$("#nav li").removeClass("open");
			$("li.has_sub ul li").removeClass("current");
			$("#sidebarCatalogs").addClass("open");
			$("#optMonitorCluster").addClass("current");
			
			MonitorClusterService.init("roher-lospiojos");
			
			return;
		}		
	);

</script>
