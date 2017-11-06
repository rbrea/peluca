<div id="modalFullAuditedVersion" class="modal fade bs-example-modal-lg" tabindex="-2" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg ruleOldVersion auditoria">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 id= "versionRuleTitle2" class="modal-title">Version Regla N�</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					   		<div class="panel panel-default" id="oldVersionResult">
								           
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                    <div class="table-responsive">   
						                      <table class="table" id="RuleFullVersionTable">
						                          <thead>
						                            <tr>
						                            	<th class="centered">Id</th>
						                            	<th class="centered">Revisi�n</th>
						                            	<th class="centered">Usuario</th>
						                            	<th class="centered">Tipo Revisi�n</th>
						                            	<th class="centered">Fec Revisi�n</th>	
						                             	<th class="centered">Entidad Legal OM</th>
							                            <th class="centered">Entidad Legal ARRF</th>
							                            <th class="centered">Fecha de incio</th>							                              	
														<th class="centered">Cobro Ficticio</th>
														<th class="centered">Version</th>
						                            </tr>
						                          </thead>
						                          <tbody id ="RuleFullVersionTableBody">
						                          
						                          </tbody>
						                        </table>
						                        </div>
						                  </div>
						          </div>
								   </div>	
						    	
						    			
                  		</div>
                  		<div class="modal-footer">
                  			
                    		<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
                  		</div>
                	</div>
			</div>
</div>

<div id="modalLegalEntytyOMPPVersion" class="modal fade bs-example-modal-lg" tabindex="-2" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg ruleOldVersion">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 id= "versionRuleTitle" class="modal-title">Version Regla N�</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					   		<div class="panel panel-default" id="oldVersionResult">
								           
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                    <div class="table-responsive">   
						                      <table class="table" id="RuleVersionTable">
						                          <thead>
						                            <tr>
						                             	<th class="centered">Entidad Legal OM</th>
							                            <th class="centered">Entidad Legal ARRF</th>
							                            <th class="centered">Fecha de incio</th>							                              	
														<th class="centered">Cobro Ficticio</th>
						                            </tr>
						                          </thead>
						                          <tbody id ="RuleVersionTableBody">
						                          
						                          </tbody>
						                        </table>
						                        </div>
						                  </div>
						          </div>
								   </div>	
						    	
						    			
                  		</div>
                  		<div class="modal-footer">
                  			<button id="BtnRevertVersion" type="button" class="btn btn-success roleable APROBADOR" data-version=""><i class="glyphicon glyphicon-repeat"></i>&nbsp;Volver a esta version</button>
                  		
                    		<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
                  		</div>
                	</div>
			</div>
</div>

<div id="modalLegalEntytyOMPPVersionList" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Versiones Anteriores</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					   		<div class="panel panel-default" id="oldVersionResult">
								           
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                      <table class="table" id="VersionListTable">
						                          <thead>
						                            <tr> 
						                            	<th><h4>N� Version</h4></th>
						                            	<th><h4>Usuario Responable</h4></th>
						                            	<th><h4>Fecha Release Version</h4></th>
						                            	<th><h4>Nombre Regla</h4></th>
						                            	<th><h4>Cant. Reglas lanzadas</h4></th>
							                            <th><h4>Acciones</h4>
						                            </tr>
						                          </thead>
						                          <tbody id ="VersionListTableBody">
						                          
						                          </tbody>
						                        </table>
						                  </div>
						          </div>
								   </div>	
						    	
						    			
                  		</div>
                  		<div class="modal-footer">
                    		<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
                  		</div>
                	</div>
			</div>
</div>


<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left" id="headerPageVersion">
		<i class="fa fa-file-o"></i><span>Entidades Legales Cobro Ficticio Activas</span>
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Inicio</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Entidades Legales Cobro Ficticio Activas</a>
	</div>

	<div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter FICTIONAL_CHARGE">
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
										<form id="frmFictionalChargeExport" role="form" method="POST" enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
										</form>
										<ul class="list-inline">
											<li>
												<i class="glyphicon glyphicon-th-list"></i>&nbsp;Entidades Legales Cobro Ficticio Activas &nbsp;
											</li>
											<li>
												<button id="btnShowVersionList" class="btn btn-info btn-sm" title="Versiones Antiguas">
													<i class="glyphicon glyphicon-list-alt"></i>
												</button>
											</li>
											<li>
												<button id="btnFictionalChargeExport" class="btn btn-info btn-sm" title="Exportar">
													<i class="glyphicon glyphicon-cloud-download"></i>
												</button>
											</li>
											<li>
												<button id="btnMakeComment" class="btn btn-primary btn-sm" title="Comentar">
													<i class="fa fa-comments" ></i>	
												</button>
											</li>
											<li>
												<button id="btnFictionalActiveAudited" class="btn btn-danger btn-sm roleable LECTURA" title="Auditoria">
													<i class="glyphicon glyphicon-eye-open" ></i>	
												</button>
											</li>
											<li>
												<button id="btnMigration" class="btn btn-warning btn-sm roleable APROBADOR" title="Enviar a Producci�n">
													<i class="glyphicon glyphicon-plane"></i>	
												</button>
											</li>
										</ul>	
									</div>
									<div class="widget-icons pull-right">
									
										<button  id ="btnBackToEdit" onclick="location.href='${pageContext.request.contextPath}/app/html/fictional-charge'" class="btn btn-warning btn-xs" title="Volver a Edicion">
												<i class="fa fa-reply-all"></i> ir a Edicion
										</button>
										
										<button  id ="btnBackToPending" onclick="location.href='${pageContext.request.contextPath}/app/html/fictional-charge-pending'" class="btn btn-info btn-xs" title="Volver a Edicion">
												<i class="fa fa-reply"></i> ir a Pendiente de Activacion
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
												<table cellpadding="0" cellspacing="0" border="0" id="tSpResult" width="100%">
													<thead>
														<tr style="font-weight:bold;">
															<th class="centered">Entidad Legal OM</th>
							                              	<th class="centered">Entidad Legal ARRF</th>
							                              	<th class="centered">Cobro Ficticio</th>	
							                              	<th class="centered">Fecha de inicio</th>							                              	
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
								<div class="widget-foot">

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

<script src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/rules/FictionalChargeActiveService.js"></script>



<script>
	
	$(document).ready(
		function(){
			
			$("#nav li").removeClass("open");
			$("li.has_sub ul li").removeClass("current");
			$("#sidebarRules").addClass("open");
			$("#optFictionalCharge").addClass("current");
 	  		FictionalChargeActiveService.init();
			$('#spEnabledDate').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			
			return;
		}
	);

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
				<!--	<span id="showVersionAudited_{{version}}" data-code="{{version}}">
     		       			<a class='roleable ESCRITURA' href='javascript:void(0);' title='Auditoria'>
     		       			<i class='glyphicon glyphicon-eye-open'></i>
							</a>
					</span>		--!>				
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


<script id="rowFictionalAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = "{{id}}" class=" centered">
		<td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
		<td class='centered'><h4>{{username}}</h4></td>
		<td class='centered'><h4>{{rev_type}}</h4></td> 
        <td class='centered'><h4>{{rev_date}}</h4></td> 

		<td class='centered'><h4>{{dto.legal_entity_omdesctiption}}</h4></td>
		<td class='centered'><h4>{{dto.legal_entity_arrfdesctiption}}</h4></td> 
		<td class='centered'><h4>{{dto.rule_start_date}}</h4></td>
		<td class='centered'><h4>{{dto.fictional_charge}}</h4></td>
		<td class='centered'><h4>{{dto.version}}</h4></td>
     </tr>
    {{/each}}
</script>


<script id="rowSellTypeUniqueVersionSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
		
		<td class='centered'><h4>{{dto.legal_entity_omdesctiption}}</h4></td>
		<td class='centered'><h4>{{dto.legal_entity_arrfdesctiption}}</h4></td>
        <td class='centered'><h4>{{dto.rule_start_date}}</h4></td> 
		<td class='centered'><h4>{{dto.fictional_charge}}</h4></td>
     </tr>
    {{/each}}
</script>
