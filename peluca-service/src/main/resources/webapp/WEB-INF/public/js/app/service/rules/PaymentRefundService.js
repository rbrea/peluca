PaymentRefundService = function () {}

PaymentRefundService.firstAdd = true;

PaymentRefundService.showAddUpdateCombos = function(){
    $("#spProductType").focus();
    if ($("#ruleSellTypeFlag").val() == "A") {
        $("#spProductTypeUnique").next().addClass("hide");
        $("#spProductType").next().removeClass("hide");

        $("#spCountrySiteUnique").next().addClass("hide");
        $("#spCountrySite").next().removeClass("hide")

        $("#spCollectionChannelUnique").next().addClass("hide");
        $("#spCollectionChannel").next().removeClass("hide");

        $("#spMerchantUnique").next().addClass("hide");
        $("#spMerchant").next().removeClass("hide");

        $("#spPaymentMethodUnique").next().addClass("hide");
        $("#spPaymentMethod").next().removeClass("hide");
    } else {
        $("#spProductType").next().addClass("hide");
        $("#spProductTypeUnique").next().removeClass("hide");

        $("#spCountrySite").next().addClass("hide");
        $("#spCountrySiteUnique").next().removeClass("hide");

        $("#spCollectionChannel").next().addClass("hide");
        $("#spCollectionChannelUnique").next().removeClass("hide");

        $("#spMerchant").next().addClass("hide");
        $("#spMerchantUnique").next().removeClass("hide");

        $("#spPaymentMethod").next().addClass("hide");
        $("#spPaymentMethodUnique").next().removeClass("hide");
    }
};

PaymentRefundService.init = function () {

    $("#btnSpReset").on("click", function (e) {
        e.preventDefault();

        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("select").each(function () {
            $(this).children("option:first").prop("selected", true);
        });
        $('#filterSpCountrySite :selected').removeAttr("selected");
        $('#filterSpCountrySite').multiselect("refresh");
        $('#filterLegalEntity').multiselect("refresh");

        return;
    });

    $("#btnMakeComment").on("click", function () {
        $("#modalCommentRule").modal('show');
    });

    $("#modalCommentRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showCommentsRule("PAYMENT_REFUND", "EDITION");
        return;
    });

    $("#btnSubscritNotification").on("click", function () {
        $("#modalSubscriptionRule").modal('show');
    });

    $("#modalSubscriptionRule").on('show.bs.modal', function (e) {
        ButtonsRulesAction.showSubcriptionOption("PAYMENT_REFUND");
        return;
    });


    $("#btnSendToApproval").on("click", function () {
        ButtonsRulesAction.showNoty("Cambiar Estado a: 'Pendiente de Aprobacion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("PAYMENT_REFUND", "btnReleaseVersion", "WATING_APPROVAL");
        });
        return;
    });

    $("#btnBackToEdition").on("click", function () {
        ButtonsRulesAction.showNoty("Volver a Estado de: 'Edicion'??", "topCenter", "warning", true, function () {
            return ButtonsRulesAction.updateRuleStatus("PAYMENT_REFUND", "btnReleaseVersion", "EDITION");
        });
        return;
    });


    $('#modalAddRule').on('hidden.bs.modal', function (e) {

        PaymentRefundService.reset();

        return;
    });

    $('#modalAddRule').on('show.bs.modal', function (e) {
    	if(PaymentRefundService.firstAdd){
    		PaymentRefundService.firstAdd= false;
    		PaymentRefundService.initQCatalog(null, "TIPO DE PRODUCTO", [$("#spProductType"), $("#spProductTypeUnique") ],false, true,function(){
    			ValuesService.applyMultiselect($("#spProductType,#spProductTypeUnique"));
    			PaymentRefundService.showAddUpdateCombos();
    		});
    		
    		PaymentRefundService.initQCatalog(null, "MEDIO DE PAGO CONTABILIZACION", [$("#spPaymentMethod"), $("#spPaymentMethodUnique") ],false, true,function(){
    			ValuesService.applyMultiselect($("#spPaymentMethod,#spPaymentMethodUnique"));
    			PaymentRefundService.showAddUpdateCombos();
    		});
    		
    		PaymentRefundService.initQCatalog(null, "CANAL DE COBRO", [$("#spCollectionChannel"), $("#spCollectionChannelUnique") ],false, true,function(){
    			ValuesService.applyMultiselect($("#spCollectionChannel,#spCollectionChannelUnique"));
    			PaymentRefundService.showAddUpdateCombos();
    		});
    		
    		PaymentRefundService.initQCatalog(null, "MERCHANT", [$("#spMerchant"), $("#spMerchantUnique") ],false, true,function(){
    			ValuesService.applyMultiselect($("#spMerchant,#spMerchantUnique"));
    			PaymentRefundService.showAddUpdateCombos();
    		});
    		
    		PaymentRefundService.initQCountry(null, "PAIS", [$("#spCountrySite"), $("#spCountrySiteUnique")],null, null, function(){
    	    	PaymentRefundService.showAddUpdateCombos();
    	    });
    		
    	}else{
    		PaymentRefundService.showAddUpdateCombos();
    	}
        return;
    });

    $("#btnAddSellType").on("click", function () {

        PaymentRefundService.add();

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

                for (var k = 0; k < ids.length; k++) {
                    list.push(ids[k]);
                }
            }

            return;
        });

        if (list.length > 0) {
            ButtonRemove.remove(list,"payment-refund","#tSpResult","rowid",PaymentRefundService.getLastVersion);
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

        params.push(RestConnector.buildPair("productType", $("#filterSpProductType").val()));
        params.push(RestConnector.buildPair("countryCodeSite", $("#filterSpCountrySite").val()));

        params.push(RestConnector.buildPair("paymentMethod", $("#filterSpPaymentMethod").val()));

        params.push(RestConnector.buildPair("collectionChannel", $("#filterSpCollectionChannel").val()));
        params.push(RestConnector.buildPair("merchant", $("#filterSpMerchant").val()));
        params.push(RestConnector.buildPair("legalEntityCode", $("#filterLegalEntity").val()));

        PaymentRefundService.get(params);

        return;
    });

    PaymentRefundService.get();
    LegalEntityService.get(PaymentRefundService.legalEntityHandler);
   
    PaymentRefundService.initQCatalog(null, "TIPO DE PRODUCTO", [$("#filterSpProductType")],true, true);
    PaymentRefundService.initQCatalog(null, "MEDIO DE PAGO CONTABILIZACION", [$("#filterSpPaymentMethod")],true, true);
    PaymentRefundService.initQCatalog(null, "CANAL DE COBRO", [$("#filterSpCollectionChannel")],true, true);
    PaymentRefundService.initQCatalog(null, "MERCHANT", [$("#filterSpMerchant")],true, true);
    PaymentRefundService.initQCountry(null, "PAIS", [$("#filterSpCountrySite")],null, true, function(){
        $("#filteredSearch").show();
    });
    
    PaymentRefundService.showActionButtons();
    
    $("#btnImport").tooltip();
    $('#btnAddRule').tooltip();
    $('#btnRuleExport').tooltip();
    $('#btnBackToEdition').tooltip();
    $('#btnReleaseVersion').tooltip();
    $('#btnSubscritNotification').tooltip();
    $("#btnRuleExport").on("click", function () {

        $("#frmRuleSellPointExport").attr("action", Constants.CONTEXT_ROOT + "/app/service/payment-refund/xls");
        $("#frmRuleSellPointExport").submit();

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
                    PaymentRefundService.relaseNewVersion(versionDate);
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

    $("#frmRuleSellPointExport").on('submit', function () {
        $("#frmRuleSellPointExport").find("input[type='hidden']").remove();

        Commons.makeSubmitUrl("productType", $("#filterSpProductType").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("countryCodeSite", $("#filterSpCountrySite").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("countryCodeProvider", $("#filterSpCountryProvider").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("sourceSystemNumber", $("#filterSpSsn").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("supplier", $("#filterSpSupplier").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("gateway", $("#filterSpGateway").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("assistanceType", $("#filterSpAssistanceType").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("affiliatedAgency", $("#filterSpAffiliatedAgency").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("prepayment", $("#filterSpPrepayment").val(), '#frmRuleSellPointExport');
        Commons.makeSubmitUrl("sellType", $("#filterSpSellType").val(), '#frmRuleSellPointExport');

        return;
    });

    $("#btnRevisionAudited").on("click", function () {
        PaymentRefundService.getAuditedByCode();
    });
    
    PaymentRefundService.getLastVersion();
    return;
}

PaymentRefundService.showActionButtons = function () {
    ButtonsRulesAction.showSubscritNotificationButton();
    ButtonsRulesAction.showAddButton();
    ButtonsRulesAction.showLoadRuleButton();
    ButtonsRulesAction.showRuleExportButton();
    ButtonsRulesAction.showMakeCommentButton();
    ButtonsRulesAction.showRevisionAuditedButton();
};

PaymentRefundService.reset = function () {

    $("#spProductType option:selected").removeAttr("selected");
    $("#spProductType").multiselect('refresh');
    $("#spCountrySite option:selected").removeAttr("selected");
    $("#spCountrySite").multiselect('refresh');
    $("#spPaymentMethod option:selected").removeAttr("selected");
    $("#spPaymentMethod").multiselect('refresh');
    $("#spCollectionChannel option:selected").removeAttr("selected");
    $("#spCollectionChannel").multiselect('refresh');
    $("#spMerchant option:selected").removeAttr("selected");
    $("#spMerchant").multiselect('refresh');
    $("#leInvoicingLegalEntityType option:selected").removeAttr("selected");
    $("#leInvoicingLegalEntityType").multiselect('refresh');

    return;
}

PaymentRefundService.add = function () {

    var $type = "POST";
    var obj = new Object();
    if ($("#ruleSellTypeFlag").val() == "U") {
        $type = "PUT";
        obj.id = $("#ruleSellTypeId").val();
        obj.productType = $("#spProductTypeUnique").val();
        obj.countryCodeSite = $("#spCountrySiteUnique").val();

        obj.paymentMethod = $("#spPaymentMethodUnique").val();
        obj.collectionChannel = $("#spCollectionChannelUnique").val();
        obj.merchant = $("#spMerchantUnique").val();

    } else {
        obj.productTypeList = [];
        obj.countrySiteList = [];
        obj.paymentMethodList = [];
        obj.collectionChannelList = [];
        obj.merchantList = [];

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

        var optPaymentMethodList = $("#spPaymentMethod > option:selected");
        $.each(optPaymentMethodList, function () {
            obj.paymentMethodList.push($(this).val());
            return;
        });

        var optCollectionChannelList = $("#spCollectionChannel > option:selected");
        $.each(optCollectionChannelList, function () {
            obj.collectionChannelList.push($(this).val());
            return;
        });

        var optMerchantList = $("#spMerchant > option:selected");
        $.each(optMerchantList, function () {
            obj.merchantList.push($(this).val());
            return;
        });
    }
    obj.ruleStartDate = $("#spEnabledDate").children('input').val();
    obj.legalEntityCode = $("#leInvoicingLegalEntityType").val();
    obj.legalEntityDescription = $("#leInvoicingLegalEntityType").val();

    var $data = Commons.toJsonSnakeCase(obj);

    $.ajax({
        type: $type,
        url: Constants.CONTEXT_ROOT + "/app/service/payment-refund",
        dataType: 'json',
        data: $data,
        contentType: "application/json;",
        success: function (data) {
            $("#ruleSellTypeFlag").val("A");

            if (data != null && data.status == 0) {

                PaymentRefundService.reset();
                $("#modalAddRule").modal("hide");

                var table = $('#tSpResult').DataTable();
                table.clear().draw();
                PaymentRefundService.get();

                return;
            } else {
                noty(
                    {
                        text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
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

            return;
        },
        error: function (data) {
            noty(
                {
                    text: '<strong>Error al intentar dar de Alta. Mensaje: ' + data.responseJSON.cause + '</strong>',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 10000,
                    animation: {
                        open: 'animated bounceInDown', // Animate.css class names
                        close: 'animated bounceOutUp', // Animate.css class names
                        easing: 'swing', // unavailable - no need
                        speed: 500 // unavailable - no need
                    }
                }
            );

            return;
        }
    });

    return;
}

PaymentRefundService.get = function (params) {

    var settings = new Object();
    settings.url = "payment-refund";
    if (params == null || params === undefined) {
        params = [];
    }
    settings.params = params;
    settings.handler = PaymentRefundService.handler;
    RestConnector.get(settings);
   
    return;
}

PaymentRefundService.legalEntityHandler = function (data) {

    var leType = $("#leInvoicingLegalEntityType");
    var filterLe = $("#filterLegalEntity");

    $.each(data, function () {

        var le = this;

        leType.append($("<option value='" + le.code + "'>" + le.description + "</option>"));
        filterLe.append($("<option value='" + le.code + "'>" + le.description + "</option>"));

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

PaymentRefundService.handler = function (data) {
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
                "orderable": true,
                "data": "payment_method_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "collection_channel_description"
            },
            {
                "className": 'centered',
                "orderable": true,
                "data": "merchant_description"
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

                    return "<span><a id='rowRemoveBtn_" + row.id + "' class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:PaymentRefundService.removeOnly(\"" + idList + "\");' title='Remover fila'><i class='glyphicon glyphicon-trash'></i></a></span>";
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

PaymentRefundService.update = function (id) {

    $("#ruleSellTypeFlag").val("U");
    $("#ruleSellTypeId").val(id);

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/payment-refund?id=" + id,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data != null && data.length == 1) {

                var entity = data[0];
                Commons.setOptionValue("spProductTypeUnique", entity.product_type);
                Commons.setMultiselectOptionValue("spCountrySiteUnique", entity.country_code_site);
                Commons.setOptionValue("spPaymentMethodUnique", entity.payment_method);

                Commons.setOptionValue("spCollectionChannelUnique", entity.collection_channel);
                Commons.setOptionValue("spMerchantUnique", entity.merchant);

                $("#leInvoicingLegalEntityType").val(entity.legal_entity_code);
                $("#leInvoicingLegalEntityType").multiselect('refresh');

                $('#spEnabledDate').children('input').val(entity.rule_start_date);

                $("#modalAddRule").modal("show");

                return;
            } else {
                noty(
                    {
                        text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
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

            return;
        },
        error: function (data) {
            noty(
                {
                    text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
                    layout: 'topRight',
                    type: 'error',
                    timeout: 10000,
                    animation: {
                        open: 'animated bounceInDown', // Animate.css class names
                        close: 'animated bounceOutUp', // Animate.css class names
                        easing: 'swing', // unavailable - no need
                        speed: 500 // unavailable - no need
                    }
                }
            );

            return;
        }
    });

    return;
}

PaymentRefundService.countryHandler = function (countryList) {

    var firstOption = new Object();
    firstOption.value = "*";
    firstOption.description = "*";

    CountryService.doComboFill($('#spCountrySite'), countryList, firstOption);
    CountryService.doComboFill($('#spCountrySiteUnique'), countryList, firstOption);
    CountryService.doComboFill($('#filterSpCountrySite'), countryList, firstOption, true);

    return;
}

PaymentRefundService.removeOnly = function (id) {

    return ButtonRemove.removeOnly(id,"payment-refund","#tSpResult","rowid",PaymentRefundService.getLastVersion);
};

PaymentRefundService.getAuditedByCode = function () {

    $('#modalRuleSellTypeAuditedTable').modal('show');
    $('.auditoria').width('80%');
    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/audited/payment-refund",
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
        	noty(
                    {
                        text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
                        layout: 'topRight',
                        type: 'error',
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
    });
}

PaymentRefundService.relaseNewVersion = function (versionDate) {

    $.ajax({
        type: "POST",
        url: Constants.CONTEXT_ROOT + "/app/service/payment-refund/newVersion?versionDate=" + versionDate,
        dataType: 'json',
        contentType: "application/json;",
        success: function (data) {
            if (data.status == 0) {
                ButtonsRulesAction.showNoty("Nueva version Actualizada con exito!! ", "topRight", "success", false)
                ButtonsRulesAction.getInfoRuleStatus("PAYMENT_REFUND", "btnReleaseVersion");
                PaymentRefundService.getLastVersion();
            } else {
                ButtonsRulesAction.showNoty("Ups! Error en release de nueva version", "topRight", "alert", false);
            }
        },
        error: function (data) {
        	noty(
                    {
                        text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
                        layout: 'topRight',
                        type: 'error',
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
    });
}

PaymentRefundService.getLastVersion = function () {

    $.ajax({
        type: "GET",
        url: Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=PAYMENT_REFUND&activated=true",
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
        	
        	noty(
                    {
                        text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
                        layout: 'topRight',
                        type: 'error',
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
    });
    ButtonsRulesAction.getInfoRuleStatus("PAYMENT_REFUND", "btnReleaseVersion");
}

PaymentRefundService.initQCatalog = function(params, catalogType, comboElementLisT,firstOption, blankOptionEnabled, toResponseFunction){
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

PaymentRefundService.initQCountry = function(params, catalogType, comboElementList,firstOption, blankOptionEnabled, toResponseFunction){
	
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