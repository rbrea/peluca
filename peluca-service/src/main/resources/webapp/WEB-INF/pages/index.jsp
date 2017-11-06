<!-- Page heading -->
<div class="page-head">
	<h2 class="pull-left">
		<i class="fa fa-file-o"></i> Inicio
	</h2>

	<!-- Breadcrumb -->
	<div class="bread-crumb pull-right">
		<a href="${pageContext.request.contextPath}/app/html/index"><i class="fa fa-home"></i> Home</a>
		<!-- Divider -->
		<span class="divider">/</span> <a href="#" class="bread-current">Inicio</a>
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
						<div class="col-md-4">
							&nbsp;
						</div>
						<div class="col-md-4" style="text-align:center;">
							<h1 class="text-center">
								<a href="#"><span class="bold">CFA <img width="15%" src="${pageContext.request.contextPath}/app/public/img/inner/concrete-mixer-truck-scale.png"></span> Mixer</a>
							</h1>
						</div>
						<div class="col-md-4">
							&nbsp;
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- Matter ends -->
</div>

<script>

$(document).ready(function(){
	
	$("#sidebarHome").on("click", function(){
		$("#nav li").removeClass("open");
		$("li.has_sub ul li").removeClass("current");
		$(this).addClass("open");
		
		return;
	});
	
	return;
});

</script>