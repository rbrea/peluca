RestConnector = (function () {
    var ajax = function (settings, ajaxType) {

        var urlQueryString = "";

        var params = settings.params;

        if (params != null && params != "" && params != undefined) {

            $.each(params, function () {
                urlQueryString = Commons.buildUrlQueryString(urlQueryString, this.name, this.value);

                return;
            });
        }

        if (settings.url == null || settings.url == "" || settings === undefined) {
            return false;
        }

        var ajaxOptions = {
            type: ajaxType,
            url: Constants.CONTEXT_ROOT + "/app/service/" + settings.url + urlQueryString,
            dataType: 'json',
            data: settings.data,
            contentType: "application/json;",
            success: function (data) {
                if (data != null) {
                    if (settings.handler != null
                        && settings.handler != undefined
                        && settings.handler != "") {
                        settings.handler(data);
                    }
                } else {
                    var alertMessage = 'Ups! Mensaje: ';
                    if(settings.alertMessage != undefined && settings.alertMessage != null && settings.alertMessage != ""){
                        alertMessage = settings.alertMessage;
                    }
                    Noty.notyTopRightAlert(alertMessage + data.message);
                }

            },
            error: function (data) {
            	if(data.status != 200){
            		var errorMessage = 'Se ha producido un error, mensaje: ';
            		if(settings.errorMessage != undefined && settings.errorMessage != null && settings.errorMessage != ""){
            			errorMessage = settings.errorMessage;
            		}
            		Noty.notyTopRightError(errorMessage + data.responseJSON.cause);
            	}
            }
        };

        $.ajax(ajaxOptions);
    };

    var PostFile = function (uploadButon, postURL, tableResultDiv, tableResultBody, rowTemplate) {

        $(uploadButon).fileupload({
            url: Constants.CONTEXT_ROOT + postURL,
            type: "POST",
            contentType: false,
            dataType: 'json',
            add: function (e, data) {
                $('#messages').text('').css("display", "none");
                $('#filename').val(data.files[0].name);
                $('#uploadBtn').remove();
                data.context = $('<button/>')
                    .addClass('btn btn-primary start')
                    .append('<i class="glyphicon glyphicon-upload"></i><span> Upload</span>')
                    .attr("id", "uploadBtn")
                    .appendTo('#fileupload-bar')
                    .click(function (event) {
                        //data.context = $('#upload-text').text('Uploading...').replaceAll($(this));
                        event.preventDefault();
                        $('#messages').text('').css("display", "none");
                        data.submit();
                    });

            },
            progress: function (e, data) {

            },
            done: function (e, data) {
                if (data.result != null) {
                    if (data.result.entity_error_list != null && data.result.entity_error_list.length > 0) {
                        var errorModal = $("#modalError");
                        errorModal.find(".container-fluid").empty();

                        data.result.entity_error_list.forEach(function (element) {

                            errorModal.find(".container-fluid").append('<p class="eva-3-p">Error de Validacion - ' + element.description + '</p>');

                        });


                        $(".modal").modal("hide");
                        errorModal.modal("show");


                    }

                    if (data.result.client_form_summary_list != null) {
                        if (data.result.client_form_summary_list.length > 0) {

                            $(tableResultDiv).show();
                            RestConnector.appendTemplateResults(data.result.client_form_summary_list, tableResultBody, rowTemplate);
                            Noty.notyTopRightSuccess(data.result.client_form_summary_list.length + ' Items cargados / actualizados con exito\n');
                        }
                    }

                }
            },
            error: function (e, data) {
                var errorMessage = e.responseJSON.message + '; ' + e.statusText;
                var o = JSON.parse(e.responseText);
                if (o != null && o != undefined) {
                    errorMessage = o.cause;
                }
                Noty.notyTopRightError('Error Inesperado: ' + errorMessage);
            }
        });
    };


    var appendTemplateResults = function (results, tableResultBody, rowTemplate) {
        $(tableResultBody).empty();
        var source = $(rowTemplate).html();
        var template = Handlebars.compile(source);
        var html = template(results);
        $(tableResultBody).append(html);
    };
    
    var buildPair = function (name, value) {
        if (name == null || name == "" || name === undefined) {
            return false;
        }
        if (value == null || value === undefined) {
            value = "";
        }

        return {"name": name, "value": value};
    };

    var postUploadFile = function (uploadButton, postURL, uploadButtonId, doneHandler) {

        $(uploadButton).fileupload({
            url: Constants.CONTEXT_ROOT + postURL,
            type: "POST",
            contentType: false,
            dataType: 'json',
            add: function (e, data) {
                $('#messages').text('').css("display", "none");
                $('#filename').val(data.files[0].name);
                $('#' + uploadButtonId).remove();
                data.context = $('<button/>')
                    .addClass('btn btn-primary start')
                    .append('<i class="glyphicon glyphicon-upload"></i><span> Upload</span>')
                    .attr("id", uploadButtonId)
                    .appendTo('#fileupload-bar')
                    .click(function (event) {
                        event.preventDefault();
                        $('#messages').text('').css("display", "none");
                        data.submit();
                    });

            },
            progress: function (e, data) {
                return;
            },
            done: function (e, data) {
                doneHandler(e, data);

                return;
            },
            error: function (e, data) {

                var errorMessage = e.responseJSON.message + '; ' + e.statusText;
                if (e.responseText != null && e.responseText != "") {
                    errorMessage = JSON.parse(e.responseText).cause;
                }
                Noty.notyTopRightError('Error Inesperado: ' + errorMessage);
            }

        });
    };

    var get = function (settings) {
        return ajax(settings, "GET");
    };

    var post = function (settings) {
        return ajax(settings, "POST");
    };
    
    var ajaxQcall = function (type,settings,urlQueryString){
    	return Q($.ajax({
  		  type: type,
		  url: Constants.CONTEXT_ROOT + "/app/service/" + settings.url + urlQueryString,
		  contentType: "application/json; charset=utf-8",
		  data: settings.data,
		  dataType: "json"
		}));
    };
    
    var qGet = function(settings){
        var urlQueryString = "";
        var params = settings.params;
        if (params != null && params != "" && params != undefined) {
            $.each(params, function () {
                urlQueryString = Commons.buildUrlQueryString(urlQueryString, this.name, this.value);
                return;
            });
        }
        if (settings.url == null || settings.url == "" || settings === undefined) {
            return false;
        }
    	
    	ajaxQcall("GET",settings,urlQueryString)
    		.then(function (data) {
    			 if (data != null) {
                     if (settings.handler != null
                         && settings.handler != undefined
                         && settings.handler != "") {
                         settings.handler(data);
                     }
                 } else {
                     var alertMessage = 'Ups! Mensaje: ';
                     if(settings.alertMessage != undefined && settings.alertMessage != null && settings.alertMessage != ""){
                         alertMessage = settings.alertMessage;
                     }
                     Noty.notyTopRightAlert(alertMessage + data.message);
                 }
    		})
    		.fail(function (data){
            	if(data.status != 200){
            		var errorMessage = 'Se ha producido un error, mensaje: ';
            		if(settings.errorMessage != undefined && settings.errorMessage != null && settings.errorMessage != ""){
            			errorMessage = settings.errorMessage;
            		}
            		Noty.notyTopRightError(errorMessage + data.responseJSON.cause);
            	}
    		});
    };

    return {
        get: get,
        post: post,
        qGet: qGet,
        PostFile: PostFile,
        appendTemplateResults: appendTemplateResults,
        buildPair: buildPair,
        postUploadFile: postUploadFile
    }
})();
