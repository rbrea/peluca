<!-- Sidebar -->
<div class="sidebar">
	<div class="sidebar-dropdown">
		<a href="#">Navigation</a>
	</div>

	<!--- Sidebar navigation -->
	<!-- If the main navigation has sub navigation, then add the class "has_sub" to "li" of main navigation. -->
	<ul id="nav">
		<!-- Main menu with font awesome icon -->
		<li id="sidebarHome" class="open">
			<a href="${pageContext.request.contextPath}/app/html/index"><i class="fa fa-home"></i> Inicio</a>
        </li>
		<li id="sidebarCatalogs" class="has_sub"><a href="#"><i class="fa fa-list-alt"></i>
				Cat&aacute;logos <span class="pull-right"><i
					class="fa fa-chevron-right"></i></span></a>
			<ul>
				<li id="optCatalogue"><a href="${pageContext.request.contextPath}/app/html/catalogue/index">ABM Cat&aacute;logos</a></li>
				<li id="optLegalEntities"><a href="${pageContext.request.contextPath}/app/html/legalEntity/index">Entidades Legales</a></li>
			</ul>
		</li>
		<li id="sidebarRules" class="has_sub"><a href="#"><i class="fa fa-list-alt"></i>
				Reglas <span class="pull-right"><i
					class="fa fa-chevron-right"></i></span></a>
			<ul>
				<li id="optProviderCodeRule"><a id="aProviderCodeRule" href="${pageContext.request.contextPath}/app/html/provider-code">Codigo Proveedores para Vuelo</a></li>
				<li id="optRuleCharge"><a id="aRuleCharge" href="${pageContext.request.contextPath}/app/html/rule-charge">Cobranza en Cuotas</a></li>
				<li id="optFictionalCharge"><a id="aFictionalCharge" href="${pageContext.request.contextPath}/app/html/fictional-charge">Entidades Legales Cobro Ficticio</a></li>
				<li id="optPaymentRefund"><a id="aPaymentRefund" href="${pageContext.request.contextPath}/app/html/payment-refund">Entidades Legales Cobro/Refund</a></li>
				<li id="optOracleLegalEntityInvoicing"><a href="${pageContext.request.contextPath}/app/html/oracleLegalEntityInvoicing">Entidades Legales para Facturaci&oacute;n</a></li>
				<li id="optOmLegalEntityPP"><a id="aOmLegalEntityPP" href="${pageContext.request.contextPath}/app/html/om-legal-entity-pp">Entidades Legales OM PP</a></li>
				<li id="optOmLegalEntityPAD"><a id="aOmLegalEntityPAD" href="${pageContext.request.contextPath}/app/html/om-legal-entity-pad">Entidades Legales OM PAD</a></li>
				<li id="optPOLegalEntity"><a id="aPOLegalEntity" href="${pageContext.request.contextPath}/app/html/po-legal-entity">Entidades Legales PO</a></li>
				<li id="optRuleSellType"><a id="aRuleSellType" href="${pageContext.request.contextPath}/app/html/rule-sell-type">Tipos de Venta</a></li>
			</ul>
		</li>
		<li id="sidebarTools" class="has_sub"><a href="#"><i class="fa fa-list-alt"></i>
			Herramientas <span class="pull-right"><i
					class="fa fa-chevron-right"></i></span></a>
			<ul>
				<li id="optEventReport"><a id="aEventReport" href="${pageContext.request.contextPath}/app/html/event-report">Reporte de Eventos</a></li>
			</ul>
		</li>
	</ul>
</div>
<!-- Sidebar ends -->