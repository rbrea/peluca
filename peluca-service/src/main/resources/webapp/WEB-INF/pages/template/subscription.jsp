<div id="modalSubscriptionRule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
             <div class="modal-header">
               	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
               	<h4 class="modal-title">Suscripciones</h4>
             </div>
             <div class="modal-body">
     			<div class="panel panel-default" id="auditedResult">
						<div class="panel-body">     
						      <div class="container-fluid"> 
							        <div class="form-horizontal form-group">
						          		<label for="inputEmail" class="col-sm-4 control-label" id="userInfoLabel">Usuario: </label>
									    <label for="inputEmail" class="col-sm-2 control-label">Email</label>
									    <div class="col-sm-5">
									      <input type="email" class="form-control" id="inputEmail" placeholder="user.name@despegar.com">
									    </div>
									    <div class="col-sm-1" style="padding-top:5px;">
									      <button id="btnRefreshMail" class="btn btn-success btn-sm" title="Actualizar Mail">
												<i class="glyphicon glyphicon-floppy-saved" ></i>	
										  </button>
									    </div>
									    	
									    
									</div>   
									<p>&nbsp;</p>
									 <div class="form-horizontal form-group">
										<label class="col-md-1 control-label">Regla: </label>
									 	<div class="col-md-3">
			                          	<select class="form-control" id="ruleSubrciptionList">
				                          	  
			                          	</select>
			                          	</div>
			                          	
			                          	<div class="col-lg-6">
			                          	<ul id="subscriptionAcction">			
												  <li data-report = "{{id}}">	
													      <span class="">
													        <input type="checkbox" aria-label="...">
													        modificar
													      </span>
												 </li>
			                          	</ul>
			                         	</div><!-- /.col-lg-6 -->
			                          	 
		                          	</div> 
						      </div>
						</div>
				</div>
             </div>
             <div class="modal-footer">           	
					<div class="pull-right">
						<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
					</div>						
			</div>
      	</div>
	</div>
</div>
<script id="rowSubcription" type="text/x-handlebars-template">

    {{#each this}}
		<li data-report = "{{id}}">	
			<span class="">
				<input type="checkbox" id ="{{code}}" class="checkNotification">
				{{description}}
			</span>
		</li>
    {{/each}}

</script>

