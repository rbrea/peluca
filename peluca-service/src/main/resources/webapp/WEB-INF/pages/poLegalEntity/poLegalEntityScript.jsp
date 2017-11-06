<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ValuesService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/CountryService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/model/LegalEntity.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/LegalEntityService.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/controller/rules/POLegalEntityController.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/rules/POLegalEntityUpload.js"></script>
<script
        src="${pageContext.request.contextPath}/app/public/js/app/service/ButtonsRulesAction.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/utils/Noty.js"></script>
<script src="${pageContext.request.contextPath}/app/public/js/app/service/catalog/CatalogueService.js"></script>


<script>
    $(document).ready(function() {

        $("#nav li").removeClass("open");
        $("li.has_sub ul li").removeClass("current");
        $("#sidebarRules").addClass("open");
        $("#optPOLegalEntity").addClass("current");
        POLegalEntityController.init();
        POLegalEntityUpload.init();

        $('#spEnabledDate').datetimepicker({
            pickTime : false,
            autoclose : true
        });

        return;
    });
</script>
