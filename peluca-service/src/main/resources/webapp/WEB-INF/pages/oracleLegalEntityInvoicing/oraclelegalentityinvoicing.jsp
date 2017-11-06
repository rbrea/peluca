<div id="modalAddOraLeInvoicing" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Regla de Entidades Legales para Facturaci&oacute;n</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <h4>Entrada</h4>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form id="frmAddOraLeInvoicing" role="form">
                                <input type="hidden" name="leInvoicingFlag" id="leInvoicingFlag"
                                       value="A"> <input type="hidden" name="leInvoicingId"
                                                         id="leInvoicingId" value="">
                                <div class="row">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"
                                               for="leInvoicingCountryCode">C&oacute;digo de
                                            Pa&iacute;s</label>
                                        <div class="col-md-6">
                                            <select id="leInvoicingCountryCode" class="form-control">
                                                <option value="">Seleccione una opci&oacute;n</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">&nbsp;</div>
                                <div class="row">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" for="leInvoicingChannel">Canal</label>
                                        <div class="col-md-4">
                                            <select id="leInvoicingChannel" class="form-control" required>
                                                <option value="">Seleccione una opci&oacute;n</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">&nbsp;</div>
                                <div class="row">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"
                                               for="leInvoicingProductType">Tipos de Producto</label>
                                        <div class="col-md-4">
                                            <select id="leInvoicingProductType" class="form-control"
                                                    required>
                                                <option value="">Seleccione una opci&oacute;n</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">&nbsp;</div>
                                <div class="row">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Fecha de Inicio</label>
                                        <div class="col-md-6">
                                            <div id="leInvoicingEnabledDate"
                                                 class="input-append input-group dtpicker">
                                                <input data-format="dd/MM/yyyy" type="text"
                                                       class="form-control"> <span
                                                    class="input-group-addon add-on"> <i
                                                    data-time-icon="fa fa-times"
                                                    data-date-icon="fa fa-calendar"></i>
												</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">&nbsp;</div>
                            </form>
                        </div>
                    </div>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
                </button>
                <button id="btnAddLegalEntitySave" type="button"
                        class="btn btn-success roleable ESCRITURA">
                    <i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar
                </button>
            </div>
        </div>
    </div>
</div>

<div id="modalOraLEInvoice" class="modal fade bs-example-modal-lg"
     tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Carga Masiva - Entidades Legales para Facturaci&oacute;n</h4>
            </div>
            <div class="modal-body">

                <form enctype="multipart/form-data" id="file-upload-form">
                    <input type="hidden" id="xlsLanguage" name="xlsLanguage" value="ES">
                    <div class="row fileupload-buttonbar">
                        <div id="fileupload-bar" class="col-lg-12">
                            <input type="text" class="form-control" id="filename"
                                   placeholder="" name="filename" value=""
                                   style="width: 300px; float: left; margin-right: 2px;" disabled>
							<span class="btn btn-success fileinput-button" id="searchButon">
								<i class="glyphicon glyphicon-plus"></i> <span>Browse</span>
							</span> <span class="btn btn-info upload" id="uploadButon"
                                          style="display: none;"> <i
                                class="glyphicon glyphicon-upload"></i> <span>Upload</span>
							</span> <input id="OraLEfileupload" type="file" multiple="" name="file"
                                           style="display: none;">
                        </div>
                    </div>
                </form>

                <div class="row">&nbsp;</div>
                <div class="panel panel-default" id="LEBodyResult"
                     style="display: none">
                    <div class="panel-heading">
                        <h6 class="panel-title">
                            <i class="glyphicon glyphicon-chevron-right"></i>&nbsp;
                            Resultados de Carga
                        </h6>
                    </div>
                    <div class="panel-body">
                        <div class="container-fluid">
                            <table class="table" id="resultTable">
                                <thead>
                                <tr>
                                    <th><h4>Country Code</h4></th>
                                    <th><h4>Channel</h4></th>
                                    <th><h4>Product Type</h4></th>
                                    <th><h4>Start Date</h4></th>
                                    <th><h4>Legal Entity</h4></th>
                                </tr>
                                </thead>
                                <tbody id="LE_Result_Upload">

                                </tbody>
                            </table>
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

<div id="modalOraInvoicAuditedTable"
     class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg auditoria">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Auditoria Regla Entidades Legales para Facturaci&oacute;n</h4>
            </div>
            <div class="modal-body">

                <div class="panel panel-default" id="auditedResult">

                    <div class="panel-body">
                        <div class="container-fluid">
                            <table class="table" id="auditedOraTable">
                                <thead>
                                <tr>
                                    <th><h4>CodRev</h4></th>
                                    <th><h4>User</h4></th>
                                    <th><h4>Action</h4></th>
                                    <th><h4>Date</h4></th>
                                    <th><h4>Canal</h4></th>
                                    <th><h4>Tipo de Producto</h4></th>
                                    <th><h4>Codigo Pais</h4></th>
                                    <th><h4>Entidad Legal</h4></th>
                                </tr>
                                </thead>
                                <tbody id="auditedOraTableBody">

                                </tbody>
                            </table>
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

<!-- Page heading -->
<div class="page-head">
    <h2 class="pull-left">
        <i class="fa fa-file-o"></i> Regla - Entidades Legales para Facturaci&oacute;n
    </h2>

    <!-- Breadcrumb -->
    <div class="bread-crumb pull-right">
        <a href="${pageContext.request.contextPath}/app/html/index"><i
                class="fa fa-home"></i> Home</a>
        <!-- Divider -->
        <span class="divider">/</span> <a href="#" class="bread-current">Regla
        - Entidades Legales para Facturaci&oacute;n</a>
    </div>

    <div class="clearfix"></div>

</div>
<!-- Page heading ends -->
<div class="matter">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="container">
                    <div class="row">
                        <!-- 	<div class="col-md-1">&nbsp;</div> -->
                        <div class="col-md-12" style="text-align: center;">
                            <div class="widget wgreen">

                                <div class="widget-head">
                                    <div class="pull-left">
                                        <form id="frmOracleLegalEntityExport" role="form"
                                              enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                              method="POST"></form>
                                        <ul class="list-inline ORACLE_LEGAL_ENTITY_FOR_INVOICING">
                                            <li><i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda
                                                Entidades Legales para Facturaci&oacute;n
                                            </li>

                                            <li><a id="btnAddOracleLeInvoicing"
                                                   href="#modalAddOraLeInvoicing"
                                                   class="btn btn-success btn-sm roleable ESCRITURA"
                                                   data-toggle="modal" title="Nuevo"> <i
                                                    class="glyphicon glyphicon-plus"></i>
                                            </a></li>

                                            <li>
                                                <button id="btnLoad" type="reset"
                                                        class="btn btn-primary btn-sm roleable ESCRITURA"
                                                        data-toggle="modal" title="Importar">
                                                    <i class="glyphicon glyphicon-cloud-upload"></i>
                                                </button>
                                            </li>

                                            <li>
                                                <button id="btnOraLeExport" class="btn btn-info btn-sm"
                                                        disabled title="Exportar">
                                                    <i class="glyphicon glyphicon-cloud-download"></i>
                                                </button>
                                            </li>
                                            <li>
                                                <button id="btnRevisionAudited"
                                                        class="btn btn-danger btn-sm roleable LECTURA"
                                                        title="Auditoria">
                                                    <i class="glyphicon glyphicon-eye-open"></i>
                                                </button>
                                            </li>

                                        </ul>

                                    </div>

                                    <div class="widget-icons pull-right">
                                        <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                                <div class="widget-content" id="filteredSearch" style="display:none;">
                                    <div class="padd">

                                        <br/>
                                        <!-- Form starts.  -->
                                        <form id="frmFilterLeInvoicing" class="form-horizontal"
                                              role="form">

                                            <div class="form-group">
                                                <div class="col-md-3">
                                                    <label for="filterLeInvoicingCountryCode"
                                                           class="control-label">C&oacute;digo de
                                                        Pa&iacute;s</label>
                                                    <div>
                                                        <select id="filterLeInvoicingCountryCode"
                                                                class="form-control" multiple="multiple">
                                                            <option value="">Seleccione una opci&oacute;n</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <label for="filterLeInvoicingChannel"
                                                           class="control-label">Canal</label>
                                                    <div>
                                                        <select id="filterLeInvoicingChannel" class="form-control">
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                    <label for="filterLeInvoicingProductType"
                                                           class="control-label">Tipo de Producto</label>
                                                    <div>
                                                        <select id="filterLeInvoicingProductType"
                                                                class="form-control">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <div class="row">&nbsp;</div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-md-offset-1 col-md-8">
                                                    <button id="btnLeInvoicingSearch" type="button"
                                                            class="btn btn-primary">
                                                        <i class="glyphicon glyphicon-search"></i>&nbsp;Buscar
                                                    </button>
                                                    <button id="btnLeInvoicingReset" type="reset"
                                                            class="btn btn-warning">
                                                        <i class="glyphicon glyphicon-trash"></i>&nbsp;Limpiar
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="widget-foot">
                                    <!-- Footer goes here -->
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-offset-8 col-md-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-md-1">&nbsp;</div> -->
                    </div>
                    <div class="row">
                        <!-- 	<div class="col-md-1">&nbsp;</div> -->
                        <div class="col-md-12" style="text-align: center;">
                            <div class="widget wgreen">

                                <div class="widget-head">
                                    <div class="pull-left">
                                        <i class="glyphicon glyphicon-th-list"></i>&nbsp;Entidades Legales para
                                        Facturaci&oacute;n &nbsp;&nbsp;

                                    </div>
                                    <div class="pull-left">
                                        <a id="btnLeRemoveAll" href="javascript:void(0);"
                                           class="btn btn-xs btn-danger roleable ESCRITURA"> <i
                                                class="glyphicon	glyphicon-trash"></i>&nbsp;
                                        </a>
                                    </div>

                                    <div class="col-md-2">
                                        <i><b>
                                            <button id="labelSelectAll"
                                                    class="btn btn-link btn-xs" style="display: none;">
                                                <h4 id="allCheckText">marcar</h4>
                                            </button>
                                        </b></i>
                                    </div>

                                    <div class="widget-icons pull-right">
                                        <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                                <div class="widget-content">
                                    <div class="padd">

                                        <br/>
                                        <!-- Table Page -->
                                        <div class="page-tables">
                                            <!-- Table -->
                                            <div class="table-responsive">
                                                <table cellpadding="0" cellspacing="0" border="0"
                                                       id="tLeInvoicingResult" width="100%">
                                                    <thead>
                                                    <tr style="font-weight: bold;">
                                                        <th class="centered"><input type="checkbox"
                                                                                    id="leInvoicingSelectAll"
                                                                                    style="cursor: pointer;"
                                                                                    title="Seleccionar todos ..."></th>
                                                        <th class="centered">C&oacute;digo de Pa&iacute;s</th>
                                                        <th class="centered">Canal</th>
                                                        <th class="centered">Tipo de Producto</th>
                                                        <th class="centered">Entidad Legal</th>
                                                        <th class="centered">Fecha Creaci&oacute;n</th>
                                                        <th class="centered">Fecha Modif</th>
                                                        <th class="centered">Acciones</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-foot">
                                    <!-- Footer goes here -->
                                    <div class="row"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- <div class="col-md-1">&nbsp;</div> -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Matter ends -->
</div>

<script id="rowSheet" type="text/x-handlebars-template">

    {{#each this}}
    <tr data-report={{id}} class=" centered">

        <td>{{country_code}}</td>
        <td>{{channel}}</td>
        <td>{{product}}</td>
        <td>{{start_date}}</td>
        <td>{{description}}</td>

    </tr>
    {{/each}}
</script>

<script id="rowOraAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
    <tr data-report={{id}} class=" centered">
        <td><h4>{{rev}}</h4></td>
        <td><h4>{{username}}</h4></td>
        <td><h4>{{rev_type}}</h4></td>
        <td><h4>{{rev_date}}</h4></td>
        <td><h4>{{dto.channel}}</h4></td>
        <td><h4>{{dto.product_type}}</h4></td>
        <td><h4>{{dto.country_code}}</h4></td>
        <td><h4>{{dto.legal_entity_description}}</td>
    </tr>
    {{/each}}
</script>

<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/model/LegalEntity.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/LegalEntityService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/model/OracleLegalEntityForInvoicing.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/rules/OracleLegalEntityForInvoicingService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/rules/OracleLegalEntityForInvoicingUpload.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>

<script>
    $(document)
            .ready(
                    function () {

                        $("#nav li").removeClass("open");
                        $("li.has_sub ul li").removeClass("current");
                        $("#sidebarRules").addClass("open");
                        $("#optOracleLegalEntityInvoicing").addClass("current");

                        OracleLegalEntityForInvoicingService.init();
                        OracleLegalEntityForInvoicingUpload.init();
                        ValuesService
                                .getChannels(OracleLegalEntityForInvoicingService.handlerChannels);
                        ValuesService
                                .getProductTypes(OracleLegalEntityForInvoicingService.handlerProductTypes);
                        $('#leInvoicingEnabledDate').datetimepicker({
                            pickTime: false,
                            autoclose: true
                        });

                        return;
                    });
</script>
