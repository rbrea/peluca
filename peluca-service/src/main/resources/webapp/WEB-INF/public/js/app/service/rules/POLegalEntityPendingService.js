POLegalEntityPendingService = function () {
}

POLegalEntityPendingService.init = function () {
    POLegalEntityPendingService.getLastVersion();

    POLegalEntityPendingService.get();
    $("#makeActive").on("click", function () {
        POLegalEntityPendingService.activateRule();
    });

    $("#btnMakeComment").on("click", function () {
        $("#modalCommentRule").modal('show');
    });

    $("#modalCommentRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showCommentsRule("PO_LEGAL_ENTITY", "PENDING", true);
        return;
    });
    
    $("#btnMakeComment").tooltip();
    $("#btnBackToEdit").tooltip();
    $("#btnGoToActive").tooltip();

    return;
}

POLegalEntityPendingService.get = function (params) {

    var settings = new Object();
    settings.url = "po-legal-entity-pending";
    if (params == null || params === undefined) {
        params = [];
    }
    settings.params = params;
    settings.handler = POLegalEntityPendingService.handler;

    RestConnector.get(settings);

    return;
}

POLegalEntityPendingService.activateRule = function () {

    $.ajax({
        type: "POST",
        url: Constants.CONTEXT_ROOT + "/app/service/po-legal-entity-pending/approve",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data.status == 0) {
                noty(
                    {
                        text: '<strong> Nueva Regla Activada con exito!! </strong>',
                        layout: 'topRight',
                        type: 'success',
                        timeout: 10000,
                        animation: {
                            open: 'animated bounceInDown', // Animate.css class names
                            close: 'animated bounceOutUp', // Animate.css class names
                            easing: 'swing', // unavailable - no need
                            speed: 500 // unavailable - no need
                        }
                    }
                );

                POLegalEntityPendingService.getLastVersion();
            } else {
                noty(
                    {
                        text: '<strong>Ups! Error en release de nueva version</strong>',
                        layout: 'topRight',
                        type: 'alert',
                        timeout: 10000,
                        animation: {
                            open: 'animated bounceInDown', // Animate.css class names
                            close: 'animated bounceOutUp', // Animate.css class names
                            easing: 'swing', // unavailable - no need
                            speed: 500 // unavailable - no need
                        }
                    }
                );
            }
        },
        error: function (data) {
            console.log(data);
        }
    });

}

POLegalEntityPendingService.handler = function (data) {

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
        "createdRow": function (row, data, index) {
            $(row).attr("id", "rowid_" + data.id);
            $(row).data('rowid', data.id);

            return;
        },
        "drawCallback": function () {
        	PermissionService.doJobWithRoleables();
            return;
        },
        "data": data,
        "columns": [
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
                "orderable": false,
                "render": function (data, type, row) {

                    var toShow = "[";

                    var list = row.country_site_list;
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
                "className": 'centered',
                "orderable": true,
                "data": "version"
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

    PermissionService.doJobWithRoleables();

    return;
}

POLegalEntityPendingService.fillOldVersionTable = function (data, version) {
    $('.ruleOldVersion').width('80%');
    RestConnector.appendTemplateResults(data, "#RuleVersionTableBody", "#rowSellTypeUniqueVersionSheet");
    $("#RuleVersionTable").dataTable();
    POLegalEntityPendingService.setInfoHeaderOldVersion(version);

}

POLegalEntityPendingService.setInfoHeaderOldVersion = function (version) {

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/release-version-log/PO_LEGAL_ENTITY/" + version,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {

            var header = "Regla version N° " + version + " - Usario responsable: " + data.user_aproved +
                " - Fecha de Inicio: " + data.release_version_date;
            $("#versionRuleTitle").text(header);
            $("#BtnRevertVersion").attr("data-version", version);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

POLegalEntityPendingService.getLastVersion = function () {

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastApproved?type=PO_LEGAL_ENTITY",
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null) {
                var date = "Proximo release: " + data.release_version_date;
                var usr = "Aprobado por: " + data.user_aproved;
                $("#headerPageVersion span").text(" Pendiente de Activacion - " + date + " - " + usr);
            }
        },
        error: function (data) {
            $("#headerPageVersion span").text(" No hay reglas pendientes de activacion");
        }
    });

    return ReleaseVersionLog.initLastVersion("PO_LEGAL_ENTITY", "", false);
}
