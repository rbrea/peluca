<div id="modalAddLegalEntity" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Alta de Entidad Legal</h4>
                  		</div>
                  		<div class="modal-body">
                    		<div class="container-fluid">
                    			<div class="panel panel-default">
             													<div class="panel-body">
                      			<form id="frmAddLegalEntity" role="form">
                      				<input type="hidden" name="legalEntityFlag" id="legalEntityFlag" value="A">
                      				<input type="hidden" name="legalEntityId" id="legalEntityId" value="">
                      				<div class="row">
                      					<div class="form-group">
										<label class="col-md-4 control-label">Descripci&oacute;n</label>
										<div class="col-md-6">
											<input id="leDescription" type="text" class="form-control" placeholder="Descripci&oacute;n" required>
										</div>
									</div>
                      				</div>
                      				<div class="row">
                      					&nbsp;
                      				</div>
									<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Pa&iacute;s</label>
											<div class="col-md-6">
												<select id="leCountry" class="form-control" required>
													<option value="">Seleccione una opci&oacute;n</option>
												</select>
											</div>
										</div>																			
									</div>
									<div class="row">
	                      					&nbsp;
	                      			</div>
	                      			<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Taxpayer Id</label>
											<div class="col-md-6">
												<input id="leTaxpayerId" type="text" class="form-control" placeholder="Taxpayer Id" required>
											</div>
										</div>																			
									</div>
									<div class="row">
	                      					&nbsp;
	                      			</div>
									<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Es operacional?</label>
											<div class="col-md-6">
												<div class="sw-orange">
													<input id="leOperationalAdd" name="operational" type="checkbox" class="toggleBtn" checked />
												</div>
											</div>
										</div>																			
									</div>
									<div class="row">
	                      					&nbsp;
	                      			</div>
	                      			<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Es operativa Trx?</label>
											<div class="col-md-6">
												<div class="sw-orange">
													<input id="leOperationalTrxAdd" name="operationalTrx" type="checkbox" class="toggleBtn" checked />
												</div>
											</div>
										</div>																			
									</div>
									<div class="row">
	                      					&nbsp;
	                      			</div>
									<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Habilitado?</label>
											<div class="col-md-6">
												<div class="sw-orange">
													<input id="leEnabledLegalEntityAdd" name="enabledLegalEntity" type="checkbox" class="toggleBtn" checked />
												</div>
											</div>
										</div>																			
									</div>
									<div class="row">
	                      					&nbsp;
	                      				</div>
									<div class="row">
										<div class="form-group">
											<label class="col-md-4 control-label">Taxpayer Id Formateado</label>
											<div class="col-md-6">
												<input id="leTaxpayerIdFormatted" type="text" class="form-control" placeholder="Taxpayer Id Formateado" required>
											</div>
										</div>																			
									</div>
										<div class="row">
	                      					&nbsp;
	                      				</div>
									<div class="row">
											<div class="form-group">
												<label class="col-md-4 control-label" for="leDateFrom99">Fecha Inicio</label>
												<div class="col-md-8">
													<div id="leDateFrom99" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
		                        	      		</div>
											</div>																			
									</div>
										
                      			</form>
                      		</div>
                      	</div>
                    		</div>
                  		</div>
                  		<div class="modal-footer">
                    		<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
                    		<button id="btnAddLegalEntitySave" type="button" class="btn btn-success roleable ESCRITURA"><i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar</button>
                  		</div>
                	</div>
	</div>
</div>


<div id="modalCargaMasiva" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Carga Masiva - Entidades Legales</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					         <form enctype="multipart/form-data" id="file-upload-form">
							   <input type="hidden" id="xlsLanguage" name="xlsLanguage" value="ES">
						        <div class="row fileupload-buttonbar">
						            <div id="fileupload-bar" class="col-lg-12">
						                <input type="text" class="form-control" id="filename" placeholder="" name="filename" value="" style="width:300px; float:left; margin-right: 2px;" disabled>
						                <span class="btn btn-success fileinput-button" id ="searchButon">
						                    <i class="glyphicon glyphicon-plus"></i>
						                    <span>Browse</span>
						                </span>
						                 <span class="btn btn-info upload" id ="uploadButon" style="display: none;">
						                    <i class="glyphicon glyphicon-upload"></i>
						                    <span>Upload</span>
						                </span>
						                 <input id="LEfileupload" type="file" multiple="" name="file" style="display: none;">
						            </div>
						        </div>
					     	</form>	
					     	
					     		<div class ="row">
					     		&nbsp;
					     		</div>
								  <div class="panel panel-default" id ="LEBodyResult" style ="display:none">
								           <div class="panel-heading">
								               <h6 class="panel-title"><i class="glyphicon glyphicon-chevron-right"></i>&nbsp; Resultados de Carga
								               </h6>
						            		</div>
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                      <table class="table" id="resultTable">
						                          <thead>
						                            <tr>
						                              <th><h4>Codigo</h4></th>
						                              <th><h4>Descripcion</h4></th>
						                              <th><h4>Taxpayer ID</h4></th>
						                              <th><h4>Pais</h4></th>
						                              <th><h4>Operacional</h4></th>
						                              <th><h4>Operacional Trx</h4></th>
						                              <th><h4>Habilitado</h4></th>
						                              <th><h4>Taxpayer ID Formateado</h4></th>
						                              <th><h4>Fecha Inicio</h4></th>
						                            </tr>
						                          </thead>
						                          <tbody id ="LE_Result_Upload">
						                          
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

<div id="modalLEAuditedTable" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg auditoria">
		<div class="modal-content">
                  		<div class="modal-header">
                    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                    		<h4 class="modal-title">Auditoria Catalogo Entidades Legales</h4>
                  		</div>
                  		<div class="modal-body">
                  		
					   		<div class="panel panel-default" id ="auditedResult">
								           
						            <div class="panel-body">     
						                <div class="container-fluid">   
						                      <table class="table" id="auditedTable">
						                          <thead>
						                            <tr>
						                            	<th class='centered'><h4>CodRev</h4></th>
							                            <th class='centered'><h4>User</h4></th>
							                            <th class='centered'><h4>Action</h4></th>
							                            <th class='centered'><h4>Date</h4></th>
							                            <th class='centered'><h4>Codigo</h4></th>
							                            <th class='centered'><h4>Descripcion</h4></th>
							                            <th class='centered'><h4>Taxpayer ID</h4></th>
							                            <th class='centered'><h4>Pais</h4></th>
							                            <th class='centered'><h4>Operacional</h4></th>
							                            <th class='centered'><h4>Operacional Trx</h4></th>
							                            <th class='centered'><h4>Habilitado</h4></th>
							                            <th class='centered'><h4>Taxpayer ID Formateado</h4></th>
							                            <th class='centered'><h4>Fecha Inicio</h4></th>
						                            </tr>
						                          </thead>
						                          <tbody id ="auditedTableBody">
						                          
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

<div id="modalLeInfo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
       		<div class="modal-header">
         		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
         		<h4 class="modal-title">Informaci&oacute;n de Reglas Referenciadas</h4>
       		</div>
			<div class="modal-body">
				<div class="panel panel-default" id="infoLeContainer">
		            <div class="panel-body">     
		                <div class="container-fluid">   
							<table class="table table-striped" id="tLeInfo">
							</table>
		                  </div>
		          	</div>
				</div>	
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
			</div>
		</div>
	</div>
</div>


<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> ABM de Entidades Legales
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i
			class="fa fa-home"></i> Home</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">ABM
			de Entidades Legales</a>
	</div>

	<div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter LEGAL_ENTITY">
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
									<form id="frmLegalEntitySearch" role="form" action="${contextPath}index/xls" method=POST>
									</form>
									<ul class="list-inline">
										<li>
										<i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda
										de Entidades Legales &nbsp;
										</li>
						
										<li>
										<a id="btnAddLegalEntity" href="#modalAddLegalEntity" data-toggle="modal" class="btn btn-success btn-sm roleable ESCRITURA" title="Nuevo">
											<i class="glyphicon glyphicon-plus"></i>
										</a>
										</li>
										
										<li>
										<button id="btnLeLoad" type="reset" class="btn btn-primary btn-sm roleable ESCRITURA" data-toggle="modal" title="Importar">
											<i class="glyphicon glyphicon-cloud-upload"></i>
										</button>
										</li>
										
										<li>
										<button id="btnLeExport" class="btn btn-info btn-sm roleable LECTURA" disabled title="Exportar">
											<i class="glyphicon glyphicon-cloud-download"></i>
										</button>
										</li>
										<li>
										<button id="btnLeInfo" class="btn btn-warning btn-sm" title="Ver Reglas Referenciadas" data-toggle="modal" data-target="#modalLeInfo">
											<i class="glyphicon glyphicon-info-sign"></i>
										</button>
										</li>			
									</ul>	
									</div>
									
									<div class="widget-icons pull-right">
										<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
									</div>
									<div class="clearfix"></div>
									
								
								</div>
							
								<div class="widget-content">
									<div class="padd">

										<br />
										<!-- Form starts.  -->
										<form id="frmFilterLe" class="form-horizontal" role="form">

											<div class="form-group">
												<label class="col-md-1 control-label">C&oacute;digo</label>
												<div class="col-md-2">
													<input id="filterLeCode" type="text" class="form-control" placeholder="C&oacute;digo">
												</div>
												<label class="col-md-2 control-label">Descripci&oacute;n</label>
												<div class="col-md-3">
													<input id="filterLeDescription" type="text" class="form-control" placeholder="Descripci&oacute;n">
												</div>
												<label class="col-md-1 control-label">TaxpayerId</label>
												<div class="col-md-2">
													<input id="filterLeTaxpayerId" type="text" class="form-control" placeholder="Taxpayer Id">
												</div>
												<div class="col-md-1 clearfix">
													
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-1 control-label">Pa&iacute;s</label>
												<div class="col-md-3">
													<select id="filterLeCountry" class="form-control">
														<option value="">Seleccione una opci&oacute;n</option>
														<option value="AR">Argentina</option>
														<option value="BR">Brasil</option>
														<option value="UY">Uruguay</option>
														<option value="MX">M&eacute;xico</option>
														<option value="CO">Colombia</option>
													</select>
												</div>
												<label class="col-md-1 control-label">Operacional?</label>
												<div class="col-md-1">
													<select id="filterLeOperational" name="operational" class="form-control" >
														<option value=""></option>
														<option value="true">Si</option>
														<option value="false">No</option>														
													</select>
												</div>
												<label class="col-md-1 control-label">Operativa Trx?</label>
												<div class="col-md-1">
													<select id="filterLeOperationalTrx" name="operationalTrx" class="form-control" >
														<option value=""></option>
														<option value="true">Si</option>
														<option value="false">No</option>														
													</select>
												</div>
												<label class="col-md-1 control-label">Habilitado?</label>
												<div class="col-md-1">
													<select id="filterLeEnabled" name="enabled" class="form-control">
														<option value=""></option>
														<option value="true">Si</option>
														<option value="false">No</option>														
													</select>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-1 control-label">Taxpayer Id Formateado</label>
												<div class="col-md-3">
													<input id="filterLeTaxpayerIdFormatted" type="text" class="form-control" placeholder="Taxpayer Id Formateado">
												</div>
										
												<label class="col-md-1 control-label" for="ciDateFrom">Fecha Inicio</label>
												<div class="col-md-2">
													<div id="filterLeDateFrom99" class="input-append input-group dtpicker">
														<input data-format="dd/MM/yyyy" type="text" class="form-control">
														<span class="input-group-addon add-on">
															<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
														</span>
													</div>
		                        	      		</div>
											</div>	
											<div class="form-group">
												<div class="row">
													&nbsp;
												</div>
											</div>
											<div class="form-group">
												<div class="col-md-offset-1 col-md-8">
													<button id="btnLeSearch" type="button" class="btn btn-primary">
														<i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
													</button>
													<button id="btnLeReset" type="reset" class="btn btn-warning">
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
										Legales &nbsp; 
																					
				  						
																				
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
												<table cellpadding="0" cellspacing="0" border="0" id="tLegalEntityResult" width="100%">
													<thead>
														<tr style="font-weight:bold;">
															<th class="centered"><input type="checkbox" id="legalEntitySelectAll" style="cursor:pointer;" title="Seleccionar todos ..."></th>
															<th class="centered">C&oacute;digo</th>
															<th class="centered">Descripci&oacute;n</th>
															<th class="centered">Pa&iacute;s</th>
															<th class="centered">Taxpayer Id</th>
															<th class="centered">Es operacional?</th>
															<th class="centered">Es operativa Trx?</th>
															<th class="centered">Habilitado?</th>
															<th class="centered">Fecha Creaci&oacute;n</th>
															<th class="centered">Fecha Modif</th>
															<th class="centered">Taxpayer Id Formateado</th>
															<th class="centered">Fecha Inicio</th>
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
											<a id="btnLegalEntityRemoveAll" href="javascript:void(0);" class="btn btn-xs btn-danger roleable ESCRITURA">
												<i class="glyphicon	 glyphicon-trash"></i>&nbsp;Remover Seleccionado/s
											</a>
										</div>
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
</div>

<script id="rowSheet" type="text/x-handlebars-template">

    {{#each this}}
 
     <tr data-report = {{id}} class=" centered">
        
        <td class='centered'>{{code}}</td>
		<td>{{description}}</td>
		<td class='centered'>{{tax_payer_id}}</td> 
        <td class='centered'>{{country_code}}</td> 
		<td class='centered'>{{operational}}</td>
		<td class='centered'>{{operational_trx}}</td>      
		<td class='centered'>{{enabled}}</td>      
		<td class='centered'>{{tax_payer_id_formatted}}</td>
		<td class='centered'>{{start_date}}</td>
     </tr>
    {{/each}}
</script>

<script id="rowAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
        <td class='centered'><h4>{{rev}}</h4></td>
		<td class='centered'><h4>{{username}}</h4></td>
		<td class='centered'><h4>{{rev_type}}</h4></td> 
        <td class='centered'><h4>{{rev_date}}</h4></td> 
		<td class='centered'><h4>{{dto.code}}</h4></td>   
		<td><h4>{{dto.description}}</h4></td>
		<td class='centered'><h4>{{dto.taxpayer_id}}</h4></td>
		<td class='centered'><h4>{{dto.country_code}}</td>
		<td class='centered'><h4>{{dto.operational_si_no}}</td>
		<td class='centered'><h4>{{dto.operational_trx_si_no}}</td>
		<td class='centered'><h4>{{dto.enabled_si_no}}</td>     
		<td class='centered'><h4>{{dto.taxpayer_id_formatted}}</h4></td>
		<td class='centered'><h4>{{dto.start_date}}</h4></td>
     </tr>
    {{/each}}
</script>

<script src="${pageContext.request.contextPath}/app/public/js/app/model/LegalEntity.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/LegalEntityService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/legalEntityUpload.js"></script>

<script>
	
	$(document).ready(
		function(){
			
			$("#nav li").removeClass("open");
			$("li.has_sub ul li").removeClass("current");
			$("#sidebarCatalogs").addClass("open");
			$("#optLegalEntities").addClass("current");
			
			LegalEntity.init();
			LegalEntityUpload.init();
			CountryService.get(null, null, CountryService.comboHandler, false);
			LegalEntityService.get(LegalEntityService.handler);
			
			$('#leDateFrom99').datetimepicker({
			      	pickTime: false,
			      	autoclose: true
			});
			
			$('#filterLeDateFrom99').datetimepicker({
			      	pickTime: false,
			      	autoclose: true
		    });
			
			return;
		}		
	);

</script>