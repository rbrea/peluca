<!-- Form starts.  -->
<form id="frmFilterRuleSellPoint" class="form-horizontal FICTIONAL_CHARGE" role="form">

	<div class="form-group">
		<div class="col-md-4">
			<label class="control-label">Entidad Legal OM</label>
			<select id="filterSpLegalEntityOM" class="form-control">
				<option value="">Seleccione una opci&oacute;n</option>
			</select>
		</div>
		<div class="col-md-4">
			<label class="control-label">Entidad Legal ARRF</label>
			<select id="filterSpLegalEntityARRF" class="form-control">
				<option value="">Seleccione una opci&oacute;n</option>
			</select>
		</div>
		<div class="col-md-4">
			<label class="control-label">Cobro Ficticio</label>
			<select id="filterFictionalCharge" class="form-control">
				<option value="">Seleccione una opci&oacute;n</option>
				<option value="true">Verdadero</option>
				<option value="false">Falso</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<div class="row">
			&nbsp;
		</div>
	</div>
	<div class="form-group">
		<div class="col-md-offset-1 col-md-8">
			<button id="btnSpSearch" type="button" class="btn btn-primary">
				<i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
			</button>
			<button id="btnSpReset" type="reset" class="btn btn-warning">
				<i class="glyphicon glyphicon-trash"></i>&nbsp;Limpiar
			</button>
		</div>
	</div>
</form>