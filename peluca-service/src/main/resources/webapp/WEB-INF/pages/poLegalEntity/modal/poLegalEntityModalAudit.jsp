<div id="modalRuleSellTypeAuditedTable"
     class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg auditoria">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Auditoria Entidades PO</h4>
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
                                        <th><h4>Revisi&oacute;n</h4></th>
                                        <th><h4>Usuario</h4></th>
                                        <th><h4>Tipo Revisi&oacute;n</h4></th>
                                        <th><h4>Fec Revisi&oacute;n</h4></th>
                                        <th><h4>Tipo Producto</h4></th>
                                        <th><h4>Pa&iacute;s Site</h4></th>
                                        <th><h4>Pa&iacute;s Destino</h4></th>
                                        <th><h4>Tipo Venta</h4></th>
                                        <th><h4>Modelo</h4></th>
                                        <th><h4>VCC</h4></th>
                                        <th><h4>Entidad Legal</h4></th>
                                    </tr>
                                    </thead>
                                    <tbody id="auditedRuleSellTypeTableBody">

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

<script id="rowSellTypeAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
    <tr data-report = "{{id}}" class=" centered">
        <td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
        <td class='centered'><h4>{{username}}</h4></td>
        <td class='centered'><h4>{{rev_type}}</h4></td>
        <td class='centered'><h4>{{rev_date}}</h4></td>
        <td class='centered'>{{dto.product_type_description}}</td>
        <td class='centered'>{{dto.country_code_site}}</td>
        <td class='centered'>{{dto.country_code_destiny}}</td>
        <td class='centered'>{{dto.sell_type_description}}</td>
        <td class='centered'>{{dto.model}}</td>
        <td class='centered'>{{dto.virtual_credit_card}}</td>
        <td class='centered'>{{dto.legal_entity_description}}</td>
    </tr>
    {{/each}}
</script>