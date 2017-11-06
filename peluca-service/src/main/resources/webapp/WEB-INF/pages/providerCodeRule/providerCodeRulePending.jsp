
<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left" id="headerPageVersion">
		<i class="fa fa-file-o"></i><span>Regla Codigo Proveedores para Vuelos Version Pendiente</span>
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Inicio</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Regla Codigo Proveedores para Vuelos Version Pendiente</a>
	</div>

	<div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter PROVIDER_CODE">
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
										<ul class="list-inline">
											<li><i class="glyphicon glyphicon-th-list"></i>&nbsp;C&oacute;digo Proveedores para Vuelos Pendientes de Activacion &nbsp;</li>

											<li>
												<button id="btnMakeComment"
													class="btn btn-primary btn-sm"
													title="Comentar">
													<i class="fa fa-comments"></i>
												</button>
											</li>

										</ul>
									</div>
									<div class="widget-icons pull-right">

										<button id="btnBackToEdit"
											onclick="location.href='${pageContext.request.contextPath}/app/html/provider-code'"
											class="btn btn-warning btn-xs" title="Volver a Edicion">
											<i class="fa fa-reply"></i> ir a Edicion
										</button>

										<button id="btnGoToActive"
											onclick="location.href='${pageContext.request.contextPath}/app/html/provider-code-active'"
											class="btn btn-success btn-xs" title="ir a Activa">
											<i class="fa fa-share"></i> ir a Version Activa
										</button>

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
															<th class="centered">Proveedor Vuelo</th>
															<th class="centered">Aerol&iacute;nea</th>
															<th class="centered">Tipo de Vuelo</th>
															<th class="centered">Tipo de Evento</th>
															<th class="centered">Pa&iacute;s Site</th>
															<th class="centered">Item Vuelo</th>
															<th class="centered">Conciliaci&oacute;n Vuelo</th>
															<th class="centered">Version</th>
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
								<div class="widget-foot"></div>
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
	src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>
<script
	src="${pageContext.request.contextPath}/app/public/js/app/service/rules/ProviderCodeRulePendingService.js"></script>

<script>
	$(document).ready(function() {

		$("#nav li").removeClass("open");
		$("li.has_sub ul li").removeClass("current");
		$("#sidebarRules").addClass("open");
		$("#optProviderCodeRule").addClass("current");
		ProviderCodePendingService.init();
		$('#spEnabledDate').datetimepicker({
			pickTime : false,
			autoclose : true
		});

		return;
	});
</script>

<script id="rowSellTypeVersionSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
		<td class="centered"><h4>{{version}}</h4></td>
        <td class="centered"><h4>{{user_aproved}}</h4></td>
		<td class="centered"><h4>{{release_version_date}}</h4></td> 
		<td class="centered"><h4>{{rule_name}}</h4></td>
        <td class="centered"><h4>{{rules_afected}}</h4></td> 
		<td  style="padding-top : 13px;"> 
					<span id="showVersionAudited_{{version}}" data-code="{{version}}">
     		       			<a class='roleable ESCRITURA' href='javascript:void(0);' title='Auditoria'>
     		       			<i class='glyphicon glyphicon-eye-open'></i>
							</a>
					</span>						
					&nbsp;
					<span id="showVersion_{{version}}" data-code="{{version}}">
						<a href='javascript:void(0);' title="Detalle">
						<i class="glyphicon glyphicon-list-alt"></i>
						</a>
					</span>
					&nbsp;
					<span id="revertVersion_{{version}}" data-code="{{version}}" class="roleable APROBADOR">
						<a href='javascript:void(0);' title="Volver a version">
						<i class="glyphicon glyphicon-repeat"> </i>
						</a>
					</span>
		</td>
     </tr>
    {{/each}}
</script>