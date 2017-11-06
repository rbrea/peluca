<div id="modalAddRule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
             		<div class="modal-header">
               		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
               		<h4 class="modal-title">Entidades Legales Cobro</h4>
             		</div>
             		<div class="modal-body">
               		<div class="container-fluid">
                 			<form id="frmAddRuleSellType" role="form">
                 				<input type="hidden" name="ruleSellTypeFlag" id="ruleSellTypeFlag" value="A">
                 				<input type="hidden" name="ruleSellTypeId" id="ruleSellTypeId" value="">
               			<h4>Entrada</h4>
               			<div class="row">
              					<div class="col-md-6">
               					<div class="panel panel-default">
          							<div class="panel-body">
			          					<div class="row">
			              
											<div class="form-group">
												<label class="col-md-4 control-label" for="spLegalEntityOM">Entidad Legal OM</label>
													<div class="col-md-8">
														<select id="spLegalEntityOM" class="form-control" required>
														<option value="">Seleccione una opci&oacute;n</option>
														</select>
													</div>
											</div>
											
			                      		</div>
			                      		
          							</div>
         							</div>
              					</div>
              					
              					<div class="col-md-6">
              						<div class="panel panel-default">
         								<div class="panel-body">
         				
										<div class="row">
																								
											<div class="form-group">
												<label class="col-md-4 control-label" for="spLegalEntityARRF">Entidad Legal AR/RF</label>
													<div class="col-md-8">
														<select id="spLegalEntityARRF" class="form-control" required>
														<option value="">Seleccione una opci&oacute;n</option>
														</select>
													</div>
											</div>
			                      		</div>
										
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
											<label class="col-md-4 control-label" for="leInvoicingLegalEntityType">Cobro Ficticio</label>
											<div class="col-md-8">
												<select id="spFictionalCharge" class="form-control" required>
													<option value="">Seleccione una opci&oacute;n</option>
													<option value="true">Verdadero</option>
													<option value="false">Falso</option>
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
               		<button id="btnAddSellType" type="button" class="btn btn-success roleable ESCRITURA"><i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar</button>
             		</div>
           	</div>
	</div>
</div>