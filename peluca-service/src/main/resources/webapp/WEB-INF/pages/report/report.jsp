<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!-- Page heading -->
<div class="page-head">
    <h2 class="pull-left">
        <i class="fa fa-file-o"></i> Reporte de Eventos
    </h2>

    <!-- Breadcrumb -->
    <div class="bread-crumb pull-right">
        <a href="${pageContext.request.contextPath}/app/html/index"><i
                class="fa fa-home"></i> Inicio</a>
        <!-- Divider -->
        <span class="divider">/</span> <a href="#" class="bread-current">Reporte de Eventos</a>
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
                                        <form id="frmRuleSellPointExport" role="form" method="POST"
                                              enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                        </form>
                                        <ul class="list-inline EVENT_REPORT">
                                            <li><i class="glyphicon glyphicon-search"></i>&nbsp;B&uacute;squeda
                                                de Eventos
                                            </li>

                                            <tiles:insertAttribute name="editButtons"/>

                                        </ul>
                                    </div>

                                    <div class="widget-icons pull-right">
                                        <a href="#" class="wminimize"><i class="fa fa-chevron-down"></i></a>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                                <div class="widget-content" >
                                    <div class="padd">

                                        <br/>
                                        <!-- Form starts.  -->
                                        <form id="frmFilterRuleSellPoint" class="form-horizontal EVENT_REPORT"
                                              role="form">

                                            <div class="form-group">

                                                <label for="filterSpDateFrom" class="control-label col-md-1">Fecha Desde</label>
                                                <div class="col-md-3">
                                                    <div id="filterSpDateFrom"
                                                         class="input-append input-group dtpicker">
                                                        <input data-format="yyyy-MM-dd" type="text"
                                                               class="form-control">
                                                        <span class="input-group-addon add-on">
                                                            <i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
                                                        </span>
                                                    </div>
                                                </div>

                                                <label for="filterSpDateTo" class="control-label col-md-1">Fecha Hasta</label>
                                                <div class="col-md-3">
                                                    <div id="filterSpDateTo" class="input-append input-group dtpicker">
                                                        <input data-format="yyyy-MM-dd" type="text"
                                                               class="form-control">
                                                        <span class="input-group-addon add-on">
                                                            <i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>
                                                        </span>
                                                    </div>
                                                </div>

                                                <label for="filterSpXClient"
                                                       class="control-label col-md-1">Cliente</label>
                                                <div class="col-md-3">
                                                    <input type="text" id="filterSpXClient" class="form-control"/>
                                                </div>

                                            </div>

                                            <div class="form-group">
                                                <label for="filterSpRule" class="control-label col-md-1">Servicio /Regla</label>
                                                <div class="col-md-3">
                                                    <select id="filterSpRule" class="form-control">
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
                                        <i class="glyphicon glyphicon-th-list"></i>&nbsp;Eventos&nbsp;&nbsp;

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
                                                <table cellpadding="0" cellspacing="0" border="0" id="tSpResult" width="100%">
                                                    <thead>
                                                    <tr style="font-weight:bold;">
                                                        <th class="centered">Cliente</th>
                                                        <th class="centered">Servicio/Regla</th>
                                                        <th class="centered">Fecha</th>
                                                        <th class="centered">Estado</th>
                                                        <th class="centered">Tiempo de Respuesta</th>
                                                        <th class="centered">Intercambio</th>
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
                                    <div class="row"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Matter ends -->

<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/controller/report/EventReportController.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/rules/EventReportService.js"></script>

<script>
    $(document).ready(function() {

        $("#nav li").removeClass("open");
        $("li.has_sub ul li").removeClass("current");
        $("#sidebarTools").addClass("open");
        $("#optEventReport").addClass("current");
        EventReportController.init();

    });
</script>
