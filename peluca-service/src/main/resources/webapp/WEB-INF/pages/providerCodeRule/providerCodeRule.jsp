<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<div id="modalAddRule" class="modal fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-remove"></i>
				</button>
				<h4 class="modal-title">Regla Codigo Proveedores Para Vuelo</h4>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<form id="frmAddRuleSellType" role="form">
						<input type="hidden" name="ruleSellTypeFlag" id="ruleSellTypeFlag"
							value="A"> <input type="hidden" name="ruleSellTypeId"
							id="ruleSellTypeId" value="">
						<h4>Entrada</h4>
						<div class="row">
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spFlightProvider">Proveedor Vuelo</label>
												<div class="col-md-8">
													<select id="spFlightProvider" class="form-control" multiple="multiple" 
														required>
													</select> 
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spAirline">Aerol&iacute;nea</label>
												<div class="col-md-8">
													 <select id="spAirline" class="form-control"
														required>
													</select>
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spFlightType">Tipo de Vuelo</label>
												<div class="col-md-8">
													<select id="spFlightType" class="form-control" required multiple="multiple">
														<option value="DOMESTIC">Dom&eacute;stico</option>
														<option value="INTERNATIONAL">Internacional</option>
													</select> 
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label"
													for="spEventType">Tipo de Evento</label>
												<div class="col-md-8">
													<select id="spEventType" class="form-control" required multiple="multiple"></select> 
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spCountrySite">Pa&iacute;s Site</label>
												<div class="col-md-8">
													 <select id="spCountrySite" class="form-control" required>
													</select>
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spFlightItem">Item de Vuelo</label>
												<div class="col-md-8">
													 <select id="spFlightItem" class="form-control" required multiple="multiple">
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row">&nbsp;</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<h4>Salida</h4>
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="form-group">
											<label class="col-md-4 control-label" for="spFlightConciliation">Conciliacion Vuelo</label>
											<div class="col-md-8">
												<select id="spFlightConciliation" class="form-control" required>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
				</button>
				<button id="btnAddSellType" type="button"
					class="btn btn-success roleable ESCRITURA">
					<i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar
				</button>
			</div>
		</div>
	</div>
</div>

<div id="modalImport" class="modal fade bs-example-modal-lg"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-remove"></i>
				</button>
				<h4 class="modal-title">Carga Masiva - C&oacute;digo de Proveedor</h4>
			</div>
			<div class="modal-body">

				<form enctype="multipart/form-data" id="file-upload-form">
					<input type="hidden" id="xlsLanguage" name="xlsLanguage" value="ES">
					<div class="row fileupload-buttonbar">
						<div id="fileupload-bar" class="col-lg-12">
							<input type="text" class="form-control" id="filenameRuleSellType"
								placeholder="" name="filename" value=""
								style="width: 300px; float: left; margin-right: 2px;" disabled>
							<span class="btn btn-success fileinput-button"
								id="sellTypeBulkSearchButton"> <i
								class="glyphicon glyphicon-plus"></i> <span>Browse</span>
							</span> <span class="btn btn-info upload" id="uploadButtonRuleSellType"
								style="display: none;"> <i
								class="glyphicon glyphicon-upload"></i> <span>Upload</span>
							</span> <input id="ruleSellPointfileupload" type="file" multiple=""
								name="file" style="display: none;">
						</div>
					</div>
				</form>

				<div class="row">&nbsp;</div>
				<div class="panel panel-default" id="ruleSellPointResult"
					style="display: none">
					<div class="panel-heading">
						<h6 class="panel-title">
							<i class="glyphicon glyphicon-chevron-right"></i>&nbsp;
							Resultados de Carga
						</h6>
					</div>
					<div class="panel-body">
						<div class="container-fluid">
							<div class="table-responsive">
							<table class="table" id="ruleSellPointResultTable">
								<thead>
									<tr>
										<th><h4>Proveedor Vuelo</h4></th>
										<th><h4>Aerol&iacute;nea</h4></th>
										<th><h4>Tipo de Vuelo</h4></th>
										<th><h4>Tipo de Evento</h4></th>
										<th><h4>Pa&iacute;s Site</h4></th>
										<th><h4>Item Vuelo</h4></th>
										<th><h4>Conciliacion Vuelo</h4></th>
									</tr>
								</thead>
								<tbody id="ruleSellPoint_Result_Upload">

								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
				</button>
			</div>
		</div>
	</div>
</div>

<div id="modalRuleSellTypeAuditedTable"
	class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg auditoria">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-remove"></i>
				</button>
				<h4 class="modal-title">Auditoria Regla C&oacute;digo de Proveedor</h4>
			</div>
			<div class="modal-body">

				<div class="panel panel-default" id="auditedResult">
					<div class="panel-body">
						<div class="container-fluid">
							<div class="table-responsive">
								<table class="table" id="auditedRuleSellTypeTable">
									<thead>
										<tr>
											<th><h4>Id</h4></th>
											<th><h4>Revisi&oacute;n</h4></th>
											<th><h4>Usuario</h4></th>
											<th><h4>Tipo Revisi&oacute;n</h4></th>
											<th><h4>Fec Revisi&oacute;n</h4></th>
											<th><h4>Proveedor Vuelo</h4></th>
											<th><h4>Aerol&iacute;nea</h4></th>
											<th><h4>Tipo de Vuelo</h4></th>
											<th><h4>Tipo de Evento</h4></th>
											<th><h4>Pa&iacute;s Site</h4></th>
											<th><h4>Item Vuelo</h4></th>
											<th><h4>Conciliacion Vuelo</h4></th>
										</tr>
									</thead>
									<tbody id="auditedRuleSellTypeTableBody">

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>


			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> Regla - C&oacute;digo Proveedores para Vuelo
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Inicio</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Regla
			- C&oacute;digo Proveedores para Vuelo</a>
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
										<form id="frmRuleSellPointExport" role="form" method="POST"
											enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
										</form>
										<ul class="list-inline PROVIDER_CODE">
											<li><i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda
												de Codigo Proveedor</li>
											<tiles:insertAttribute name="editButtons"/>
										</ul>
									</div>
									<div class="widget-icons pull-right">
										<button id="aproveSignal" class="btn btn-link btn-sm"
											title="info" style="display: none; color: red;">
											<i class="glyphicon glyphicon-exclamation-sign"></i>
										</button>

										<button
											onclick="location.href='${pageContext.request.contextPath}/app/html/provider-code-pending'"
											class="btn btn-info btn-xs" title="Version Pendiente">
											<i class="fa fa-share"></i> ir a Pendiente de Activacion
										</button>

										<button
											onclick="location.href='${pageContext.request.contextPath}/app/html/provider-code-active'"
											class="btn btn-success btn-xs" title="Version Activa">
											<i class="fa fa-reply-all fa-flip-horizontal"
												aria-hidden="true"></i> ir a Version Activa
										</button>

										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
								</div>

								<tiles:insertAttribute name="ruleStateMessageRibbon" />

								<div class="widget-content" id="filteredSearch" style="display:none;">
									<div class="padd">

										<br />
										<!-- Form starts.  -->
										<form id="frmFilterRuleSellPoint" class="form-horizontal"
											role="form">

											<div class="form-group">
												<label class="col-md-1 control-label">Proovedor Vuelo</label>
												<div class="col-md-2">
													<select id="filterSpFlightProvider" class="form-control">
													</select>
												</div>
												<label class="col-md-1 control-label">Aerol&iacute;nea</label>
												<div class="col-md-2">
													<select id="filterSpAirline" class="form-control">
														<option value="" selected>Seleccione una
															opci&oacute;n</option>
														<option value="ALL">*</option>
														<option value="EXPEDIA">expedia</option>
													</select>
												</div>
												<label class="col-md-1 control-label">Tipo
													Vuelo</label>
												<div class="col-md-2">
													<select id="filterSpFlightType" class="form-control">
														<option value="" selected>Seleccione una
															opci&oacute;n</option>
														<option value="DOMESTIC">Dom&eacute;stico</option>
														<option value="INTERNATIONAL">Internacional</option>
													</select>
												</div>
												<div class="col-md-1 clearfix">&nbsp;</div>
											</div>
											<div class="form-group">
												<label class="col-md-1 control-label">Tipo de Evento</label>
												<div class="col-md-2">
													<select id="filterSpEventType" class="form-control">
														
													</select>
												</div>
												<label class="col-md-1 control-label">Conciliaci&oacute;n Vuelo</label>
												<div class="col-md-2">
													<select id="filterSpFlightConciliation" class="form-control">
													</select>
												</div>
												<label class="col-md-1 control-label">Pa&iacute;s Site</label>
												<div class="col-md-2">
													<select id="filterSpCountrySite" class="form-control">
													</select>
												</div>
												<div class="col-md-1 clearfix">&nbsp;</div>
											</div>
											<div class="form-group">
												<label class="col-md-1 control-label">Item de Vuelo</label>
												<div class="col-md-2">
													<select id="filterSpFlightItem" class="form-control">
													</select>
												</div>
												<div class="col-md-1 clearfix">&nbsp;</div>
											</div>
											<div class="form-group">
												<div class="row">&nbsp;</div>
											</div>
											<div class="form-group">
												<div class="col-md-offset-1 col-md-8">
													<button id="btnSpSearch" type="button"
														class="btn btn-primary">
														<i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
													</button>
													<button id="btnSpReset" type="reset"
														class="btn btn-warning">
														<i class="glyphicon glyphicon-trash"></i>&nbsp;Limpiar
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div class="widget-foot">
									<!-- Footer goes here -->
									<div class="container">
										<div class="row">
											<div class="col-md-offset-8 col-md-4"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<!-- 	<div class="col-md-1">&nbsp;</div> -->
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">

								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;C&oacute;digo Proveedores &nbsp;&nbsp;

									</div>
									<div class="pull-left Edition">
										<a id="btnSpRemoveAll" href="javascript:void(0);"
											class="btn btn-xs btn-danger roleable ESCRITURA"> <i
											class="glyphicon	glyphicon-trash" data-toggle="tooltip"
											data-placement="left" title="Borrar Seleccionados"></i>&nbsp;
										</a>
									</div>

									<div class="col-md-2">
										<i><b><button id="labelSelectAll"
													class="btn btn-link btn-xs" style="display: none;">
													<h4 id="allCheckText">marcar</h4>
												</button></b></i>
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

												<table cellpadding="0" cellspacing="0" border="0"
													id="tSpResult" width="100%">
													<thead>
														<tr style="font-weight: bold;">
															<th class="centered"><div>
																	<input type="checkbox" id="spSelectAll"
																		style="cursor: pointer;" title="Seleccionar todos ...">
																</div></th>
															<th class="centered">Proveedor Vuelo</th>
															<th class="centered">Aerol&iacute;nea</th>
															<th class="centered">Tipo de Vuelo</th>
															<th class="centered">Tipo de Evento</th>
															<th class="centered">Pa&iacute;s Site</th>
															<th class="centered">Item Vuelo</th>
															<th class="centered">Conciliacion Vuelo</th>
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
									<div class="row"></div>
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
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/rules/ProviderCodeRuleService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/rules/ProviderCodeRuleUpload.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>

<script>
	$(document).ready(function() {

		$("#nav li").removeClass("open");
		$("li.has_sub ul li").removeClass("current");
		$("#sidebarRules").addClass("open");
		$("#optProviderCodeRule").addClass("current");
		
		ProviderCodeRuleService.init();
		ProviderCodeRuleUpload.init();

		$('#spEnabledDate').datetimepicker({
			pickTime : false,
			autoclose : true
		});

		if (window.location.href.indexOf('#modalCommentRule') != -1) {
			$('#modalCommentRule').modal('show');
		}

		return;
	});
</script>

<script id="rowSellTypeSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
		<td class="centered">{{provider_code_rule_dto.flight_provider}}</td>
        <td class="centered">{{provider_code_rule_dto.airline}}</td>
		<td class="centered">{{provider_code_rule_dto.flight_type}}</td>
		<td class="centered">{{provider_code_rule_dto.event_type}}</td>
		<td class="centered">{{provider_code_rule_dto.country_site}}</td>
		<td class="centered">{{provider_code_rule_dto.flight_item_description}}</td>
		<td class="centered">{{provider_code_rule_dto.flight_conciliation}}</td>
     </tr>
    {{/each}}

</script>

<script id="rowSellTypeAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = "{{id}}" class=" centered">
		<td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
		<td class='centered'><h4>{{username}}</h4></td>
		<td class='centered'><h4>{{rev_type}}</h4></td>
        <td class='centered'><h4>{{rev_date}}</h4></td>
		<td class='centered'>{{dto.flight_provider_description}}</td>
		<td class='centered'>{{dto.airline}}</td>
		<td class='centered'>{{dto.flight_type}}</td>
		<td class='centered'>{{dto.event_type_description}}</td>
		<td class='centered'>{{dto.country_site}}</td>
		<td class='centered'>{{dto.flight_item_description}}</td>
		<td class='centered'>{{dto.flight_conciliation}}</td>
     </tr>
    {{/each}}
</script>
