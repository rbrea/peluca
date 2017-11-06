<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras" prefix="tilesx" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<!-- Title and other stuffs -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="author" content="CFA">
		<title><tiles:insertAttribute name="title" /></title>
		<tiles:insertAttribute name="styles" />
		<tiles:insertAttribute name="scripts-header" />
		<!-- Favicon -->
	  	<link rel="shortcut icon" href="${pageContext.request.contextPath}/app/public/img/inner/concrete-mixer-truck-icon.jpg">
	  	<script>
	  		
	  		$(document).ready(
	  			function(){
	  				
			  		Constants.CONTEXT_ROOT = "${pageContext.request.contextPath}";
	  				
	  				return;
	  			}
	  		);
	  		
	  	</script>
	</head>
	<body>
		<tiles:insertAttribute name="header" />
		<tiles:insertAttribute name="menu" />
		<tilesx:useAttribute id="modals" name="modals" classname="java.util.List" ignore="true"/>  
		
		<tilesx:useAttribute name="title-search-form" id="titleSearch" />
		<tilesx:useAttribute name="view-url-pending" id="viewUrlPending" />
		<tilesx:useAttribute name="view-url-active" id="viewUrlActive" />
		
		<c:forEach var="modal" items="${modals}"> 
			<tiles:insertAttribute value="${modal}" flush="true" />
		</c:forEach>
		<div class="content">
			<tiles:insertAttribute name="sidebar" />
			<!-- Main bar -->
			<div class="mainbar">
				<div class="matter">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="container">
									<div class="row">
										<div class="col-md-12" style="text-align: center;">
											<div class="widget wgreen">
												<div class="widget-head">
													<div class="pull-left">
														<form id="frmExport" role="form" method="POST" enctype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
														</form>
														<ul class="list-inline">
															<li>
																<i class="glyphicon glyphicon-search"></i>&nbsp;${titleSearch}
															</li>

															<tiles:insertAttribute name="editButtons"/>

														</ul>
													</div>
													<div class="widget-icons pull-right">
														
															<button id="aproveSignal" class="btn btn-link btn-sm" title="info" style="display: none;color:red;">
																<i class="glyphicon glyphicon-exclamation-sign"></i>
															</button>
															
															<button id="btnGoToPending" onclick="location.href='${pageContext.request.contextPath}${viewUrlPending}'" class="btn btn-info btn-xs" title="Version Pendiente">
																<i class="fa fa-share"></i> ir a Pendiente de Activaci&oacute;n
															</button>
															
															<button id="btnGoToActive" onclick="location.href='${pageContext.request.contextPath}${viewUrlActive}'" class="btn btn-success btn-xs" title="Versi&oacute;n Activa">
																<i class="fa fa-reply-all fa-flip-horizontal" aria-hidden="true"></i> ir a Versi&oacute;n Activa
															</button>
													
														<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
													</div>
													<div class="clearfix"></div>
												</div>

												<tiles:insertAttribute name="ruleStateMessageRibbon" />

												<div class="widget-content">
													<div class="padd">
														<br />
														<tiles:insertAttribute name="search-module" />
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
									</div>
									<div class="row">
										<div class="col-md-12" style="text-align: center;">
											<div class="widget wgreen">
											
												<tilesx:useAttribute name="result-title" id="resultTitle" />
													
												<div class="widget-head">
													<div class="pull-left">
														<i class="glyphicon glyphicon-th-list"></i>&nbsp;${resultTitle}&nbsp;&nbsp;				
													</div>
													<div class="pull-left Edition">
															<a id="btnSpRemoveAll" href="javascript:void(0);" class="btn btn-xs btn-danger roleable ESCRITURA">
																<i class="glyphicon	glyphicon-trash" data-toggle="tooltip" data-placement="left" title="Borrar Seleccionados"></i>&nbsp;
															</a>
													</div>
													<div class="col-md-2">
													<i><b><button id="labelSelectAll" class="btn btn-link btn-xs" style="display:none;"><h4 id="allCheckText">marcar</h4></button></b></i>
													</div>
													<div class="widget-icons pull-right">
														<a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
													</div>
													<div class="clearfix"></div>
												</div>
												<div class="widget-content">
													<div class="padd">
														<br />
														<!-- Table Page -->
														<div class="page-tables">
															<tiles:insertAttribute name="result-module" />
														</div>
													</div>
												</div>
												<div class="widget-foot">
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
				<!-- Matter ends -->
			</div>
		</div>
		<tiles:insertAttribute name="inner-scripts" />
		<tiles:insertAttribute name="footer" />
		<tiles:insertAttribute name="scripts" />
	</body>
</html>