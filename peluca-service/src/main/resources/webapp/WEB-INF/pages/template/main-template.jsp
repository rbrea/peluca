<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras" prefix="tilesx" %>
<!DOCTYPE html>
<html class=" ">
<head>
        <title><tiles:insertAttribute name="title" /></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="icetea software" name="author" />

        <link rel="shortcut icon" href="${pageContext.request.contextPath}/app/public/assets/images/favicon.png" type="image/x-icon" />    <!-- Favicon -->
        <link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath}/app/public/assets/images/apple-touch-icon-57-precomposed.png">	<!-- For iPhone -->
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="${pageContext.request.contextPath}/app/public/assets/images/apple-touch-icon-114-precomposed.png">    <!-- For iPhone 4 Retina display -->
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="${pageContext.request.contextPath}/app/public/assets/images/apple-touch-icon-72-precomposed.png">    <!-- For iPad -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="${pageContext.request.contextPath}/app/public/assets/images/apple-touch-icon-144-precomposed.png">    <!-- For iPad Retina display -->




        <!-- CORE CSS FRAMEWORK - START -->
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/fonts/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/css/animate.min.css" rel="stylesheet" type="text/css"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" type="text/css"/>
        
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" media="screen"/>        
        
        <!-- CORE CSS FRAMEWORK - END -->
        <!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - START --> 
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/css/jquery.dataTables.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/TableTools/css/dataTables.tableTools.min.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/Responsive/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen"/>        
        <!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - END --> 

        <!-- CORE CSS TEMPLATE - START -->
        <link href="${pageContext.request.contextPath}/app/public/assets/css/style.css" rel="stylesheet" type="text/css"/>
        <link href="${pageContext.request.contextPath}/app/public/assets/css/responsive.css" rel="stylesheet" type="text/css"/>
        <!-- CORE CSS TEMPLATE - END -->

    </head>
    <!-- END HEAD -->

    <!-- BEGIN BODY -->
    <body class=" "><!-- START TOPBAR -->
        <tiles:insertAttribute name="topbar" />
        <!-- END TOPBAR -->
        <!-- START CONTAINER -->
        <div class="page-container row-fluid">

            <!-- SIDEBAR - START -->
            <tiles:insertAttribute name="sidebar" />
            <!--  SIDEBAR - END -->
            <!-- START CONTENT -->
            <section id="main-content" class=" ">
                <section class="wrapper main-wrapper" style=''>
                    <tiles:insertAttribute name="body" />
                </section>
            </section>
            <!-- END CONTENT -->
        </div>
        <!-- END CONTAINER -->
        <!-- LOAD FILES AT PAGE END FOR FASTER LOADING -->


        <!-- CORE JS FRAMEWORK - START --> 
        <script src="${pageContext.request.contextPath}/app/public/assets/js/jquery-1.11.2.min.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/js/jquery.easing.min.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/pace/pace.min.js" type="text/javascript"></script>  
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/viewport/viewportchecker.js" type="text/javascript"></script>  
        <!-- CORE JS FRAMEWORK - END --> 


        <!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - START --> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/rickshaw-chart/vendor/d3.v3.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/jquery-ui/smoothness/jquery-ui.min.js" type="text/javascript"></script> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/gauge/gauge.min.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/icheck/icheck.min.js" type="text/javascript"></script>
		<!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - START --> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/datatables/extensions/Responsive/bootstrap/3/dataTables.bootstrap.js" type="text/javascript"></script>
        <!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - END --> 
        <script src="${pageContext.request.contextPath}/app/public/assets/plugins/autosize/autosize.min.js" type="text/javascript"></script>

        <!-- CORE TEMPLATE JS - START --> 
        <script src="${pageContext.request.contextPath}/app/public/assets/js/scripts.js" type="text/javascript"></script> 
        <!-- END CORE TEMPLATE JS - END --> 

        <!-- Sidebar Graph - START --> 
        <!-- Sidebar Graph - END --> 

        <!-- General section box modal start -->
        <div class="modal" id="section-settings" tabindex="-1" role="dialog" aria-labelledby="ultraModal-Label" aria-hidden="true">
            <div class="modal-dialog animated bounceInDown">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Ajustes de Secci&oacute;n</h4>
                    </div>
                    <div class="modal-body">

                        Body goes here...

                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">Cerrar</button>
                        <button class="btn btn-success" type="button">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
    </body>
</html>

<script type="text/javascript">


</script>