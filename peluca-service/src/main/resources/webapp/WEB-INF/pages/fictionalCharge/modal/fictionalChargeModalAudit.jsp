<div id="modalRuleFictionalAuditedTable" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg auditoria">
		<div class="modal-content">
               		<div class="modal-header">
                 		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                 		<h4 class="modal-title">Auditoria Entidades Legales Cobro Ficticio</h4>
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
			                            	<th><h4>Revisión</h4></th>
			                            	<th><h4>Usuario</h4></th>
			                            	<th><h4>Tipo Revisión</h4></th>
			                            	<th><h4>Fec Revisión</h4></th>
				                           	<th><h4>Entidad Legal OM</h4></th>
				                            <th><h4>Entidad Legal ARRF</h4></th>
				                            <th><h4>Cobro Ficticio</h4></th>
			                            </tr>
			                          </thead>
			                          <tbody id ="auditedRuleSellTypeTableBody">
			                          
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

<script id="rowSellTypeAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = "{{id}}" class=" centered">
		<td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
		<td class='centered'><h4>{{username}}</h4></td>
		<td class='centered'><h4>{{rev_type}}</h4></td> 
        <td class='centered'><h4>{{rev_date}}</h4></td> 

		<td class='centered'><h4>{{dto.legal_entity_omdesctiption}}</h4></td>
		<td class='centered'><h4>{{dto.legal_entity_arrfdesctiption}}</h4></td> 
		<td class='centered'><h4>{{dto.fictional_charge}}</h4></td>
     </tr>
    {{/each}}
</script>
