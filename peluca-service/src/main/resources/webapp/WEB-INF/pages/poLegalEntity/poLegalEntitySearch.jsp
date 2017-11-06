<!-- Form starts.  -->
<form id="frmFilterRuleSellPoint" class="form-horizontal PO_LEGAL_ENTITY"
      role="form" style="display:none;">
    <div class="form-group">
            <label for="filterSpProductType" class="control-label col-md-1">Tipo
                Producto</label>
            <div class="col-md-3">
                <select id="filterSpProductType" class="form-control">
                    <option value="">Seleccione una opci&oacute;n</option>
                </select>
            </div>

            <label for="filterSpCountrySite" class="control-label col-md-1">Pa&iacute;s
                Site</label>
            <div class="col-md-3">
                <select id="filterSpCountrySite" class="form-control" multiple="multiple">
                </select>
            </div>

            <label for="filterSpCountryDestiny" class="control-label col-md-1">Pa&iacute;s Destino</label>
            <div class="col-md-3">
                <select id="filterSpCountryDestiny" class="form-control" multiple="multiple">
                </select>
            </div>
    </div>

    <div class="form-group">

            <label for="filterSpSellType" class="control-label col-md-1">Tipo
                Venta</label>
            <div class="col-md-3">
                <select id="filterSpSellType" class="form-control">
                    <option value="" selected>Seleccione una
                        opci&oacute;n</option>
                </select>
            </div>

            <label for="filterSpModel" class="control-label col-md-1">Modelo</label>
            <div class="col-md-3">
                <select id="filterSpModel" class="form-control">
                    <option value="" selected>Seleccione una
                        opci&oacute;n</option>
                </select>
            </div>

        <label for="filterSpVCC" class="control-label col-md-1">VCC</label>
        <div class="col-md-3">
            <select id="filterSpVCC" class="form-control">
                <option value="" selected>Seleccione una
                    opci&oacute;n</option>
            </select>
        </div>


    </div>

    <div class="form-group">
        <label for="filterSpLegalEntity" class="control-label col-md-2">Entidad Legal</label>
        <div class="col-md-4">
            <select id="filterSpLegalEntity" class="form-control">
                <option value="">Seleccione una opci&oacute;n</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="row">&nbsp;</div>
    </div>
    <div class="form-group">
        <div class="col-md-offset-4 col-md-4">
            <button id="btnSpSearch" type="button"
                    class="btn btn-primary">
                <i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
            </button>
            <button id="btnSpReset" type="reset"
                    class="btn btn-warning">
                <i class="glyphicon glyphicon-trash"></i>&nbsp;Limpiar
            </button>
        </div>
    </div>

</form>