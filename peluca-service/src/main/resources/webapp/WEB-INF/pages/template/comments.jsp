<div id="modalCommentRule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
             <div class="modal-header">
               	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
               	<h4 class="modal-title">Seccion Comentarios</h4>
             </div>
             <div class="modal-body">
     			<div class="panel panel-default" id="auditedResult">
						<div class="panel-body">     
						      <div class="container-fluid"> 
						           <div class="table-responsive" style="height: 400px;overflow-y: scroll;display: block;">   
				                      <table class="table table-striped" id="commentsListRule">
				                          <thead>
				                            <tr>
				                            	<th>Lista Comentarios</th>         	 
				                            </tr>
				                          </thead>
				                          <tbody id ="commentsListBody" >
				                          </tbody>
				                       </table>
						            </div>
						      </div>
						</div>
				</div>
             </div>
             <div class="modal-footer">           	
					<div class="pull-left col-md-4 commentWritable">
						<textarea id="textComment" maxlength="200" rows="1" cols="10"  placeholder="Escribir Comentario...." style="height: 3em;width: 100%;padding: 6px;"></textarea>
					</div> 
					<div class="pull-right">
						<button type="button" class="btn btn-success commentWritable" id="sendComment" data-rule="" disabled><i class="fa fa-commenting"></i>&nbsp;Comentar</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar</button>
					</div>						
			</div>
      	</div>
	</div>
</div>
<script id="rowComment" type="text/x-handlebars-template">

    {{#each this}}
     <tr data-report = "{{id}}">
        <td>
			<div>
			<h5><b>{{user}} - {{date}}</b> </h5>
			</div>
			<div style ="max-width:85ch; overflow-x: hidden">
			<h4>{{msg}}</h4>
			</div>
		</td>
     </tr>
    {{/each}}

</script>
