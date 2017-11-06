<div id="modalAddRule" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Entidades Legales PO</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="frmAddRuleSellType" role="form">
                        <input type="hidden" name="ruleSellTypeFlag" id="ruleSellTypeFlag"
                               value="A"> <input type="hidden" name="ruleSellTypeId"
                                                 id="ruleSellTypeId" value="">
                        <h4>Entrada</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label" for="spProductType">Tipo
                                                    de Producto</label>
                                                <div class="col-md-8">
                                                    <select id="spProductType" class="form-control"
                                                            multiple="multiple" required>
                                                    </select> <select id="spProductTypeUnique" class="form-control"
                                                                      required>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div>
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label" for="spCountrySite">Pa&iacute;s
                                                    Site</label>
                                                <div class="col-md-8">
                                                    <select id="spCountrySite" class="form-control"
                                                            multiple="multiple" required>
                                                    </select> <select id="spCountrySiteUnique" class="form-control"
                                                    required>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div>
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label" for="spModel">Modelo</label>
                                                <div class="col-md-8">
                                                    <select id="spModel" class="form-control" required>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div>

                                    </div>
                                </div>
                                <div class="row">&nbsp;</div>
                            </div>
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label"
                                                       for="spCountryDestiny">Pa&iacute;s Destino</label>
                                                <div class="col-md-8">
                                                    <select id="spCountryDestiny" class="form-control"
                                                            multiple="multiple"
                                                            required>
                                                    </select><select id="spCountryDestinyUnique" class="form-control"
                                                    required>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div>
                                        <div class="row">&nbsp;</div>
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label" for="spSellType">Tipo
                                                    de Venta</label>
                                                <div class="col-md-8">
                                                    <select id="spSellType" class="form-control" required>
                                                        <option value="" selected>Seleccione una
                                                            opci&oacute;n
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">&nbsp;</div>
                                        <div class="row">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label" for="spVCC">VCC</label>
                                                <div class="col-md-8">
                                                    <select id="spVCC" class="form-control">
                                                    </select>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
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
                                            <label class="col-md-4 control-label"
                                                   for="leInvoicingLegalEntityType">Entidad Legal</label>
                                            <div class="col-md-8">
                                                <select id="leInvoicingLegalEntityType" class="form-control"
                                                        required>
                                                    <option value="">Seleccione una opci&oacute;n</option>
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
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
                </button>
                <button id="btnAddSellType" type="button"
                        class="btn btn-success roleable ESCRITURA">
                    <i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar
                </button>
            </div>
        </div>
    </div>
</div>
