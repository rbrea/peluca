<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<div id="modalAddRule" class="modal fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					<i class="glyphicon glyphicon-remove"></i>
				</button>
				<h4 class="modal-title">Entidades Legales OM PAD</h4>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<form id="frmAddRuleSellType" role="form">
						<input type="hidden" name="ruleSellTypeFlag" id="ruleSellTypeFlag"
							value="A"> <input type="hidden" name="ruleSellTypeId"
							id="ruleSellTypeId" value="">
						<h4>Entrada</h4>
						<div class="row">
							<div class="col-md-6">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spProductType">Tipo
													de Producto</label>
												<div class="col-md-8">
													<select id="spProductType" class="form-control"
														multiple="multiple" required>
													</select> <select id="spProductTypeUnique" class="form-control"
														required>
													</select>
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spCountrySite">Pa&iacute;s
													Site</label>
												<div class="col-md-8">
													<select id="spCountrySite" class="form-control"
														multiple="multiple" required>
													</select> <select id="spCountrySiteUnique" class="form-control"
														required>
													</select>
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>

									</div>
								</div>
								<div class="row">&nbsp;</div>
							</div>
							<div class="col-md-6">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label"
													for="spCountryDestiny">Pa&iacute;s Destino</label>
												<div class="col-md-8">
													<select id="spCountryDestiny" class="form-control" multiple="multiple"
														required>
													</select><select id="spCountryDestinyUnique" class="form-control"
														required>
													</select>
												</div>
											</div>
										</div>
										<div class="row">&nbsp;</div>
										<div class="row">&nbsp;</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="spSellType">Tipo
													de Venta</label>
												<div class="col-md-8">
													<select id="spSellType" class="form-control" required>
														<option value="" selected>Seleccione una
															opci&oacute;n</option>
													</select>
												</div>
											</div>
										</div>
										<br/>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<h4>Salida</h4>
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="form-group">
											<label class="col-md-4 control-label"
												for="leInvoicingLegalEntityType">Entidad Legal</label>
											<div class="col-md-8">
												<select id="leInvoicingLegalEntityType" class="form-control"
													required>
													<option value="">Seleccione una opci&oacute;n</option>
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
				<h4 class="modal-title">Carga Masiva - Entidades Legales OM PAD</h4>
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
										<th class="centered"><h4>Tipo Producto</h4></th>
										<th class="centered"><h4>Pa&iacute;s Site</h4></th>
										<th class="centered"><h4>Pa&iacute;s Destino</h4></th>
										<th class="centered"><h4>Tipo Venta</h4></th>
										<th class="centered"><h4>Entidad Legal</h4></th>
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
				<h4 class="modal-title">Auditoria Entidades Legales OM PAD</h4>
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
											<th><h4>Tipo Producto</h4></th>
											<th><h4>Pa&iacute;s Site</h4></th>
											<th><h4>Pa&iacute;s Destino</h4></th>
											<th><h4>Tipo Venta</h4></th>
											<th><h4>Entidad Legal</h4></th>
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
	<h2 class="pull-left OM_LEGAL_ENTITY_PAD">
		<i class="fa fa-file-o"></i> Entidades Legales OM PAD
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Inicio</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Entidades
			Legales OM PAD</a>
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
										<ul class="list-inline OM_LEGAL_ENTITY_PAD">
											<li><i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda
												de Entidades Legales OM PAD</li>
												
											<tiles:insertAttribute name="editButtons"/>
											
										</ul>
									</div>


									<div class="widget-icons pull-right">

										<button id="aproveSignal" class="btn btn-link btn-sm"
											title="info" style="display: none; color: red;">
											<i class="glyphicon glyphicon-exclamation-sign"></i>
										</button>

										<button id="btnGoToPending"
											onclick="location.href='${pageContext.request.contextPath}/app/html/om-legal-entity-pad-pending'"
											class="btn btn-info btn-xs" title="Version Pendiente">
											<i class="fa fa-share"></i> ir a Pendiente de Activacion
										</button>

										<button id="btnGoToActive"
											onclick="location.href='${pageContext.request.contextPath}/app/html/om-legal-entity-pad-active'"
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
												<div class="col-md-2">
													<label for="filterSpProductType" class="control-label">Tipo
														Producto</label>
													<div>
														<select id="filterSpProductType" class="form-control">
															<option value="">Seleccione una opci&oacute;n</option>
														</select>
													</div>
												</div>

												<div class="col-md-2">
													<label for="filterSpCountrySite" class="control-label">Pa&iacute;s
														Site</label>
													<div>
														<select id="filterSpCountrySite" class="form-control" multiple="multiple">
														</select>
													</div>
												</div>

												<div class="col-md-2">
													<label for="filterSpCountryDestiny" class="control-label">Pa&iacute;s Destino</label>
													<div>
														<select id="filterSpCountryDestiny" class="form-control" multiple="multiple">
														</select>
													</div>
												</div>

												<div class="col-md-2">
													<label for="filterSpSellType" class="control-label">Tipo
														Venta</label>
													<div>
														<select id="filterSpSellType" class="form-control">
															<option value="" selected>Seleccione una
																opci&oacute;n</option>
														</select>
													</div>
												</div>
												<div class="col-md-4">
													<label class="control-label" for="filterLegalEntity">Entidad Legal</label>
													<div>
														<select id="filterLegalEntity" class="form-control">
															<option value="" selected>Seleccione una opci&oacute;n</option>
														</select>
													</div>
												</div>


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
						<!-- <div class="col-md-1">&nbsp;</div> -->
					</div>
					<div class="row">
						<!-- 	<div class="col-md-1">&nbsp;</div> -->
						<div class="col-md-12" style="text-align: center;">
							<div class="widget wgreen">

								<div class="widget-head">
									<div class="pull-left">
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Entidades
										legales OM PAD &nbsp;&nbsp;
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
															<th class="centered">Tipo Producto</th>
															<th class="centered">Pa&iacute;s Site</th>
															<th class="centered">Pa&iacute;s Destino</th>
															<th class="centered">Tipo Venta</th>
															<th class="centered">Entidad Legal</th>
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
					<!-- <div class="col-md-1">&nbsp;</div> -->
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Matter ends -->

<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/model/LegalEntity.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/LegalEntityService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/rules/LegalEntityOmPADService.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/rules/LegalEntityOmPADUpload.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>


<script>
	$(document).ready(function() {

		$("#nav li").removeClass("open");
		$("li.has_sub ul li").removeClass("current");
		$("#sidebarRules").addClass("open");
		$("#optOmLegalEntityPAD").addClass("current");
		LegalEntityOmPADService.init();
		LegalEntityOmPADUpload.init();

		$('#spEnabledDate').datetimepicker({
			pickTime : false,
			autoclose : true
		});

		return;
	});
</script>

<script id="rowSellTypeSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
        
        <td class="centered"><h4>{{om_legal_entity_pad.product_type_description}}</h4></td>
		<td class="centered"><h4>{{om_legal_entity_pad.country_code_site}}</h4></td>
		<td class="centered"><h4>{{om_legal_entity_pad.country_code_destiny}}</h4></td> 
		<td class="centered"><h4>{{om_legal_entity_pad.sell_type_description}}</h4></td>
		<td class="centered"><h4>{{om_legal_entity_pad.legal_entity_description}}</h4></td>
		
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
		<td class='centered'>{{dto.product_type_description}}</td>
		<td class='centered'>{{dto.country_code_site}}</td>
		<td class='centered'>{{dto.country_code_destiny}}</td> 
		<td class='centered'>{{dto.sell_type_description}}</td>
		<td class='centered'>{{dto.legal_entity_description}}</td>
     </tr>
    {{/each}}
</script>
