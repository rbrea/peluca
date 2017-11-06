/**
 * Created by nicolasdeciancio on 06/06/17.
 */
EventReportController = (function () {
    
    var init = function () {
        initDatePickers();
        initEntityType();
        initSearchButton();
        initResetButton();

        $('#modalReport').on('hidden.bs.modal', function (e) {
            resetEventModal();
        });
        initSelectAllLabels();

        //get();
    };
    
    var initSearchButton = function () {
        $("#btnSpSearch").on("click", function () {

            var params = [];

            params.push(RestConnector.buildPair("fromDate", $("#filterSpDateFrom input").val()));
            params.push(RestConnector.buildPair("toDate", $("#filterSpDateTo input").val()));
            params.push(RestConnector.buildPair("xClient", $("#filterSpXClient").val()));
            params.push(RestConnector.buildPair("entityType", $("#filterSpRule").val()));

            get(params);
        });
    };

    var initResetButton = function () {
        $("#btnSpReset").on("click", function (e) {
            e.preventDefault();

            $(this).closest('form').find("input[type=text], textarea").val("");
            $('#filterSpRule :selected').removeAttr("selected");
        });
    };

    var initDatePickers = function () {
        $('#filterSpDateFrom,#filterSpDateTo').datetimepicker({
            pickTime: false,
            autoclose: true
        });
    };

    var get = function (params) {
        EventReportService.getEvents(params,handler)
    };

    var handler = function (data) {
        var table = $("#tSpResult").dataTable({
            "fnInitComplete": function () {
            },
            "order": [[ 2, "desc" ]],
            "bDestroy": true,
            responsive: false,
            "bProcessing": true,
            "createdRow": function (row, data, index) {
                $(row).attr("id", "rowid_" + data.id);
                $(row).data('rowid', data.id);
            },
            "drawCallback": function () {
                LoginService.getUserData();
            },
            "data": data,
            "iDisplayLength": 50,
            "columns": [
                {
                    "className": 'centered',
                    "orderable": false,
                    "data": "request_xclient"
                },
                {
                    "className": 'centered',
                    "orderable": false,
                    "data": "entity_type"
                },
                {
                    "className": 'centered',
                    "orderable": true,
                    "render": function (data, type, row) {

                        return new Date(row.event_date).toLocaleString();
                    }
                },
                {
                    "className": 'centered',
                    "orderable": false,
                    "render": function (data,type,row) {
                        if(row.event_status != undefined && row.event_status != null){
                            if(row.event_status == "OK"){
                                return "<span class='glyphicon glyphicon-ok status' title='" + row.event_status + "'></span>"
                            }else{
                                return "<span class='glyphicon glyphicon-remove status' title='" + row.event_status + "'></span>"
                            }
                        }
                        return "";
                    }
                },
                {
                    "className": 'centered',
                    "orderable": true,
                    "data": "request_time"
                },
                {
                    "className": 'centered Edition',
                    "orderable": false,
                    "render": function (data, type, row) {
                        return "<span><a id='exchangeData_" + row.id + "' href='javascript:void(0);' onclick='javascript:EventReportController.showExchangeData(" + row.id + ");' title='Datos de Intercambio'><i class='glyphicon glyphicon-search'></i></a></span>";
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

        LoginService.getUserData();
        $(".status").tooltip();
    };

    var showExchangeData = function (id) {
        EventReportService.getEventById(id,singleEventHandler);
    };
    
    var singleEventHandler = function (data) {
        $("#modal-title").text(data.request_xclient);
        $("#modal-sub-title").text('Host: ' + data.request_host + '\tX-UOW: ' + data.request_uow);
        if(data.event_status == 'OK'){
            $(".eva-3-header-booking-as .eva-3-booking-status").addClass('-success');
            $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product").addClass('eva-3-icon-smile-circle');
            $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product .booking-status-icon").addClass('eva-3-icon-checkmark-circle');
        }else{
            $(".eva-3-header-booking-as .eva-3-booking-status").addClass('-error');
            $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product").addClass('eva-3-icon-hot');
            $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product .booking-status-icon").addClass('eva-3-icon-error-circle');
        }
        $("#data-class-name").text('Nombre de la Clase: ' + data.clazz_name);
        $("#data-method-name").text('Nombre del Metodo: ' + data.method_name);
        $("#data-entity-type").text('Tipo de Entidad: ' + data.entity_type);

        var requestUrl = Commons.chunkString(data.request_url, 120);
        var ru = "";
        if(requestUrl != null){
        	ru = requestUrl.join("</br>");
        }
        $("#data-request-url").html('<p>Request URL:&nbsp;' + ru + "</p>");
        var requestJson = JSON.parse(data.request_json);
        var responseJson = JSON.parse(data.response_json);
        $("#taRequestJson").html(Commons.syntaxHighlight(requestJson));
        $("#taResponseJson").html(Commons.syntaxHighlight(responseJson));
        $("#modalReport").modal('show');
        
        return;
    };

    var initEntityType = function () {
        var settings = new Object();
        settings.url = "values/entity-type/all";
        settings.handler = function (list) {
            ValuesService.buildCombo($("#filterSpRule"), list, true, true);
        };
        RestConnector.get(settings);
    };

    var resetEventModal = function () {
        $("#taRequestJson").val('');
        $("#taResponseJson").val('');
        $("#modal-title").text('');
        $("#modal-sub-title").text('');
        $("#data-class-name").text('');
        $("#data-method-name").text('');
        $("#data-entity-type").text('');
        $("#data-request-url").text('');
        $(".eva-3-header-booking-as .eva-3-booking-status").removeClass('-success');
        $(".eva-3-header-booking-as .eva-3-booking-status").removeClass('-error');
        $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product").removeClass('eva-3-icon-smile-circle');
        $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product").removeClass('eva-3-icon-hot');
        $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product .booking-status-icon").removeClass('eva-3-icon-checkmark-circle');
        $(".eva-3-header-booking-as .eva-3-booking-status .booking-status-product .booking-status-icon").removeClass('eva-3-icon-error-circle');
    };

    var initSelectAllLabels = function () {
        $("#saRequestJson").on('click',function () {
            selectText('taRequestJson');
        });
        $("#saResponseJson").on('click',function () {
            selectText('taResponseJson');
        });
    };

    function selectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
            ;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    return {
        init:init,
        showExchangeData:showExchangeData
    }
})();