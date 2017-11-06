<div id="modalImport" class="modal fade bs-example-modal-lg"
     tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Carga Masiva - Entidades Legales PO</h4>
            </div>
            <div class="modal-body">

                <form enctype="multipart/form-data" id="file-upload-form">
                    <input type="hidden" id="xlsLanguage" name="xlsLanguage" value="ES">
                    <div class="row fileupload-buttonbar">
                        <div id="fileupload-bar" class="col-lg-12">
                            <input type="text" class="form-control" id="filenameRuleSellType"
                                   placeholder="" name="filename" value=""
                                   style="width: 300px; float: left; margin-right: 2px;" disabled>
							<span class="btn btn-success fileinput-button"
                                  id="sellTypeBulkSearchButton"> <i
                                    class="glyphicon glyphicon-plus"></i> <span>Browse</span>
							</span> <span class="btn btn-info upload" id="uploadButtonRuleSellType"
                                          style="display: none;"> <i
                                class="glyphicon glyphicon-upload"></i> <span>Upload</span>
							</span> <input id="ruleSellPointfileupload" type="file" multiple=""
                                           name="file" style="display: none;">
                        </div>
                    </div>
                </form>

                <div class="row">&nbsp;</div>
                <div class="panel panel-default" id="ruleSellPointResult"
                     style="display: none">
                    <div class="panel-heading">
                        <h6 class="panel-title">
                            <i class="glyphicon glyphicon-chevron-right"></i>&nbsp;
                            Resultados de Carga
                        </h6>
                    </div>
                    <div class="panel-body">
                        <div class="container-fluid">
                            <div class="table-responsive">
                                <table class="table" id="ruleSellPointResultTable">
                                    <thead>
                                    <tr>
                                        <th class="centered"><h4>Tipo Producto</h4></th>
                                        <th class="centered"><h4>Pa&iacute;s Site</h4></th>
                                        <th class="centered"><h4>Pa&iacute;s Destino</h4></th>
                                        <th class="centered"><h4>Tipo Venta</h4></th>
                                        <th class="centered"><h4>Modelo</h4></th>
                                        <th class="centered"><h4>VCC</h4></th>
                                        <th class="centered"><h4>Entidad Legal</h4></th>
                                    </tr>
                                    </thead>
                                    <tbody id="ruleSellPoint_Result_Upload">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
                </button>
            </div>
        </div>
    </div>
</div>

<script id="rowSellTypeSheet" type="text/x-handlebars-template">

    {{#each this}}
    <tr data-report = {{id}} class=" centered">

        <td class="centered"><h4>{{po_legal_entity_dto.product_type_description}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.country_code_site}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.country_code_destiny}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.sell_type_description}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.model}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.virtual_credit_card}}</h4></td>
        <td class="centered"><h4>{{po_legal_entity_dto.legal_entity_description}}</h4></td>

    </tr>
    {{/each}}
</script>