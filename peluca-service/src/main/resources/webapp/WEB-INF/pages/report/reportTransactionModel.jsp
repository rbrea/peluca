<div id="modalReport" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>
                <h4 class="modal-title">Reporte del Evento</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="eva-3-booking-as -short-content">

                            <div class="eva-3-header-booking-as">

                                <span class="eva-3-booking-status -eva-3-fl"><i class="booking-status-product"><i class="booking-status-icon"></i></i></span>
                                <div class="header-booking-title">
                                    <h4 class="eva-3-h4" id="modal-title"></h4>
                                    <p class="eva-3-p" id="modal-sub-title"></p>
                                </div>
                            </div>
                            <div class="booking-container">
                                <div class"eva-3-slide="class" eva-3-slide"="" -sm="-sm" -down="-down">
                                    <div >
                                        <p id="data-class-name"></p>
                                        <p id="data-method-name"></p>
                                        <p id="data-entity-type"></p>
                                        <p id="data-request-url"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="eva-3-textarea -md ">
                                <div class="textarea-container">
                                    <%--<textarea type="text" placeholder="Placeholder" id="taRequestJson" rows="20" class="textarea-tag"></textarea>--%>
                                    <pre id="taRequestJson"></pre>
                                </div>
                            </div>
                            <label for="taRequestJson" class="control-label"><a id="saRequestJson">Seleccionar todo...</a></label>
                        </div>
                        <div class="col-md-6">
                            <div class="eva-3-textarea -md ">
                                <div class="textarea-container">
                                    <%--<textarea type="text" placeholder="Placeholder" id="taResponseJson" rows="20" class="textarea-tag"></textarea>--%>
                                    <pre id="taResponseJson"></pre>
                                </div>
                            </div>
                            <label for="taResponseJson" class="control-label"><a id="saResponseJson">Seleccionar todo...</a></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>