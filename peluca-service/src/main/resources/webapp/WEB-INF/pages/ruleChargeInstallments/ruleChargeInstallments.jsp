<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<div id="commonsModal">
</div> 

<div id="modalAddRule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
             <div class="modal-header">
               	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
               	<h4 class="modal-title">Regla de Cobranza por Cuotas</h4>
             </div>
             <div class="modal-body">
             	<div class="container-fluid">
       				<form id="frmAddRuleCharge" role="form">
           				<input type="hidden" name="ruleChargeFlag" id="ruleChargeFlag" value="A">
           				<input type="hidden" name="ruleChargeId" id="ruleChargeId" value="">
               			<div class="row">
               				<div class="col-md-2">
               					&nbsp;
               				</div>
              				<div class="col-md-8">
		               			<h4>Entrada</h4>
              					<div class="panel panel-default">
        							<div class="panel-body">
        								<div class="row">
                    						<div class="form-group">
												<label class="col-md-4 control-label" for="ciLegalEntity">Entidad Legal</label>
												<div class="col-md-8">
													<select id="ciLegalEntity" class="form-control" required>
													</select>
												</div>
											</div>
                    					</div>
                    					<div class="row">
                    						&nbsp;
                    					</div>
                    					<div class="row">
                    						<div class="form-group">
												<label class="col-md-4 control-label" for="ciMerchantId">Merchant</label>
												<div class="col-md-8">
													<select id="ciMerchantId" class="form-control" required> 
													</select>
												</div>
											</div>
                    					</div>
                    					<div class="row">
                    						&nbsp;
                    					</div>
										<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="ciDateFrom">Fecha Desde</label>
												<div class="col-md-8">
													<div id="ciDateFrom" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
		                        	      		</div>
											</div>																			
										</div>
										<div class="row">
                     						&nbsp;
                     					</div>
                     					<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="ciDateTo">Fecha Hasta</label>
												<div class="col-md-8">
													<div id="ciDateTo" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
		                        	      		</div>
											</div>																			
										</div>
                     					<div class="row">
	                      					&nbsp;
	                      				</div>	
                     					<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="ciInstallments">Cuotas</label>
												<div class="col-md-3">
													<input id="ciInstallments" class="form-control" type="number" required min="0">
												</div>
											</div>																			
										</div>
										<div class="row">
		                      					&nbsp;
		                      			</div>
              						</div>
              					</div>
              				</div>
              			</div>
       					<div class="row">
       						<div class="col-md-2">
               					&nbsp;
               				</div>
       						<div class="col-md-8">
       							<h4>Salida</h4>
               					<div class="panel panel-default">
					 				<div class="panel-body">
						   				<div class="form-group">
											<label class="col-md-4 control-label" for="ciDivideOnInstallments">Divide en cuotas?</label>
											<div class="col-md-8">
												<select id="ciDivideOnInstallments" class="form-control" required>
													<option value="false">NO</option>
													<option value="true">SI</option>
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
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
				<button id="btnAddRuleCharge" type="button" class="btn btn-success roleable ESCRITURA"><i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar</button>
			</div>
      	</div>
	</div>
</div>

<div id="modalImport" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg exportar">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Carga Masiva - Entidades Legales Cobro Ficticio</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					         <form enctype="multipart/form-data" id="file-upload-form">
							   <input type="hidden" id="xlsLanguage" name="xlsLanguage" value="ES">
						        <div class="row fileupload-buttonbar">
						            <div id="fileupload-bar" class="col-lg-12">
						                <input type="text" class="form-control" id="filenameRuleSellType" placeholder="" name="filename" value="" style="width:300px; float:left; margin-right: 2px;" disabled>
						                <span class="btn btn-success fileinput-button" id="sellTypeBulkSearchButton">
						                    <i class="glyphicon glyphicon-plus"></i>
						                    <span>Browse</span>
						                </span>
						                 <span class="btn btn-info upload" id="uploadButtonRuleSellType" style="display: none;">
						                    <i class="glyphicon glyphicon-upload"></i>
						                    <span>Upload</span>
						                </span>
						                 <input id="ruleSellPointfileupload" type="file" multiple="" name="file" style="display: none;">
						            </div>
						        </div>
					     	</form>	
					     	
					     		<div class ="row">
					     		&nbsp;
					     		</div>
								  <div class="panel panel-default" id ="ruleSellPointResult" style ="display:none">
								           <div class="panel-heading">
								               <h6 class="panel-title"><i class="glyphicon glyphicon-chevron-right"></i>&nbsp; Resultados de Carga
								               </h6>
						            		</div>
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                 	<div class="table-responsive"> 
						                      <table class="table" id="ruleSellPointResultTable">
						                          <thead>
													<tr>
													  <th class="centered"><h4>Entidad Legal</h4></th>
													  <th class="centered"><h4>Merchant</h4></th>
													  <th class="centered"><h4>Fecha Desde</h4></th>
													  <th class="centered"><h4>Fecha Hasta</h4></th>
													  <th class="centered"><h4>Cuotas</h4></th>
													  <th class="centered"><h4>Divide en Cuotas?</h4></th>
													</tr>
												</thead>
						                          <tbody id ="ruleSellPoint_Result_Upload">
						                          
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

<div id="modalRuleChargeAuditedTable" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg auditoria">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Auditoria Regla Cobranza por Cuotas</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					   		<div class="panel panel-default" id="auditedResult">
						            <div class="panel-body">     
						                <div class="container-fluid"> 
						               	 <div class="table-responsive">   
						                      <table class="table" id="auditedRuleChargeTable">
						                          <thead>
						                            <tr>
						                            	<th class="centered"><h4>Id</h4></th>
						                          		<th class="centered"><h4>Revisi&oacute;n</h4></th>
						                            	<th class="centered"><h4>Usuario</h4></th>
						                            	<th class="centered"><h4>Tipo Revisi&oacute;n</h4></th>
						                            	<th class="centered"><h4>Fec Revisi&oacute;n</h4></th>
						                            	<th class="centered"><h4>Entidad Legal</h4></th>
						                              	<th class="centered"><h4>Merchant</h4></th>
						                              	<th class="centered"><h4>Fecha Desde</h4></th>
						                              	<th class="centered"><h4>Fecha Hasta</h4></th>
						                              	<th class="centered"><h4>Cuotas</h4></th>
						                              	<th class="centered"><h4>Divide en Cuotas?</h4></th>
						                            </tr>
						                          </thead>
						                          <tbody id ="auditedRuleChargeTableBody">
						                          
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

<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> Regla - Cobranza por Cuotas
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Inicio</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Regla - Cobranza por Cuotas</a>
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
									<form id="frmRuleChargeExport" role="form" method="POST" enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
									</form>
									<ul class="list-inline RULE_CHARGE">
										<li>
											<i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda de Cobranza por Cuotas
										</li>

										<tiles:insertAttribute name="editButtons"/>

									</ul>
									</div>
									
									
									<div class="widget-icons pull-right">
											
											<button id="aproveSignal" class="btn btn-link btn-sm" title="info" style="display: none;color:red;">
												<i class="glyphicon glyphicon-exclamation-sign"></i>
											</button>
											
											<button  onclick="location.href='${pageContext.request.contextPath}/app/html/rule-charge-pending'" class="btn btn-info btn-xs" title="Version Pendiente">
												<i class="fa fa-share"></i> ir a Pendiente de Activacion
											</button>
											
											<button  onclick="location.href='${pageContext.request.contextPath}/app/html/rule-charge-active'" class="btn btn-success btn-xs" title="Version Activa">
												<i class="fa fa-reply-all fa-flip-horizontal" aria-hidden="true"></i> ir a Version Activa
											</button>
									
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
								</div>

								<tiles:insertAttribute name="ruleStateMessageRibbon" />

								<div class="widget-content">
									<div class="padd">

										<br />
										<!-- Form starts.  -->
										<form id="frmFilterRuleCharge" class="form-horizontal" role="form">

											<div class="form-group">
												<label class="col-md-1 control-label">Entidad Legal</label>
												<div class="col-md-2">
													<select id="filterCiLegalEntity" class="form-control">
														<option value="">Seleccione una opci&oacute;n</option>
													</select>
												</div>
												<label class="col-md-1 control-label">Merchant</label>
												<div class="col-md-2">
													<select id="filterCiMerchantId" class="form-control">
													</select>
												</div>
												<label class="col-md-1 control-label">Cuotas</label>
												<div class="col-md-1">
													<input type="text" id="filterCiInstallments" class="form-control">
												</div>
												<div class="col-md-1 clearfix">
													
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-1 control-label">Fecha Desde</label>
												<div class="col-md-2">
													<div id="filterCiDateFrom" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
												</div>
												<label class="col-md-1 control-label">Fecha Hasta</label>
												<div class="col-md-2">
													<div id="filterCiDateTo" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
												</div>
												<label class="col-md-1 control-label">Divide en Cuotas?</label>
												<div class="col-md-2">
													<select id="filterCiDivideOnInstallments" class="form-control">
														<option value="" selected>Seleccione una opci&oacute;n</option>
														<option value="false">No</option>
														<option value="true">Si</option>
													</select>
												</div>
												<div class="col-md-1 clearfix">
													&nbsp;
												</div>
											</div>
											<div class="form-group">
												<div class="row">
													&nbsp;
												</div>
											</div>
											<div class="form-group">
												<div class="col-md-offset-1 col-md-8">
													<button id="btnCiSearch" type="button" class="btn btn-primary">
														<i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
													</button>
													<button id="btnCiReset" type="reset" class="btn btn-warning">
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
										<i class="glyphicon glyphicon-th-list"></i>&nbsp;Cobranza por Cuotas &nbsp;&nbsp;
													
									</div>
									
									<div class="pull-left Edition">
											<button id="btnCiRemoveAll" href="javascript:void(0);" class="btn btn-xs btn-danger roleable ESCRITURA">
												<i class="glyphicon	glyphicon-trash" data-toggle="tooltip" data-placement="left" title="Borrar Seleccionados"></i>&nbsp;
											</button>
									</div>
									
									<div class="col-md-2">
									<i><b><button id="labelSelectAll" class="btn btn-link btn-xs" style="display:none;"><h4 id="allCheckText">marcar</h4></button></b></i>
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
												<table cellpadding="0" cellspacing="0" border="0" id="tSpResult" width="100%">
													<thead>
														<tr style="font-weight:bold;">
															<th class="centered"><div><input type="checkbox" id="spSelectAll" style="cursor:pointer;" title="Seleccionar todos ..."></div></th>
															<th class="centered">Entidad Legal TaxpayerId</th>
															<th class="centered">Entidad Legal Descripci&oacute;n</th>
							                              	<th class="centered">Merchant</th>
							                              	<th class="centered">Fecha Desde</th>
							                              	<th class="centered">Fecha Hasta</th>
							                              	<th class="centered">Cuotas</th>
							                              	<th class="centered">Divide en Cuotas?</th>
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
									<div class="row">
										
									</div>
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
<script src="${pageContext.request.contextPath}/app/public/js/app/service/rules/RuleChargeService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/rules/RuleChargeUpload.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>

<script>
	
	$(document).ready(
		function(){
			
			$("#nav li").removeClass("open");
			$("li.has_sub ul li").removeClass("current");
			$("#sidebarRules").addClass("open");
			$("#optRuleCharge").addClass("current");
			RuleChargeService.init();
			RuleChargeUpload.init();

			$('#ciDateFrom').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			$('#ciDateTo').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			$('#filterCiDateFrom').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			$('#filterCiDateTo').datetimepicker({
		      	pickTime: false,
		      	autoclose: true
		    });
			
			 if(window.location.href.indexOf('#modalCommentRule') != -1) {
			      $('#modalCommentRule').modal('show');
			    }
			 
			return;
		}
	);

</script>

<script id="rowRuleChargeSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
        
        <td class="centered"><h4>{{dto.legal_entity_description}}</h4></td>
		<td class="centered"><h4>{{dto.merchant_charge_description}}</h4></td>
		<td class="centered"><h4>{{dto.date_from}}</h4></td> 
        <td class="centered"><h4>{{dto.date_to}}</h4></td> 
		<td class="centered"><h4>{{dto.installments}}</h4></td>
		<td class="centered"><h4>{{dto.divide_on_installments}}</h4></td>
       
     </tr>
    {{/each}}
</script>

<script id="rowRuleChargeAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = "{{id}}" class=" centered">
		<td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
		<td class='centered'><h4>{{username}}</h4></td>
		<td class='centered'><h4>{{rev_type}}</h4></td> 
        <td class='centered'><h4>{{rev_date}}</h4></td> 
		<td class='centered'>{{dto.legal_entity_description}}</td>
		<td class='centered'>{{dto.merchant_charge_id}}</td>
		<td class='centered'>{{dto.date_from}}</td> 
        <td class='centered'>{{dto.date_to}}</td> 
		<td class='centered'>{{dto.installments}}</td>
		<td class='centered'>{{dto.divide_on_installments}}</td>
     </tr>
    {{/each}}
</script>
