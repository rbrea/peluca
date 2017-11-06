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
			                              		<th class="centered">Entidad Legal OM</th>
				                              	<th class="centered">Entidad Legal ARRF</th>
				                 
				                              	<th class="centered">Cobro Ficticio</th>
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

<script id="rowSellTypeSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = {{id}} class=" centered">
        
        <td class="centered"><h4>{{fictional_charge_dto.legal_entity_omdesctiption}}</h4></td>
		<td class="centered"><h4>{{fictional_charge_dto.legal_entity_arrfdesctiption}}</h4></td>
		<td class="centered"><h4>{{fictional_charge_dto.fictional_charge}}</h4></td>
		
     </tr>
    {{/each}}
</script>