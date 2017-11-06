<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<div id="modalCatalogueAuditedTable"
     class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg auditoria">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Auditoria Cat&aacute;logos</h4>
            </div>
            <div class="modal-body">

                <div class="panel panel-default" id="auditedResult">
                    <div class="panel-body">
                        <div class="container-fluid">
                            <div class="table-responsive">
                                <table class="table" id="auditedCatalogueTable">
                                    <thead>
                                    <tr>
                                        <th class='centered'><h4>Id</h4></th>
                                        <th class='centered'><h4>Revisi&oacute;n</h4></th>
                                        <th class='centered'><h4>Usuario</h4></th>
                                        <th class='centered'><h4>Tipo Revisi&oacute;n</h4></th>
                                        <th class='centered'><h4>Fec Revisi&oacute;n</h4></th>
                                        <th class='centered'><h4>C&oacute;digo</h4></th>
                                        <th class='centered'><h4>Descripci&oacute;n</h4></th>
                                    </tr>
                                    </thead>
                                    <tbody id="auditedCatalogueTableBody">

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

<div id="modalAddCatalogue" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-remove"></i>
                </button>
                <h4 class="modal-title">Alta de Catalogo</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form id="frmAddCatalogue" role="form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-md-4 control-label" for="spCatalogueType">Tipo
                                                        de Catalogo</label>
                                                    <div class="col-md-8">
                                                        <select id="spCatalogueType" class="form-control" required>
                                                            <option value="">Seleccione una opci&oacute;n</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="form-group">
                                                        <label class="col-md-4 control-label" for="spCatalogueCode">C&oacute;digo</label>
                                                        <div class="col-md-8">
                                                            <input id="spCatalogueCode" class="form-control"
                                                                   type="text" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">&nbsp;</div>
                                                <div class="row">
                                                    <div class="form-group">
                                                        <label class="col-md-4 control-label"
                                                               for="spCatalogueDescription">Descripci&oacute;n</label>
                                                        <div class="col-md-8">
                                                            <input id="spCatalogueDescription" class="form-control"
                                                                   type="text" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">&nbsp;</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        aria-hidden="true">
                    <i class="glyphicon glyphicon-floppy-remove"></i>&nbsp;Cerrar
                </button>
                <button id="btnAddCatalogueSave" type="button"
                        class="btn btn-success roleable ESCRITURA">
                    <i class="glyphicon glyphicon-floppy-saved"></i>&nbsp;Guardar
                </button>
            </div>
        </div>
    </div>
</div>

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
                <h4 class="modal-title">Carga Masiva - Catalogos</h4>
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
                                        <th class="centered"><h4>Codigo</h4></th>
                                        <th class="centered"><h4>Descripcion</h4></th>
                                        <th class="centered"><h4>Tipo de Catalogo</h4></th>
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

<!-- Page heading -->
<div class="page-head">
    <h2 class="pull-left">
        <i class="fa fa-file-o"></i> ABM de Cat&aacute;logos
    </h2>

    <!-- Breadcrumb -->
    <div class="bread-crumb pull-right">
        <a href="${pageContext.request.contextPath}/app/html/index"><i
                class="fa fa-home"></i> Home</a>
        <!-- Divider -->
        <span class="divider">/</span> <a href="#" class="bread-current">ABM
        de Cat&aacute;logos</a>
    </div>

    <div class="clearfix"></div>

</div>

<!-- Page heading ends -->
<div class="matter CATALOGUE">
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
                                        <form id="frmCatalogueExportXls" role="form"
                                              method="POST"
                                              enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></form>
                                        <ul class="list-inline">
                                            <li><i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda&nbsp;</li>
                                            <li><a id="btnAdd" href="#modalAddCatalogue"
                                                   data-toggle="modal"
                                                   class="btn btn-success btn-sm roleable ESCRITURA"
                                                   title="Nuevo"> <i class="glyphicon glyphicon-plus"></i>
                                            </a></li>
                                            <li class="Edition"><a id="btnImport"
                                                                   href="#modalImport"
                                                                   class="btn btn-primary btn-sm roleable ESCRITURA" data-toggle="modal"
                                                                   title="Importar"> <i class="glyphicon glyphicon-cloud-upload"></i>
                                            </a></li>
                                            <li>
                                                <button id="btnCatalogueExport"
                                                        class="btn btn-info btn-sm roleable LECTURA" title="Exportar">
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
                                            <li>
                                                <button id="btnMigration"
                                                        class="btn btn-warning btn-sm roleable ADMIN_USER"
                                                        title="Enviar a Producción">
                                                    <i class="glyphicon glyphicon-plane"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="widget-icons pull-right">
                                        <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                                <div class="widget-content">
                                    <div class="padd">

                                        <br/>
                                        <!-- Form starts.  -->
                                        <form id="frmFilterCatalogue" class="form-horizontal"
                                              role="form">

                                            <div class="form-group">
                                                <label for="filterSpCatalogueType"
                                                       class="col-md-2 control-label">Tipo de
                                                    Cat&aacute;logo</label>
                                                <div class="col-md-3">
                                                    <select id="filterSpCatalogueType" class="form-control">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">&nbsp;</div>
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
                                        <i class="glyphicon glyphicon-th-list"></i>&nbsp;Cat&aacute;logos
                                        &nbsp;
                                    </div>

                                    <div class="col-md-4">
                                        <a id="btnCatalogueRemoveAll" href="javascript:void(0);"
                                           class="btn btn-xs btn-danger roleable ESCRITURA"> <i
                                                class="glyphicon	 glyphicon-trash"></i>&nbsp;Remover
                                            Seleccionado/s
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
                                                       id="tCatalogueResult" width="100%">
                                                    <thead>
                                                    <tr style="font-weight: bold;">
                                                        <th class="centered"><input type="checkbox"
                                                                                    id="CatalogueSelectAll"
                                                                                    style="cursor: pointer;"
                                                                                    title="Seleccionar todos ..."></th>
                                                        <th class="centered">Id</th>
                                                        <th class="centered">C&oacute;digo</th>
                                                        <th class="centered">Descripci&oacute;n</th>
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
                            </div>
                            <div class="widget-foot">
                                <!-- Footer goes here -->
                                <div class="container">
                                    <div class="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/CatalogueTypeService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/catalog/CatalogueService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/catalog/CatalogueUpload.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>

<script id="rowSheet" type="text/x-handlebars-template">

    {{#each this}}

    <tr data-report={{id}} class=" centered">
        <td>{{catalogue_dto.code}}</td>
        <td>{{catalogue_dto.description}}</td>
        <td>{{catalogue_dto.catalogue_type_description}}</td>
    </tr>
    {{/each}}
</script>

<script id="rowAuditedSheet" type="text/x-handlebars-template">

    {{#each this}}
    <tr data-report={{id}} class=" centered">
        <td class='centered'><h4>{{dto.id}}</h4></td>
        <td class='centered'><h4>{{rev}}</h4></td>
        <td class='centered'><h4>{{username}}</h4></td>
        <td class='centered'><h4>{{rev_type}}</h4></td>
        <td class='centered'><h4>{{rev_date}}</h4></td>
        <td class='centered'><h4>{{dto.code}}</h4></td>
        <td class='centered'><h4>{{dto.description}}</h4></td>
    </tr>
    {{/each}}
</script>

<script>
    $(document).ready(function () {

        $("#nav li").removeClass("open");
        $("li.has_sub ul li").removeClass("current");
        $("#sidebarCatalogs").addClass("open");
        $("#optCatalogue").addClass("current");
        CatalogueService.init();
        CatalogueUpload.init();

        $('#spEnabledDate').datetimepicker({
            pickTime: false,
            autoclose: true
        });

        return;
    });
</script>