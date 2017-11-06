<div id="modalAddBroadcast" class="modal fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-remove"></i>
				</button>
				<h4 class="modal-title">Aplicaciones Subscriptas</h4>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<div class="panel panel-default">
						<div class="panel-body">
							<form id="frmAddBroadcast" role="form">
								<div class="row">
									<div class="form-group">
										<label class="col-md-4 control-label" for="broadcastType">Tipo</label>
										<div class="col-md-6">
											<select id="broadcastType" class="form-control">
												<option value="">Seleccione una opci&oacute;n</option>
												<option value="LEGAL_ENTITY">Entidad Legal</option>
												<option value="ORACLE_LEGAL_ENTITY_INVOICING">Entidad
													Legal Facturaci&oacute;n PAM</option>
											</select>
										</div>
									</div>
								</div>
								<div class="row">&nbsp;</div>
								<div class="row">
									<div class="form-group">
										<label class="col-md-4 control-label" for="broadcastAppName">Nombre
											Aplicaci&oacute;n</label>
										<div class="col-md-6">
											<input type="text" id="broadcastAppName" class="form-control">
										</div>
									</div>
								</div>
								<div class="row">&nbsp;</div>
								<div class="row">
									<div class="form-group">
										<label class="col-md-4 control-label" for="broadcastUrl">Url
											Callback</label>
										<div class="col-md-8">
											<input type="text" id="broadcastUrl" class="form-control">
										</div>
									</div>
								</div>
								<div class="row">&nbsp;</div>
								<div class="row">&nbsp;</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
				</button>
				<button id="btnAddBroadcastSave" type="button"
					class="btn btn-success">
					<i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> Broadcast - Registro de subscriptores
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Home</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Broadcast
			- Registro de subscriptores</a>
	</div>

	<div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="container">
					<div class="row">
						<!-- 	<div class="col-md-1">&nbsp;</div> -->
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">

								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Aplicaciones
										Subscriptas
									</div>

									<div class="widget-icons pull-right">
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<span class="pull-right">&nbsp;</span>
									<div class="clearfix"></div>
								</div>

								<div class="widget-content">
									<div class="padd">
										<br />
										<!-- Table Page -->
										<div class="page-tables">
											<!-- Table -->
											<div class="table-responsive">
												<table cellpadding="0" cellspacing="0" border="0"
													id="tBroadcastResult" width="100%">
													<thead>
														<tr style="font-weight: bold;">
															<th class="centered"><input type="checkbox"
																id="subscriberSelectAll" style="cursor: pointer;"
																title="Seleccionar todos ..."></th>
															<th class="centered">Tipo</th>
															<th class="centered">Nombre Aplicaci&oacute;n</th>
															<th class="centered">Url Callback</th>
															<th class="centered">Fecha Creaci&oacute;n</th>
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
								<div class="widget-foot">
									<!-- Footer goes here -->
									<div class="row">
										<div class="col-md-2 pull-left">
											<ul class="list-inline">
												<li><a id="btnBroadcastAdd" href="javascript:void(0);"
													class="btn btn-xs btn-success"> <i
														class="glyphicon glyphicon-plus-sign"
														data-toggle="tooltip" data-placement="left" title="Nuevo"></i>&nbsp;
												</a></li>
												<li><a id="btnBroadcastRemoveAll"
													href="javascript:void(0);" class="btn btn-xs btn-danger">
														<i class="glyphicon	glyphicon-trash" data-toggle="tooltip"
														data-placement="left" title="Borrar Seleccionados"></i>&nbsp;
												</a></li>
											</ul>
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
</div>

<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/BroadcastService.js"></script>

<script>
	$(document).ready(function() {

		$("#nav li").removeClass("open");
		$("li.has_sub ul li").removeClass("current");
		$("#sidebarCatalogs").addClass("open");
		$("#optBroadcastRegister").addClass("current");

		BroadcastService.init();

		return;
	});
</script>
