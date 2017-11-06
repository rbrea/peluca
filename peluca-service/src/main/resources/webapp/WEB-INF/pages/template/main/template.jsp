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
	<c:forEach var="modal" items="${modals}"> 
		<tiles:insertAttribute value="${modal}" flush="true" />
	</c:forEach>
	<div class="content">
		<tiles:insertAttribute name="sidebar" />
		<!-- Main bar -->
		<div class="mainbar">
			<tiles:insertAttribute name="body" />
		</div>
	</div>
	<tiles:insertAttribute name="footer" />
	<tiles:insertAttribute name="scripts" />
</body>
</html>