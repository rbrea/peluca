/**
 * Created by nicolasdeciancio on 17/03/17.
 */
ButtonRemove = function () {

};

ButtonRemove.removeOnly = function (id, service, tableSelector, dataSelector, getLastVersion) {
    if (Commons.isBlank(id)) {
        return;
    }

    var idList = [];

    var ids = id.split(',');
    
    for(var k=0;k<ids.length;k++){
    	idList.push(ids[k]);
    }

    return ButtonRemove.remove(idList, service, tableSelector, dataSelector, getLastVersion);
};

ButtonRemove.remove = function (idList, service, tableSelector, dataSelector, getLastVersion) {
    if (idList == null || idList === undefined || idList == "" || idList.length == 0) {
        ButtonsRulesAction.showNoty("No se ha seleccionado ningún elemento para borrar", "topRight", "information", false);
        return false;
    }


    noty({
        text: 'Esta seguro que desea borrar los elementos seleccionados?',
        modal: true,
        layout: 'topCenter',
        type: "error",
        animation: {
            open: 'animated bounceIn', // Animate.css class names
            close: 'animated flipOutX', // Animate.css class names
            easing: 'swing', // unavailable - no need
            speed: 500 // unavailable - no need
        },
        buttons: [
            {
                addClass: 'btn btn-success', text: 'Aceptar', onClick: function ($noty) {

                $noty.close();

                $.ajax({
                    type: "DELETE",
                    url: Constants.CONTEXT_ROOT + "/app/service/" + service,
                    dataType: 'json',
                    data: JSON.stringify({"ids": idList}),
                    contentType: "application/json;",
                    success: function (data) {
                        if (data != null && data.status == 0) {

                            var table = $(tableSelector).DataTable();

                            var rows = $(tableSelector).dataTable().fnGetNodes();

                            $.each(rows, function () {
                                var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
                                var id = check.parent().parent().data(dataSelector);
                                if(id == null || id.length == 0){
                                	id = $(this).data(dataSelector);
                                }
                                if (id != undefined) {
                                    id = id.toString();
                                }
                                if (idList.indexOf(id) > -1) {
                                    table.row($(this)).remove();
                                }

                                return;
                            });
                            table.draw();

                            ButtonsRulesAction.showNoty("Los elementos seleccionados se han borrado con éxito!", "topRight", "success", false);

                            $("#spSelectAll").prop("checked", false);
                            if(getLastVersion != null && getLastVersion != undefined && getLastVersion != ""){
                            	getLastVersion();
                            }
                        } else {
                            ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.message, "topRight", "alert", false);
                        }

                    },
                    error: function (data) {
                        ButtonsRulesAction.showNoty("Error al intentar borrar. Mensaje: " + data.responseJSON.cause, "topRight", "error", false);
                    }
                });

            }
            },
            {
                addClass: 'btn btn-default', text: 'Cancelar', onClick: function ($noty) {
                $noty.close();
            }
            }
        ]
    });

};