RuleChargeService = function () {
}

RuleChargeService.init = function () {
    $("#btnCiReset").on("click", function (e) {
        e.preventDefault();

        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("select").each(function () {
            $(this).children("option:first").prop("selected", true);
        });

        return;
    });

    $("#btnMakeComment").on("click", function () {
        $("#modalCommentRule").modal('show');
    });

    $("#modalCommentRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showCommentsRule("RULE_CHARGE", "EDITION");
        return;
    });

    $("#btnSubscritNotification").on("click", function () {
        $("#modalSubscriptionRule").modal('show');
    });

    $("#modalSubscriptionRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showSubcriptionOption("RULE_CHARGE");
        return;
    });

    $("#btnSendToApproval").on("click", function () {
        ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("RULE_CHARGE", "btnReleaseVersion", "WATING_APPROVAL");
        });
        return;
    });
    $("#btnRevisionAudited").on("click", function () {
        RuleChargeService.getAuditedByCode();
    });

    $("#btnBackToEdition").on("click", function () {
        ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("RULE_CHARGE", "btnReleaseVersion", "EDITION");
        });
        return;
    });

    $('#modalAddRule').on('hidden.bs.modal', function (e) {

        RuleChargeService.reset();

        return;
    });

    $('#modalAddRule').on('show.bs.modal', function (e) {

        $("#ciLegalEntity").focus();

        return;
    });

    $("#btnAddRuleCharge").on("click", function () {

        RuleChargeService.add();

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

    $("#btnCiRemoveAll").on("click", function () {

        var list = [];

        var rows = $('#tSpResult').dataTable().fnGetNodes();

        $.each(rows, function (index, value) {
            var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
            var id = check.parent().parent().data("rowid");
            if (id != undefined) {
                list.push(id.toString())
            }

        });

        if (list.length > 0) {
            ButtonRemove.remove(list,"rule-charge","#tSpResult","rowid",RuleChargeService.getLastVersion);
        } else {
            ButtonsRulesAction.showNoty("No ha seleccionado ningún elemento para borrar", "topRight", "warning", false);
        }

        return;
    });

    $("#btnCiSearch").on("click", function () {

        var params = [];

        params.push(RestConnector.buildPair("legalEntityCode", $("#filterCiLegalEntity").val()));
        params.push(RestConnector.buildPair("merchant", $("#filterCiMerchantId").val()));
        params.push(RestConnector.buildPair("dateFrom", $("#filterCiDateFrom").val()));
        params.push(RestConnector.buildPair("dateTo", $("#filterCiDateTo").val()));
        params.push(RestConnector.buildPair("installments", $("#filterCiInstallments").val()));
        params.push(RestConnector.buildPair("divideOnInstallments", $("#filterCiDivideOnInstallments").val()));

        RuleChargeService.get(params);

        return;
    });

    RuleChargeService.get();
    RuleChargeService.initLegalEntity();
    RuleChargeService.initMerchant();
    RuleChargeService.showActionButtons();

    $("#btnImport").tooltip();
    $('#btnAddRule').tooltip();
    $('#btnRuleExport').tooltip();
    $('#btnSendToApproval').tooltip();
    $('#btnBackToEdition').tooltip();

    $('#btnMakeComment').tooltip();
    $('#btnRevisionAudited').tooltip();
    $('#btnSubscritNotification').tooltip();
    $('#btnReleaseVersion').tooltip();

    $("#btnRuleExport").on("click", function () {

        $("#frmRuleChargeExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/rule-charge/xls");
        $("#frmRuleChargeExport").submit();

        return;
    });

    $("#btnReleaseVersion").on("click", function () {
        noty({
            text: '<div class="noty_message"><span class="noty_text">Esta seguro de aprobar esta version? Ingrese fecha de inicio:</span>' +
            '<div id="ciNewVersionDate" class="input-append input-group dtpicker">' +
            '<input data-format="dd/MM/yyyy" type="text" class="form-control">' +
            '<span class="input-group-addon add-on">' +
            '<i data-time-icon="fa fa-times" data-date-icon="fa fa-calendar"></i>' +
            '</span></div></div><div class="noty_close"></div>',
            modal: true,
            layout: 'topCenter',
            type: "error",
            callback: {

                onShow: function () {
                    $('#ciNewVersionDate').datetimepicker({
                        pickTime: false,
                        autoclose: true
                    });

                    $('.bootstrap-datetimepicker-widget').css('z-index', 99999999999999);
                    $('#ciNewVersionDate').datepicker('setDate', new Date());
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
                    var versionDate = $("#ciNewVersionDate").children('input').val();
                    if (Commons.isBlank(versionDate)) {
                        noty(
                            {
                                text: '<strong>La fecha de inicio es obligatoria</strong>',
                                layout: 'topRight',
                                type: 'error',
                                timeout: 5000,
                                animation: {
                                    open: 'animated bounceInDown', // Animate.css class names
                                    close: 'animated bounceOutUp', // Animate.css class names
                                    easing: 'swing', // unavailable - no need
                                    speed: 500 // unavailable - no need
                                }
                            }
                        );

                        return false;
                    }
                    RuleChargeService.relaseNewVersion(versionDate);
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

    $("#frmRuleChargeExport").on('submit', function () {
        $("#frmRuleChargeExport").find("input[type='hidden']").remove();

        Commons.makeSubmitUrl("legalEntityCode", $("#filterCiLegalEntity").val(), '#frmRuleChargeExport');
        Commons.makeSubmitUrl("merchant", $("#filterCiMerchantId").val(), '#frmRuleChargeExport');
        Commons.makeSubmitUrl("dateFrom", $("#filterCiDateFrom").val(), '#frmRuleChargeExport');
        Commons.makeSubmitUrl("dateTo", $("#filterCiDateTo").val(), '#frmRuleChargeExport');
        Commons.makeSubmitUrl("installments", $("#filterCiInstallments").val(), '#frmRuleChargeExport');
        Commons.makeSubmitUrl("divideOnInstallments", $("#filterCiDivideOnInstallments").val(), '#frmRuleChargeExport');

        return;
    });

    $("#aproveSignal").on("click", function () {
        //RuleChargeService.getLastVersionAndShowStatus();
    });

    return;
};

RuleChargeService.showActionButtons = function () {
    ButtonsRulesAction.showSubscritNotificationButton();
    ButtonsRulesAction.showAddButton();
    ButtonsRulesAction.showLoadRuleButton();
    ButtonsRulesAction.showRuleExportButton();
    ButtonsRulesAction.showMakeCommentButton();
    ButtonsRulesAction.showRevisionAuditedButton();
};

RuleChargeService.reset = function () {

    $("#ciDateFrom-error").remove();
    $("#ciDateTo-error").remove();
    var validator = $("#frmAddRuleCharge").validate();
    validator.resetForm();

    $("#ruleChargeFlag").val("A");
    $("#ruleChargeId").val("");
    $("#ciLegalEntity > option:first").prop("selected", true);
    $("#ciMerchantId > option:first").prop("selected", true);
    $("#ciDateFrom").children('input').val("");
    $("#ciDateTo").children('input').val("");
    $("#ciInstallments").val("");
    $("#ciDivideOnInstallments > option:first").prop("selected", true);

    return;
}

RuleChargeService.add = function () {
    var validator = $("#frmAddRuleCharge").validate();

    $("#ciDateFrom-error").remove();
    $("#ciDateTo-error").remove();

    var labelError = '<label id="${ID}-error" class="error" for="${ID}">This field is required.</label>';

    if (Commons.isBlank($("#ciDateFrom").children('input').val())) {
        var l = $(Commons.replaceAll(labelError, "${ID}", "ciDateFrom"));
        l.insertAfter($("#ciDateFrom"));
    }
    if (Commons.isBlank($("#ciDateTo").children('input').val())) {
        var l = $(Commons.replaceAll(labelError, "${ID}", "ciDateTo"));
        l.insertAfter($("#ciDateTo"));
    }

    validator.element("#ciLegalEntity");
    validator.element("#ciMerchantId");
    validator.element($("#ciDateFrom").children('input'));
    validator.element($("#ciDateTo").children('input'));
    validator.element("#ciInstallments");
    validator.element("#ciDivideOnInstallments");

    if (!validator.valid()) {
        ButtonsRulesAction.showNoty("Todos los campos son requeridos !!!", "topCenter", "error", false);
        return false;
    }

    var $type = "POST";
    var obj = new Object();
    if ($("#ruleChargeFlag").val() == "U") {
        $type = "PUT";
        obj.id = $("#ruleChargeId").val();
    }
    obj.legalEntityCode = $("#ciLegalEntity").val();
    obj.merchantChargeId = $("#ciMerchantId").val();
    obj.dateFrom = $("#ciDateFrom").children('input').val();
    obj.dateTo = $("#ciDateTo").children('input').val();
    obj.installments = $("#ciInstallments").val();
    obj.divideOnInstallments = $("#ciDivideOnInstallments").val();

    var $data = Commons.toJsonSnakeCase(obj);

    $.ajax({
        type: $type,
        url: Constants.CONTEXT_ROOT + "/app/service/rule-charge",
        dataType: 'json',
        data: $data,
        contentType: "application/json;",
        success: function (data) {

            $("#ruleChargeFlag").val("A");

            if (data != null && data.status == 0) {

                RuleChargeService.reset();
                $("#modalAddRule").modal("hide");

                var table = $('#tSpResult').DataTable();
                table.clear().draw();
                RuleChargeService.get();

                return;
            } else {
                ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.message, "topRight", "alert", false);
            }

            return;
        },
        error: function (data) {
            ButtonsRulesAction.showNoty("Error al intentar dar de Alta. Mensaje: " + data.responseJSON.cause, "topRight", "error", false);
            return;
        }
    });

    return;
}

RuleChargeService.get = function (params) {

    var settings = new Object();
    settings.url = "rule-charge";
    if (params == null || params === undefined) {
        params = [];
    }
    settings.params = params;
    settings.handler = RuleChargeService.handler;

    RestConnector.get(settings);
    $("#labelSelectAll").hide();
    RuleChargeService.getLastVersion();

    return;
}

RuleChargeService.handler = function (data) {

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
        "createdRow": function (row, data, index) {
            $(row).attr("id", "rowid_" + data.id);
            $(row).data('rowid', data.id);

            return;
        },
        "drawCallback": function () {
            $('[id^=showRuleChargeAudited_]').on("click", function () {
                $('.auditoria').width('95%');
                //RuleChargeService.getAuditedByCode($(this).attr("data-code"));

                return;
            });
            PermissionService.doJobWithRoleables();
            return;
        },
        "iDisplayLength": 50,
        "data": data,
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
                "orderable": true,
                "data": "legal_entity_taxpayer_id"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "legal_entity_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "merchant_charge_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "date_from"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "date_to"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "installments"
            },
            {
                "className": 'centered highlight',
                "orderable": true,
                "data": "divide_on_installments_si_no"
            },
            {
                "className": 'centered Edition',
                "orderable": false,
                "render": function (data, type, row) {

                    return "<span id='showRuleChargeAudited_" + row.id + "' data-code=" + row.id + ">" +
                        "<span id='showList_" + row.id + "'><a id='ruleChargeUpdBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:RuleChargeService.update(" + row.id + ");' title='Actualizar fila'><i class='glyphicon glyphicon-cog'></i></a></span>&nbsp;" +
                        "<span><a id='rowRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:RuleChargeService.removeOnly(" + row.id + ");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>";
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

RuleChargeService.initMerchant = function(params){
	
	var settings = new Object();
	settings.url = "catalogue?catalogueTypeDescription=MERCHANT";
	if(params == null || params === undefined){
		params = [];
	}
	settings.params = params;
	settings.handler = function(list){

		ValuesService.buildCombo($("#ciMerchantId"), list, false, true);
		ValuesService.buildCombo($("#filterCiMerchantId"), list, true, true);
		
		return;
	};
	RestConnector.get(settings);
	
	return;

}
RuleChargeService.update = function (id) {

    $("#ruleChargeFlag").val("U");
    $("#ruleChargeId").val(id);

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/rule-charge?id=" + id,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null && data.length == 1) {

                $("#ruleChargeFlag").val("U");

                var entity = data[0];
                // TODO: [roher] esto hay q completarlo cdo haya update disponible ...
                Commons.setComboValue("ciLegalEntity", entity.legal_entity_code);
                Commons.setComboValue("ciMerchantId", entity.merchant_charge_id);
                Commons.setComboValue("ciDivideOnInstallments", "" + entity.divide_on_installments);

                $("#ciDateFrom").children('input').val(entity.date_from);
                $("#ciDateTo").children('input').val(entity.date_to);
                $("#ciInstallments").val(entity.installments);

                $("#modalAddRule").modal("show");

                return;
            } else {
                ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.message, "topRight", "alert", false);
            }

            return;
        },
        error: function (data) {
            ButtonsRulesAction.showNoty("Se ha producido un error, mensaje: " + data.responseJSON.cause, "topRight", "error", false);
            return;
        }
    });

    return;
}

RuleChargeService.initLegalEntity = function (params) {

    var settings = new Object();
    settings.url = "/legalEntity";
    if (params == null || params === undefined) {
        params = [];
        params.push({
            "name": "operational",
            "value": "true"
        });
    }
    settings.params = params;
    settings.handler = function (list) {

        ValuesService.buildCombo($("#ciLegalEntity"), list, false, true);
        ValuesService.buildCombo($("#filterCiLegalEntity"), list, true, true);

        return;
    };
    RestConnector.get(settings);

    return;
}

RuleChargeService.removeOnly = function (id) {
    return ButtonRemove.removeOnly(id.toString(),"rule-charge","#tSpResult","rowid",RuleChargeService.getLastVersion);
};

RuleChargeService.getAuditedByCode = function (id) {

    $('#modalRuleChargeAuditedTable').modal('show');
    $('.auditoria').width('80%');
    $("#auditedRuleChargeTable").DataTable().destroy();
    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/audited/rule-charge",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            RestConnector.appendTemplateResults(data, "#auditedRuleChargeTableBody", "#rowRuleChargeAuditedSheet");
            $("#auditedRuleChargeTable").DataTable({
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

RuleChargeService.relaseNewVersion = function (versionDate) {

    $.ajax({
        type: "POST",
        url: Constants.CONTEXT_ROOT + "/app/service/rule-charge/newVersion?versionDate=" + versionDate,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data.status == 0) {
                ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ", "topRight", "success", false);
                RuleChargeService.getLastVersion();
                ButtonsRulesAction.getInfoRuleStatus("RULE_CHARGE", "btnReleaseVersion");
            } else {
                ButtonsRulesAction.showNoty("Ups! Error en release de nueva version", "topRight", "alert", false);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

RuleChargeService.getLastVersion = function () {

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=RULE_CHARGE&activated=true",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null) {
            	$("#versionBox").removeClass("hide");
                $("#headerVersion").text(data.version + ".0");
            }
            
            return;
        },
        error: function (data) {
            console.log(data);
        }
    });
    ButtonsRulesAction.getInfoRuleStatus("RULE_CHARGE", "btnReleaseVersion");

}
