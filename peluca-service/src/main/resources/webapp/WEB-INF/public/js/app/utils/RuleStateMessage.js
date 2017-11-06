/**
 * Created by nicolasdeciancio on 29/03/17.
 */
RuleStateMessage = function () {

};

RuleStateMessage.showEditionMessage = function(){
    var element = $("#ruleStatusMessage");
    $("#ruleStatusMessage .message").text("Regla en Edicion");
    element.removeClass();
    element.addClass("eva-ribbon -bookmark -left -primary");
    element.show();
};

RuleStateMessage.showWaitingMessage = function(version){
    var element = $("#ruleStatusMessage");
    $("#ruleStatusMessage .message").text("Regla Esperando Aprobacion - Version " + version);
    element.removeClass();
    element.addClass("eva-ribbon -bookmark -left -tertiary");
    element.show();
};