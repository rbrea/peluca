LegalEntityOmPPService = function () {
}

LegalEntityOmPPService.firstAdd= true;

LegalEntityOmPPService.showAddOrUpdateCombo = function(){
    $("#spProductType").focus();
    if ($("#ruleSellTypeFlag").val() == "A") {
        $("#spProductTypeUnique").next().addClass("hide");
        $("#spProductType").next().removeClass("hide");

        $("#spCountrySiteUnique").next().addClass("hide");
        $("#spCountrySite").next().removeClass("hide");
        $("#spCountryProviderUnique").next().addClass("hide");
        $("#spCountryProvider").next().removeClass("hide");
    } else {
        $("#spProductType").next().addClass("hide");
        $("#spProductTypeUnique").next().removeClass("hide");

        $("#spCountrySite").next().addClass("hide");
        $("#spCountrySiteUnique").next().removeClass("hide");
        $("#spCountryProvider").next().addClass("hide");
        $("#spCountryProviderUnique").next().removeClass("hide");
    }	
};

LegalEntityOmPPService.init = function () {

    $("#btnSpReset").on("click", function (e) {
        e.preventDefault();

        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("select").each(function () {
            $(this).children("option:first").prop("selected", true);
        });
        $("#filterSpCountrySite option:selected").removeAttr("selected");
        $('#filterSpCountrySite').multiselect("refresh");
        $("#filterLegalEntity option:selected").removeAttr("selected");
        $('#filterLegalEntity').multiselect("refresh");

        return;
    });

    $("#btnMakeComment").on("click", function () {
        $("#modalCommentRule").modal('show');
    });

    $("#modalCommentRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showCommentsRule("OM_LEGAL_ENTITY_PP", "EDITION");
        return;
    });

    $("#btnSubscritNotification").on("click", function () {
        $("#modalSubscriptionRule").modal('show');
    });

    $("#modalSubscriptionRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showSubcriptionOption("OM_LEGAL_ENTITY_PP");
        return;
    });

    $("#btnSendToApproval").on(
        "click",
        function () {
            ButtonsRulesAction.showNoty(
                "Cambiar Estado a: 'Pendiente de Aprobacion'??",
                "topCenter", "warning", true, function () {
                    return ButtonsRulesAction.updateRuleStatus(
                        "OM_LEGAL_ENTITY_PP",
                        "btnReleaseVersion",
                        "WATING_APPROVAL");
                });
            return;
        });

    $("#btnBackToEdition").on(
        "click",
        function () {
            ButtonsRulesAction
                .showNoty("Volver a Estado de: 'Edicion'??",
                    "topCenter", "warning", true, function () {
                        return ButtonsRulesAction.updateRuleStatus(
                            "OM_LEGAL_ENTITY_PP",
                            "btnReleaseVersion",
                            "EDITION");
                    });
            return;
        });

    $('#modalAddRule').on('hidden.bs.modal', function (e) {

        LegalEntityOmPPService.reset();

        return;
    });

    $('#modalAddRule').on('show.bs.modal', function (e) {
    	if(LegalEntityOmPPService.firstAdd){
    		LegalEntityOmPPService.firstAdd = false;
    		LegalEntityOmPPService.initQCountry(null, "PAIS", [$("#spCountrySite"),$("#spCountrySiteUnique")],false, false,LegalEntityOmPPService.showAddOrUpdateCombo);
    		LegalEntityOmPPService.initQCatalog(null, "TIPO DE PRODUCTO",[$("#spProductType"),$("#spProductTypeUnique")],false, true, function(){
				ValuesService.applyMultiselect($("#spProductType,#spProductTypeUnique"));
				LegalEntityOmPPService.showAddOrUpdateCombo();
			});
    		
    		LegalEntityOmPPService.initQCatalog(null, "TIPO DE VENTA",[$("#spSellType")],true, false);
    	}else{
    		LegalEntityOmPPService.showAddOrUpdateCombo();
    	}
        return;
    });

    $("#btnAddSellType").on("click", function () {

        LegalEntityOmPPService.add();

        return;
    });

    $("#labelSelectAll").on(
        "click",
        function () {
            var rows = $('#tSpResult').dataTable().fnGetNodes();
            $.each(rows, function (index, value) {
                var check = $(this).find(
                    "input[type='checkbox'][id*='selectedRow_']");
                check.prop("checked", true);
            });
            $("#labelSelectAll").hide();
        });

    $("#spSelectAll")
        .on(
            "click",
            function () {
                var isChecked = $(this).prop("checked");
                var rows = $('#tSpResult').dataTable().fnGetNodes();
                if (isChecked) {
                    if (rows.length > $('#tSpResult').dataTable()
                            .fnSettings()._iDisplayLength) {
                        $("#labelSelectAll").show();
                        $("#allCheckText").text(
                            "Seleccionar los " + rows.length
                            + " registros totales");
                    }
                    ;
                    $("input[type='checkbox'][id*='selectedRow_']")
                        .each(function () {
                            $(this).prop("checked", isChecked);
                            return;
                        });
                } else {
                    $("#labelSelectAll").hide();
                    $
                        .each(
                            rows,
                            function (index, value) {
                                var check = $(this)
                                    .find(
                                        "input[type='checkbox'][id*='selectedRow_']");
                                check
                                    .prop("checked",
                                        isChecked);
                            });
                }
                return;
            });

    $("#btnSpRemoveAll")
        .on(
            "click",
            function () {
                var list = [];

                var rows = $('#tSpResult').dataTable().fnGetNodes();

                $
                    .each(
                        rows,
                        function (index, value) {
                            var check = $(this)
                                .find(
                                    "input[type='checkbox'][id*='selectedRow_']:checked");
                            var id = check.parent().parent()
                                .data("idlist");

                            if (Commons.isValid(id)) {
                                var ids = id.split(',');

                                for (var k = 0; k < ids.length; k++) {
                                    list.push(ids[k]);
                                }
                            }
                        });

                if (list.length > 0) {
                    ButtonRemove.remove(list, "om-legal-entity-pp", "#tSpResult", "rowid", LegalEntityOmPPService.getLastVersion);
                } else {
                    noty(
                        {
                            text: '<strong>No ha seleccionado ningún elemento para borrar.</strong>',
                            layout: 'topRight',
                            type: 'warning',
                            timeout: 5000,
                            animation: {
                                open: 'animated bounceInDown', // Animate.css class names
                                close: 'animated bounceOutUp', // Animate.css class names
                                easing: 'swing', // unavailable - no need
                                speed: 500 // unavailable - no need
                            }
                        }
                    );
                }
                return;
            });


    $("#btnSpSearch").on("click", function () {

        var params = [];

        params.push(RestConnector.buildPair("productType", $(
            "#filterSpProductType").val()));
        params.push(RestConnector.buildPair("countryCodeSite", $(
            "#filterSpCountrySite").val()));
        params.push(RestConnector.buildPair("affiliatedAgency", $(
            "#filterSpAffiliatedAgency").val()));
        params.push(RestConnector.buildPair("sellType", $("#filterSpSellType").val()));

        params.push(RestConnector.buildPair("legalEntityCode", $("#filterLegalEntity").val()));


        LegalEntityOmPPService.get(params);

        return;
    });

    LegalEntityOmPPService.get();
    LegalEntityService.get(LegalEntityOmPPService.legalEntityHandler); 
    LegalEntityOmPPService.initQCatalog(null, "TIPO DE PRODUCTO",[$("#filterSpProductType")],true, true);
    LegalEntityOmPPService.initQCatalog(null, "TIPO DE VENTA",[$("#filterSpSellType")],true, true);

    LegalEntityOmPPService.initQCountry(null, "PAIS", [$("#filterSpCountrySite")],null, true, function(){
        $("#filteredSearch").show();
    });
    LegalEntityOmPPService.showActionButtons();

    $("#btnImport").tooltip();
    $('#btnAddRule').tooltip();
    $('#btnRuleExport').tooltip();
    $('#btnReleaseVersion').tooltip();
    $("#btnRuleExport").on(
        "click",
        function () {
            $('#btnSubscritNotification').tooltip();
            $("#frmRuleSellPointExport").attr(
                "action",
                Constants.CONTEXT_ROOT
                + "/app/service/om-legal-entity-pp/xls");
            $("#frmRuleSellPointExport").submit();

            return;
        });

    $("#btnReleaseVersion")
        .on(
            "click",
            function () {
                noty({
                    text: '<div class="noty_message"><span class="noty_text">Esta seguro de aprobar esta version? Ingrese fecha de inicio:</span>'
                    + '<div id="spNewVersionDate" class="input-append input-group dtpicker">'
                    + '<input data-format="dd/MM/yyyy" type="text" class="form-control">'
                    + '<span class="input-group-addon add-on">'
                    + '<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>'
                    + '</span></div></div><div class="noty_close"></div>',
                    modal: true,
                    layout: 'topCenter',
                    type: "error",
                    callback: {

                        onShow: function () {
                            $('#spNewVersionDate').datetimepicker({
                                pickTime: false,
                                autoclose: true
                            });

                            $('.bootstrap-datetimepicker-widget').css(
                                'z-index', 99999999999999);
                            $('#spNewVersionDate').datepicker(
                                'setDate', new Date());
                        },
                        afterShow: function () {
                        },
                        onClose: function () {
                        },
                        afterClose: function () {
                        },
                        onCloseClick: function () {
                        },

                    },
                    animation: {
                        open: 'animated bounceIn', // Animate.css class
                        // names
                        close: 'animated flipOutX', // Animate.css
                        // class names
                        easing: 'swing', // unavailable - no need
                        speed: 500
                        // unavailable - no need
                    },
                    buttons: [
                        {
                            addClass: 'btn btn-success sm',
                            text: 'Aceptar',
                            onClick: function ($noty) {
                                var versionDate = $(
                                    "#spNewVersionDate")
                                    .children('input').val();
                                if (Commons.isBlank(versionDate)) {
                                    noty({
                                        text: '<strong>La fecha de inicio es obligatoria</strong>',
                                        layout: 'topRight',
                                        type: 'error',
                                        timeout: 5000,
                                        animation: {
                                            open: 'animated bounceInDown', // Animate.css
                                            // class
                                            // names
                                            close: 'animated bounceOutUp', // Animate.css
                                            // class
                                            // names
                                            easing: 'swing', // unavailable
                                            // - no
                                            // need
                                            speed: 500
                                            // unavailable - no need
                                        }
                                    });

                                    return false;
                                }
                                LegalEntityOmPPService
                                    .relaseNewVersion(versionDate);
                                $noty.close();
                            }
                        }, {
                            addClass: 'btn btn-default sm',
                            text: 'Cancelar',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }]
                });

                return;
            });

    $("#frmRuleSellPointExport").on(
        'submit',
        function () {
            $("#frmRuleSellPointExport").find("input[type='hidden']").remove();

            Commons.makeSubmitUrl("productType", $("#filterSpProductType").val(), '#frmRuleSellPointExport');
            Commons.makeSubmitUrl("countryCodeSite", $("#filterSpCountrySite").val(),'#frmRuleSellPointExport');
            Commons.makeSubmitUrl("affiliatedAgency", $("#filterSpAffiliatedAgency").val(), '#frmRuleSellPointExport');
            Commons.makeSubmitUrl("sellType", $("#filterSpSellType").val(), '#frmRuleSellPointExport');

            return;
        });

    $("#btnRevisionAudited").on("click", function () {
        $('.auditoria').width('80%');
        LegalEntityOmPPService.getAuditedByCode();
    });
    
    LegalEntityOmPPService.getLastVersion();
    
    return;
}

LegalEntityOmPPService.showActionButtons = function () {
    ButtonsRulesAction.showSubscritNotificationButton();
    ButtonsRulesAction.showAddButton();
    ButtonsRulesAction.showLoadRuleButton();
    ButtonsRulesAction.showRuleExportButton();
    ButtonsRulesAction.showMakeCommentButton();
    ButtonsRulesAction.showRevisionAuditedButton();
};

LegalEntityOmPPService.reset = function () {

    $("#spProductType option:selected").removeAttr("selected");
    $("#spProductType").multiselect('refresh');
    $("#spCountrySite option:selected").removeAttr("selected");
    $("#spCountrySite").multiselect('refresh');
    $("#leInvoicingLegalEntityType option:selected").removeAttr("selected");
    $('#leInvoicingLegalEntityType').multiselect("refresh");
    $("#spAffiliatedAgency > option:first").prop("selected", true);
    // $("#spAffiliatedAgency").multiselect('refresh');
    $("#spEnabledDate").children('input').val("");
    $("#spSellType > option:first").prop("selected", true);
    // $("#spSellType").multiselect('refresh');
    $("#ruleSellTypeFlag").val("A");
    $("#ruleSellTypeId").val("");

    $("#spProductTypeUnique option:selected").removeAttr("selected");
    $("#spProductTypeUnique").multiselect('refresh');
    $("#spCountrySiteUnique option:selected").removeAttr("selected");
    $("#spCountrySiteUnique").multiselect('refresh');
    $("#spCountryProviderUnique option:selected").removeAttr("selected");
    $("#spCountryProviderUnique").multiselect('refresh');

    return;
}

LegalEntityOmPPService.add = function () {

    var validator = $("#frmAddRuleSellType").validate();

    validator.element("#spAffiliatedAgency");
    validator.element("#spSellType");

    var producList = $("#spProductType > option:selected");
    var countrySitList = $("#spCountrySite > option:selected");
    var LEOMPPList = $("#leInvoicingLegalEntityType > option:selected");

    var emptyList = producList.length == 0 || countrySitList.length == 0
        || LEOMPPList.length == 0;

    if (emptyList & $("#ruleSellTypeFlag").val() != "U") {
        noty({
            text: '<strong>Todos los campos son requeridos !!!</strong>',
            layout: 'topCenter',
            type: 'error',
            timeout: 10000,
            animation: {
                open: 'animated bounceInDown', // Animate.css class names
                close: 'animated bounceOutUp', // Animate.css class names
                easing: 'swing', // unavailable - no need
                speed: 500
                // unavailable - no need
            }
        });
    }

    if (!validator.valid() || (emptyList & $("#ruleSellTypeFlag").val() != "U")) {
        return false;
    }

    var $type = "POST";
    var obj = new Object();
    if ($("#ruleSellTypeFlag").val() == "U") {
        $type = "PUT";
        obj.id = $("#ruleSellTypeId").val();
        obj.productType = $("#spProductTypeUnique").val();
        obj.countryCodeSite = $("#spCountrySiteUnique").val();
        obj.countryCodeProvider = $("#spCountryProviderUnique").val();
    } else {
        /*
         * var validator = $("#frmAddRuleSellType").validate();
         * validator.element("#spProductType");
         * validator.element("#spCountrySite");
         * validator.element("#spCountryProvider"); validator.element("#spSsn");
         * validator.element("#spSupplier"); validator.element("#spGateway");
         * validator.element("#spAssistanceType");
         * validator.element("#spAffiliatedAgency");
         * validator.element("#spPrepayment");
         * validator.element("#spEnabledDate");
         * validator.element("#spSellType");
         * 
         * if(!validator.valid()){ return false; }
         */
        obj.productTypeList = [];
        obj.countrySiteList = [];
        obj.countryProviderList = [];

        var optProductTypeList = $("#spProductType > option:selected");

        $.each(optProductTypeList, function () {
            obj.productTypeList.push($(this).val());

            return;
        });

        var optCountrySiteList = $("#spCountrySite > option:selected");
        $.each(optCountrySiteList, function () {
            obj.countrySiteList.push($(this).val());

            return;
        });

        var optCountryProviderList = $("#spCountryProvider > option:selected");
        $.each(optCountryProviderList, function () {
            obj.countryProviderList.push($(this).val());

            return;
        });
    }

    obj.sourceSystemNumber = $("#spSsn").val();

    obj.supplier = $("#spSupplier").val();
    obj.gateway = $("#spGateway").val();
    obj.assistanceType = $("#spAssistanceType").val();
    obj.afiliated = $("#spAffiliatedAgency").val();
    obj.prepayment = $("#spPrepayment").val();
    obj.ruleStartDate = $("#spEnabledDate").children('input').val();
    obj.sellType = $("#spSellType").val();
    obj.legalEntityCode = $("#leInvoicingLegalEntityType").val();
    obj.legalEntityDescription = $("#leInvoicingLegalEntityType").val();

    var $data = Commons.toJsonSnakeCase(obj);

    $.ajax({
        type: $type,
        url: Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pp",
        dataType: 'json',
        data: $data,
        contentType: "application/json;",
        success: function (data) {

            $("#ruleSellTypeFlag").val("A");

            if (data != null && data.status == 0) {

                LegalEntityOmPPService.reset();
                $("#modalAddRule").modal("hide");

                var table = $('#tSpResult').DataTable();
                table.clear().draw();
                LegalEntityOmPPService.get();

                return;
            } else {
                noty({
                    text: '<strong>Ups! Mensaje: ' + data.message
                    + '</strong>',
                    layout: 'topRight',
                    type: 'alert',
                    timeout: 10000,
                    animation: {
                        open: 'animated bounceInDown', // Animate.css class
                        // names
                        close: 'animated bounceOutUp', // Animate.css class
                        // names
                        easing: 'swing', // unavailable - no need
                        speed: 500
                        // unavailable - no need
                    }
                });
            }

            return;
        },
        error: function (data) {
            noty({
                text: '<strong>Error al intentar dar de Alta. Mensaje: '
                + data.responseJSON.cause + '</strong>',
                layout: 'topRight',
                type: 'error',
                timeout: 10000,
                animation: {
                    open: 'animated bounceInDown', // Animate.css class names
                    close: 'animated bounceOutUp', // Animate.css class names
                    easing: 'swing', // unavailable - no need
                    speed: 500
                    // unavailable - no need
                }
            });

            return;
        }
    });

    return;
}

LegalEntityOmPPService.get = function (params) {

    var settings = new Object();
    settings.url = "om-legal-entity-pp";
    if (params == null || params === undefined) {
        params = [];
    }
    settings.params = params;
    settings.handler = LegalEntityOmPPService.handler;
    RestConnector.get(settings);
    $("#labelSelectAll").hide();
    return;
}

LegalEntityOmPPService.legalEntityHandler = function (data) {

    var leType = $("#leInvoicingLegalEntityType");
    var filterLe = $("#filterLegalEntity");

    $.each(data, function () {

        var le = this;

        leType.append($("<option value='" + le.code + "'>" + le.description
            + "</option>"));
        filterLe.append($("<option value='" + le.code + "'>" + le.description
            + "</option>"));

        return;
    });

    leType.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });
    filterLe.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });

    return;
}

LegalEntityOmPPService.handler = function (data) {
    var table = $("#tSpResult")
        .dataTable(
            {
                "fnInitComplete": function () {
                    $('#tSpResult tbody tr').each(
                        function () {
                            $(this).find('td:eq(2)').attr('nowrap',
                                'nowrap');
                            $(this).find('td:eq(3)').attr('nowrap',
                                'nowrap');

                            return;
                        });

                    return;
                },
                "bDestroy": true,
                responsive: false,
                "createdRow": function (row, data, index) {
                    $(row).attr("id", "rowid_" + data.id);
                    $(row).data('rowid', data.id);
                    var idList = Commons.buildIdList(data.id_list);

                    $(row).data('idlist', idList);

                    return;
                },
                "drawCallback": function () {
                	PermissionService.doJobWithRoleables();
                    return;
                },
                "data": data,
                "iDisplayLength": 50,
                "columns": [
                    {
                        "className": 'centered Edition',
                        "orderable": false,
                        "render": function (data, type, row) {

                            return "<input type='checkbox' id='selectedRow_"
                                + row.id + "' value='X'>";
                        }
                    },
                    {
                        "className": 'centered',
                        "orderable": false,
                        "render": function (data, type, row) {

                            var toShow = "[";

                            var list = row.product_type_description_list;
                            if (list != null && list != "") {
                                var flag = true;
                                $.each(list, function () {

                                    if (flag) {
                                        toShow += "" + this;
                                        flag = false;
                                    } else {
                                        toShow += "," + this;
                                    }

                                    return;
                                });
                            }

                            toShow += "]";

                            return "<b>" + toShow + "</b>";
                        }
                    },
                    {
                        "className": 'centered',
                        "orderable": true,
                        "data": "country_code_site"
                    },
                    {
                        "className": 'centered',
                        "orderable": true,
                        "data": "afiliated_description"
                    },
                    {
                        "className": 'centered',
                        "orderable": true,
                        "data": "sell_type_description"
                    },
                    {
                        "className": 'centered highlight',
                        "orderable": true,
                        "data": "legal_entity_description"
                    },
                    {
                        "className": 'centered Edition',
                        "orderable": false,
                        "render": function (data, type, row) {
                            var idList = Commons
                                .buildIdList(row.id_list);

                            return "<span><a id='rowRemoveBtn_"
                                + row.id
                                + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:LegalEntityOmPPService.removeOnly(\""
                                + idList
                                + "\");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>";
                        }
                    }],
                "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por p&aacute;gina",
                    "zeroRecords": "No se ha encontrado ningun elemento",
                    "info": "P&aacute;gina _PAGE_ de _PAGES_ <b>(Total: _MAX_)</b>",
                    "infoEmpty": "No hay registros disponibles",
                    "infoFiltered": "", // "(filtrados de un total
                    // de _MAX_ registros)",
                    "search": "Buscar: ",
                    "paginate": {
                        "previous": "<i class='glyphicon glyphicon-step-backward'></i>",
                        "next": "<i class='glyphicon glyphicon-step-forward'></i>"
                    }
                }
            });
    return;
}

LegalEntityOmPPService.update = function (id) {

    $("#ruleSellTypeFlag").val("U");
    $("#ruleSellTypeId").val(id);

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/om-legal-entity-pp?id="
        + id,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null && data.length == 1) {

                var entity = data[0];
                Commons.setOptionValue("spProductTypeUnique",
                    entity.product_type);
                Commons.setMultiselectOptionValue("spCountrySiteUnique",
                    entity.country_code_site);
                // Commons.setOptionValue("spAffiliatedAgency",
                // entity.afiliated);
                // Commons.setOptionValue("spSellType", entity.sell_type);
                $("#spAffiliatedAgency").val(entity.afiliated);
                $("#spSellType").val(entity.sell_type);
                $("#leInvoicingLegalEntityType").val(entity.legal_entity_code);
                $("#leInvoicingLegalEntityType").multiselect('refresh');

                $('#spEnabledDate').children('input').val(
                    entity.rule_start_date);

                $("#modalAddRule").modal("show");

                return;
            } else {
                noty({
                    text: '<strong>Ups! Mensaje: ' + data.message
                    + '</strong>',
                    layout: 'topRight',
                    type: 'alert',
                    timeout: 10000,
                    animation: {
                        open: 'animated bounceInDown', // Animate.css class
                        // names
                        close: 'animated bounceOutUp', // Animate.css class
                        // names
                        easing: 'swing', // unavailable - no need
                        speed: 500
                        // unavailable - no need
                    }
                });
            }

            return;
        },
        error: function (data) {
            noty({
                text: '<strong>Se ha producido un error, mensaje: '
                + data.responseJSON.cause + '</strong>',
                layout: 'topRight',
                type: 'error',
                timeout: 10000,
                animation: {
                    open: 'animated bounceInDown', // Animate.css class names
                    close: 'animated bounceOutUp', // Animate.css class names
                    easing: 'swing', // unavailable - no need
                    speed: 500
                    // unavailable - no need
                }
            });

            return;
        }
    });

    return;
}

LegalEntityOmPPService.removeOnly = function (id) {

    return ButtonRemove.removeOnly(id, "om-legal-entity-pp", "#tSpResult", "rowid", LegalEntityOmPPService.getLastVersion);
}

LegalEntityOmPPService.countryHandler = function (countryList) {

    var firstOption = new Object();
    firstOption.value = "*";
    firstOption.description = "*";

    CountryService.doComboFill($('#spCountrySite'), countryList, firstOption);
    CountryService.doComboFill($('#spCountrySiteUnique'), countryList,
        firstOption);
    CountryService.doComboFill($('#filterSpCountrySite'), countryList,
        firstOption, true);

    return;
}

LegalEntityOmPPService.getAuditedByCode = function () {

    $('#modalRuleSellTypeAuditedTable').modal('show');
    $('.auditoria').width('80%');
    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT
        + "/app/service/audited/om-legal-entity-pp",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {

            $("#auditedRuleSellTypeTable").DataTable().destroy();
            RestConnector
                .appendTemplateResults(data,
                    "#auditedRuleSellTypeTableBody",
                    "#rowSellTypeAuditedSheet");
            $("#auditedRuleSellTypeTable").DataTable({
                "order": {
       			   "columnDefs": [ {
   		    	      "targets"  : 'no-sort',
   		    	      "orderable": true,
   		    	    }]
   		   		}
            });
        },
        error: function (data) {
            console.log(data);
        }
    });
}

LegalEntityOmPPService.relaseNewVersion = function (versionDate) {

    $.ajax({
        type: "POST",
        url: Constants.CONTEXT_ROOT
        + "/app/service/om-legal-entity-pp/newVersion?versionDate="
        + versionDate,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data.status == 0) {
                ButtonsRulesAction.showNoty(
                    "Nueva version Actualizada con exito!! ", "topRight",
                    "success", false)
                LegalEntityOmPPService.getLastVersion();
                ButtonsRulesAction.getInfoRuleStatus("RULE_CHARGE",
                    "btnRuleChargeRelaseVersion");
            } else {
                ButtonsRulesAction.showNoty(
                    "Ups! Error en release de nueva version", "topRight",
                    "alert", false);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

LegalEntityOmPPService.getLastVersion = function () {

    $
        .ajax({
            type: "GET",
            url: Constants.CONTEXT_ROOT
            + "/app/service/release-version-log/lastVersion?type=OM_LEGAL_ENTITY_PP&activated=true",
            dataType: 'json',
            contentType: "application/json;",
            success: function (data) {
                if (data != null) {
                    $("#versionBox").removeClass("hide");
                    $("#headerVersion").text(data.version + ".0");
                }
            },
            error: function (data) {
                console.log(data);
            }
        });

    ButtonsRulesAction.getInfoRuleStatus("OM_LEGAL_ENTITY_PP",
        "btnReleaseVersion");

}

LegalEntityOmPPService.initQCatalog = function(params, catalogType, comboElementLisT,firstOption, blankOptionEnabled, toResponseFunction){
	var settings = new Object();
	settings.url = "catalogue";
	if(params == null || params === undefined){
		params = [];
	}
	params.push({"name" : "catalogueTypeDescription", "value": catalogType});
	settings.params = params;
	settings.handler = function(list){
		 $.each(comboElementLisT, function(key, value) {
			 	ValuesService.buildCombo(value, list, firstOption, blankOptionEnabled);
		 });
		if (toResponseFunction != null && toResponseFunction != undefined){
			toResponseFunction();
		}
	};
	return RestConnector.qGet(settings);
}

LegalEntityOmPPService.initQCountry = function(params, catalogType, comboElementList,firstOption, blankOptionEnabled, toResponseFunction){
	
	var settings = new Object();
	settings.url = "catalogue";
	if(params == null || params === undefined){
		params = [];
	}
	params.push({"name" : "catalogueTypeDescription", "value": catalogType});
	settings.params = params;
	settings.handler = function(countryList){
	 $.each( comboElementList, function( key, value ) {
			CountryService.doComboFill(value, countryList, firstOption, blankOptionEnabled);
		});
		$("#filteredSearch").show();
		if (toResponseFunction != null && toResponseFunction != undefined){
			toResponseFunction();
		}
	};
	return RestConnector.qGet(settings);
}
