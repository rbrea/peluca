POLegalEntityService = (function () {
    var services = {

    };
})();

POLegalEntityService.init = function () {

    $("#btnSpReset").on("click", function (e) {
        e.preventDefault();

        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("select").each(function () {
            $(this).children("option:first").prop("selected", true);
        });
        $('#filterSpCountrySite :selected').removeAttr("selected");
        $('#filterSpCountrySite').multiselect("refresh");
        $('#filterSpCountryDestiny :selected').removeAttr("selected");
        $('#filterSpCountryDestiny').multiselect("refresh");
        $('#filterSpLegalEntity').multiselect("refresh");

        return;
    });

    $("#btnMakeComment").on("click", function () {
        $("#modalCommentRule").modal('show');
    });

    $("#modalCommentRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showCommentsRule("PO_LEGAL_ENTITY", "EDITION");
        return;
    });

    POLegalEntityService.showActionButtons();

    $("#btnSendToApproval").on("click", function () {
        ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("PO_LEGAL_ENTITY", "btnReleaseVersion", "WATING_APPROVAL");
        });
        return;
    });

    $("#btnBackToEdition").on("click", function () {
        ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("PO_LEGAL_ENTITY", "btnReleaseVersion", "EDITION");
        });
        return;
    });

    $('#modalAddRule').on('hidden.bs.modal', function (e) {

        POLegalEntityService.reset();

        return;
    });

    $("#btnSubscritNotification").on("click", function(){
        $("#modalSubscriptionRule").modal('show');
    });

    $("#modalSubscriptionRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showSubcriptionOption("PO_LEGAL_ENTITY");
        return;
    });

    $('#modalAddRule').on('show.bs.modal', function (e) {

        $("#spProductType").focus();
        if ($("#ruleSellTypeFlag").val() == "A") {
            $("#spProductTypeUnique").next().addClass("hide");
            $("#spProductType").next().removeClass("hide");

            $("#spCountrySiteUnique").next().addClass("hide");
            $("#spCountrySite").next().removeClass("hide");
            $("#spCountryDestinyUnique").next().addClass("hide");
            $("#spCountryDestiny").next().removeClass("hide");
            $("#spCountryProviderUnique").next().addClass("hide");
            $("#spCountryProvider").next().removeClass("hide");
        } else {
            $("#spProductType").next().addClass("hide");
            $("#spProductTypeUnique").next().removeClass("hide");

            $("#spCountrySite").next().addClass("hide");
            $("#spCountrySiteUnique").next().removeClass("hide");
            $("#spCountryDestiny").next().addClass("hide");
            $("#spCountryDestinyUnique").next().removeClass("hide");
            $("#spCountryProvider").next().addClass("hide");
            $("#spCountryProviderUnique").next().removeClass("hide");
        }

        return;
    });

    $("#btnAddSellType").on("click", function () {

        POLegalEntityService.add();

        return;
    });

    $("#labelSelectAll").on("click", function () {
        var rows = $('#tSpResult').dataTable().fnGetNodes();
        $.each(rows, function (index, value) {
            var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
            check.prop("checked", true);
        });
        $("#labelSelectAll").hide();
    });

    $("#spSelectAll").on("click", function () {
        var isChecked = $(this).prop("checked");
        var rows = $('#tSpResult').dataTable().fnGetNodes();
        if (isChecked) {
            if (rows.length > $('#tSpResult').dataTable().fnSettings()._iDisplayLength) {
                $("#labelSelectAll").show();
                $("#allCheckText").text("Seleccionar los " + rows.length + " registros totales");
            }
            ;
            $("input[type='checkbox'][id*='selectedRow_']").each(function () {
                $(this).prop("checked", isChecked);
                return;
            });
        } else {
            $("#labelSelectAll").hide();
            $.each(rows, function (index, value) {
                var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
                check.prop("checked", isChecked);
            });
        }
        return;
    });

    $("#btnSpRemoveAll").on("click", function () {
        var list = [];

        var rows = $('#tSpResult').dataTable().fnGetNodes();

        $.each(rows, function (index, value) {
            var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
            var id = check.parent().parent().data("idlist");

            if (Commons.isValid(id)) {
                var ids = id.split(',');

                list = list.concat(ids);
            }
        });

        if (list.length > 0) {
            ButtonRemove.remove(list,"po-legal-entity","#tSpResult","rowid",POLegalEntityService.getLastVersion);
        } else {
            Noty.notyTopRightWarning('No ha seleccionado ningún elemento para borrar.');
        }

        return;
    });

    $("#btnSpSearch").on("click", function () {

        var params = [];

        params.push(RestConnector.buildPair("productType", $("#filterSpProductType").val()));
        params.push(RestConnector.buildPair("countryCodeSite", $("#filterSpCountrySite").val()));
        params.push(RestConnector.buildPair("countryCodeDestiny", $("#filterSpCountryDestiny").val()));
        params.push(RestConnector.buildPair("sellType", $("#filterSpSellType").val()));
        params.push(RestConnector.buildPair("model", $("#filterSpModel").val()));
        params.push(RestConnector.buildPair("virtualCreditCard", $("#filterSpVCC").val()));
        params.push(RestConnector.buildPair("legalEntityCode", $("#filterSpLegalEntity").val()));

        POLegalEntityService.get(params);

    });

    POLegalEntityService.get();
    LegalEntityService.get(POLegalEntityService.legalEntityHandler);
    POLegalEntityService.initCountries();
    POLegalEntityService.initProductType();
    POLegalEntityService.initSellType();
    POLegalEntityService.initModel();
    POLegalEntityService.initVCC();	
    $("#btnImport").tooltip();
    $('#btnAddRule').tooltip();
    $('#btnRuleExport').tooltip();
    $('#btnReleaseVersion').tooltip();
    $("#btnMakeComment").tooltip();
    $("#btnSubscritNotification").tooltip();
    $("#btnRevisionAudited").tooltip();
    $("#btnSendToApproval").tooltip();
    $("#btnBackToEdition").tooltip();
    $("#btnReleaseVersion").tooltip();
    $("#btnGoToPending").tooltip();
    $("#btnGoToActive").tooltip();

    $("#btnRuleExport").on("click", function () {

        $("#frmExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/po-legal-entity/xls");
        $("#frmExport").submit();

        return;
    });

    $("#btnReleaseVersion").on("click", function () {
        noty({
            text: '<div class="noty_message"><span class="noty_text">Esta seguro de aprobar esta version? Ingrese fecha de inicio:</span>' +
            '<div id="spNewVersionDate" class="input-append input-group dtpicker">' +
            '<input data-format="dd/MM/yyyy" type="text" class="form-control">' +
            '<span class="input-group-addon add-on">' +
            '<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>' +
            '</span></div></div><div class="noty_close"></div>',
            modal: true,
            layout: 'topCenter',
            type: "error",
            callback: {

                onShow: function () {
                    $('#spNewVersionDate').datetimepicker({
                        pickTime: false,
                        autoclose: true
                    });

                    $('.bootstrap-datetimepicker-widget').css('z-index', 99999999999999);
                    $('#spNewVersionDate').datepicker('setDate', new Date());
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
                open: 'animated bounceIn', // Animate.css class names
                close: 'animated flipOutX', // Animate.css class names
                easing: 'swing', // unavailable - no need
                speed: 500 // unavailable - no need
            },
            buttons: [
                {
                    addClass: 'btn btn-success sm', text: 'Aceptar', onClick: function ($noty) {
                    var versionDate = $("#spNewVersionDate").children('input').val();
                    if (Commons.isBlank(versionDate)) {
                        Noty.notyTopRightError('La fecha de inicio es obligatoria');

                        return false;
                    }
                    POLegalEntityService.relaseNewVersion(versionDate);
                    $noty.close();
                }
                },
                {
                    addClass: 'btn btn-default sm', text: 'Cancelar', onClick: function ($noty) {
                    $noty.close();
                }
                }
            ]
        });


        return;
    });

    $("#frmExport").on('submit', function () {
        $("#frmExport").find("input[type='hidden']").remove();

        Commons.makeSubmitUrl("productType", $("#filterSpProductType").val(), '#frmExport');
        Commons.makeSubmitUrl("countryCodeSite", $("#filterSpCountrySite").val(), '#frmExport');
        Commons.makeSubmitUrl("countryCodeDestiny", $("#filterSpCountryDestiny").val(), '#frmExport');
        Commons.makeSubmitUrl("sellType", $("#filterSpSellType").val(), '#frmExport');
        Commons.makeSubmitUrl("model", $("#filterSpModel").val(), '#frmExport');
        Commons.makeSubmitUrl("virtualCreditCard", $("#filterSpVCC").val(), '#frmExport');
        Commons.makeSubmitUrl("legalEntityCode", $("#filterSpLegalEntity").val(), '#frmExport');

        return;
    });

    $("#btnRevisionAudited").on("click", function () {
        $('.auditoria').width('80%');
        POLegalEntityService.getAuditedByCode();
    });

    return;
}

POLegalEntityService.showActionButtons = function () {
    ButtonsRulesAction.showSubscritNotificationButton();
    ButtonsRulesAction.showAddButton();
    ButtonsRulesAction.showLoadRuleButton();
    ButtonsRulesAction.showRuleExportButton();
    ButtonsRulesAction.showMakeCommentButton();
    ButtonsRulesAction.showRevisionAuditedButton();
};

POLegalEntityService.reset = function () {

    $("#spProductType option:selected").removeAttr("selected");
    $("#spProductType").multiselect('refresh');
    $("#spCountrySite option:selected").removeAttr("selected");
    $("#spCountrySite").multiselect('refresh');
    $("#leInvoicingLegalEntityType option:selected").removeAttr("selected");
    $('#leInvoicingLegalEntityType').multiselect("refresh");
    $("#spCountryDestiny option:selected").removeAttr("selected");
    $("#spCountryDestiny").multiselect('refresh');
    $("#spEnabledDate").children('input').val("");
    $("#spSellType > option:first").prop("selected", true);
    $("#ruleSellTypeFlag").val("A");
    $("#ruleSellTypeId").val("");
    $("#spVCC option:first").prop("selected", true);
    $("#spModel option:first").prop("selected", true);

    $("#spProductTypeUnique option:selected").removeAttr("selected");
    $("#spProductTypeUnique").multiselect('refresh');
    $("#spCountrySiteUnique option:selected").removeAttr("selected");
    $("#spCountrySiteUnique").multiselect('refresh');
    $("#spCountryDestinyUnique option:selected").removeAttr("selected");
    $("#spCountryDestinyUnique").multiselect('refresh');
    $("#spCountryProviderUnique option:selected").removeAttr("selected");
    $("#spCountryProviderUnique").multiselect('refresh');

    return;
}

POLegalEntityService.add = function () {

    var validator = $("#frmAddRuleSellType").validate();

    validator.element("#spSellType");


    var producList = $("#spProductType > option:selected");
    var countrySitList = $("#spCountrySite > option:selected");
    var countryDestList = $("#spCountryDestiny > option:selected");
    var LEOMPADList = $("#leInvoicingLegalEntityType > option:selected");


    var emptyList = producList.length == 0 || countrySitList.length == 0 || countryDestList.lenght == 0 || LEOMPADList.length == 0;

    if (emptyList & $("#ruleSellTypeFlag").val() != "U") {
        Noty.notyTopCenterError('Todos los campos son requeridos !!!');
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
        obj.countryCodeDestiny = $("#spCountryDestinyUnique").val();
        obj.countryCodeProvider = $("#spCountryProviderUnique").val();
    } else {
        obj.productTypeList = [];
        obj.countrySiteList = [];
        obj.countryDestinyList = [];
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

        var optCountryDestinyList = $("#spCountryDestiny > option:selected");
        if(!$("#spCountryDestiny").is(':disabled')){
            $.each(optCountryDestinyList, function () {
                obj.countryDestinyList.push($(this).val());

                return;
            });
        }

        var optCountryProviderList = $("#spCountryProvider > option:selected");
        $.each(optCountryProviderList, function () {
            obj.countryProviderList.push($(this).val());

            return;
        });
    }

    obj.ruleStartDate = $("#spEnabledDate").children('input').val();
    obj.sellType = $("#spSellType").val();
    obj.model = $("#spModel").val();
    if(!$("#spVCC").is(':disabled')){
        obj.virtualCreditCard = $("#spVCC").val();
    }
    obj.legalEntityCode = $("#leInvoicingLegalEntityType").val();
    obj.legalEntityDescription = $("#leInvoicingLegalEntityType").val();

    var $data = Commons.toJsonSnakeCase(obj);
    
    var settings = new Object();
    settings.data = $data;
    settings.url = "po-legal-entity";
    settings.handler = function (data) {
        POLegalEntityService.reset();
        $("#modalAddRule").modal("hide");

        var table = $('#tSpResult').DataTable();
        table.clear().draw();
        POLegalEntityService.get();
    };
    settings.alertMessage = 'Ups! Mensaje: ';
    settings.errorMessage = 'Error al intentar dar de Alta. Mensaje: ';

    RestConnector.post(settings);

};

POLegalEntityService.get = function (params) {

    var settings = new Object();
    settings.url = "po-legal-entity";
    if (params == null || params === undefined) {
        params = [];
    }
    settings.params = params;
    settings.handler = POLegalEntityService.handler;

    RestConnector.get(settings);

    POLegalEntityService.getLastVersion();
    $("#labelSelectAll").hide();
    return;
}

POLegalEntityService.legalEntityHandler = function (data) {

    var leType = $("#leInvoicingLegalEntityType");
    var filterLeType = $("#filterSpLegalEntity");

    $.each(data, function () {

        var le = this;

        filterLeType.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
        leType.append($("<option value='" + le.code + "'>" + le.description + "</option>"));

        return;
    });

    leType.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });

    filterLeType.multiselect({
        enableFiltering: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        maxHeight: 400
    });
};

POLegalEntityService.handler = function (data) {
    var table = $("#tSpResult").dataTable({
        "fnInitComplete": function () {
            $('#tSpResult tbody tr').each(function () {
                $(this).find('td:eq(2)').attr('nowrap', 'nowrap');
                $(this).find('td:eq(3)').attr('nowrap', 'nowrap');

                return;
            });

            return;
        },
        "bDestroy": true,
        responsive: false,
        "bProcessing": true,
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

                    return "<input type='checkbox' id='selectedRow_" + row.id + "' value='X'>";
                }
            },
            {
                "className": 'centered',
                "orderable": false,
                "render": function (data, type, row) {

                    var toShow = "[";

                    var list = row.product_type_description_list;
                    if (list != null && list != "") {
                        toShow += list.join();
                    }

                    toShow += "]";

                    return "<b>" + toShow + "</b>";
                }
            },
            {
                "className": 'centered',
                "orderable": false,
                "render": function (data, type, row) {

                    var toShow = "[";

                    var list = row.country_site_list;
                    if (list != null && list != "") {
                        toShow += list.join();
                    }

                    toShow += "]";

                    return "<b>" + toShow + "</b>";
                }
            },
            {
                "className": 'centered',
                "orderable": false,
                "render": function (data, type, row) {

                    var list = row.country_destiny_list;

                    var toShow = "";

                    if (list != null && list != "") {
                        toShow += "[";
                        toShow += list.join();
                        toShow += "]";
                    } else {
                        toShow += "-";
                    }

                    return "<b>" + toShow + "</b>";
                }
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "sell_type_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "model_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "virtual_credit_card_description",
                "render": function (data, type, row) {

                    var vcc = row.virtual_credit_card_description;

                    if (vcc != null && vcc != "") {
                        return vcc;
                    } else {
                        return "-";
                    }
                }
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
                    var idList = Commons.buildIdList(row.id_list);

                    return "<span><a id='rowRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:POLegalEntityService.removeOnly(\"" + idList + "\");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>";
                }
            }
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por p&aacute;gina",
            "zeroRecords": "No se ha encontrado ningun elemento",
            "info": "P&aacute;gina _PAGE_ de _PAGES_ <b>(Total: _MAX_)</b>",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "", //"(filtrados de un total de _MAX_ registros)",
            "search": "Buscar: ",
            "paginate": {
                "previous": "<i class='glyphicon glyphicon-step-backward'></i>",
                "next": "<i class='glyphicon glyphicon-step-forward'></i>"
            }
        }
    });

    return;
}

POLegalEntityService.update = function (id) {

    $("#ruleSellTypeFlag").val("U");
    $("#ruleSellTypeId").val(id);

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/po-legal-entity?id=" + id,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null && data.length == 1) {

                var entity = data[0];
                Commons.setOptionValue("spProductTypeUnique", entity.product_type);
                Commons.setMultiselectOptionValue("spCountrySiteUnique", entity.country_code_site);
                Commons.setMultiselectOptionValue("spCountryDestinyUnique", entity.country_code_destiny);
                $("#spSellType").val(entity.sell_type);
                $("#leInvoicingLegalEntityType").val(entity.legal_entity_code);
                $("#leInvoicingLegalEntityType").multiselect('refresh');

                $('#spEnabledDate').children('input').val(entity.rule_start_date);

                $("#modalAddRule").modal("show");

                return;
            } else {
                Noty.notyTopRightAlert('Ups! Mensaje: ' + data.message);
            }
        },
        error: function (data) {
            Noty.notyTopRightError('Se ha producido un error, mensaje: ' + data.responseJSON.cause);
        }
    });

    return;
}

POLegalEntityService.countryHandler = function (countryList) {

    CountryService.doComboFill($('#spCountrySite'), countryList);
    CountryService.doComboFill($('#spCountrySiteUnique'), countryList);
    CountryService.doComboFill($('#filterSpCountrySite'), countryList, null, true);
    CountryService.doComboFill($('#spCountryDestiny'), countryList);
    CountryService.doComboFill($('#spCountryDestinyUnique'), countryList);
    CountryService.doComboFill($('#filterSpCountryDestiny'), countryList, null, true);

};

POLegalEntityService.initProductType = function (params) {
    CatalogueService.getProductType(function (list) {

        ValuesService.buildCombo($("#spProductType"), list, false, true);
        ValuesService.buildCombo($("#spProductTypeUnique"), list, false, true);
        ValuesService.buildCombo($("#filterSpProductType"), list, true, true);

        $("#spProductType,#spProductTypeUnique").multiselect({
            enableFiltering: true,
            buttonWidth: '100%',
            maxHeight: 400,
            enableCaseInsensitiveFiltering: true,
            nonSelectedText: 'Seleccione una opción',
            allSelectedText: 'Todos seleccionados',
            includeSelectAllOption: true,
            selectAllText: 'Seleccionar Todos'
        });
    },params);
};

POLegalEntityService.removeOnly = function (id) {
    ButtonRemove.removeOnly(id,"po-legal-entity","#tSpResult","rowid",POLegalEntityService.getLastVersion);
};

POLegalEntityService.getAuditedByCode = function () {

    $('#modalRuleSellTypeAuditedTable').modal('show');
    $('.auditoria').width('80%');
    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/audited/po-legal-entity",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {

            $("#auditedRuleSellTypeTable").DataTable().destroy();
            RestConnector.appendTemplateResults(data, "#auditedRuleSellTypeTableBody", "#rowSellTypeAuditedSheet");
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

POLegalEntityService.relaseNewVersion = function (versionDate) {
    var settings = new Object();
    settings.url = "po-legal-entity/newVersion?versionDate=" + versionDate;
    settings.handler = function (data) {
        if (data.status == 0) {
            ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ", "topRight", "success", false);
            POLegalEntityService.getLastVersion();
            ButtonsRulesAction.getInfoRuleStatus("RULE_CHARGE", "btnRuleChargeRelaseVersion");
        } else {
            ButtonsRulesAction.showNoty("Ups! Error en release de nueva version", "topRight", "alert", false);
        }
    };

    RestConnector.post(settings);
};

POLegalEntityService.getLastVersion = function () {
    var settings = new Object();
    settings.url = "release-version-log/lastVersion?type=PO_LEGAL_ENTITY&activated=true";
    settings.handler = function (data) {
        $("#versionBox").removeClass("hide");
        $("#headerVersion").text(data.version + ".0");
    };

    RestConnector.get(settings);
    ButtonsRulesAction.getInfoRuleStatus("PO_LEGAL_ENTITY", "btnReleaseVersion");

};

POLegalEntityService.initCountries = function(params){
    CatalogueService.getCountry(function(countryList){

        CountryService.doComboFill($('#spCountrySite'), countryList);
        CountryService.doComboFill($('#spCountrySiteUnique'), countryList);
        CountryService.doComboFill($('#filterSpCountrySite'), countryList, null, true);
        CountryService.doComboFill($('#spCountryDestiny'), countryList);
        CountryService.doComboFill($('#spCountryDestinyUnique'), countryList);
        CountryService.doComboFill($('#filterSpCountryDestiny'), countryList, null, true);

    },params);
};

POLegalEntityService.initSellType = function(params){
	CatalogueService.getSellType(function(list){

        ValuesService.buildCombo($("#spSellType"), list, true, true);
        ValuesService.buildCombo($("#filterSpSellType"), list, true, true);

    },params);
};

POLegalEntityService.initModel = function(params){
    CatalogueService.getModel(function(list){

        ValuesService.buildCombo($("#spModel"), list, true, true);
        ValuesService.buildCombo($("#filterSpModel"), list, true, true);

    },params);

    $("#spModel").change(function () {
        if(this.value != undefined && this.value == "OLD"){
            $("#spVCC").prop('disabled', true);
            $("#spCountryDestiny").multiselect('disable');
        }else{
            $("#spVCC").prop('disabled', false);
            $("#spCountryDestiny").multiselect('enable');
        }
    });

    $("#filterSpModel").change(function () {
        if(this.value != undefined && this.value == "OLD"){
            $("#filterSpVCC").prop('disabled', true);
            $("#filterSpCountryDestiny").multiselect('disable');
        }else{
            $("#filterSpVCC").prop('disabled', false);
            $("#filterSpCountryDestiny").multiselect('enable');
        }
    });

};

POLegalEntityService.initVCC = function(params){
    CatalogueService.getVCC(function(list){

        ValuesService.buildCombo($("#spVCC"), list, true, true);
        ValuesService.buildCombo($("#filterSpVCC"), list, true, true);

    },params);
};