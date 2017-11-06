/**
 * Created by nicolasdeciancio on 06/06/17.
 */
EventReportService = (function () {
    var getEvents = function (params,handler) {
        var settings = new Object();
        settings.url = "event-report";
        if (params == null || params === undefined) {
            params = [];
        }
        settings.params = params;
        settings.handler = handler;

        RestConnector.get(settings);
    };

    var getEventById = function (id,handler) {
        var settings = new Object();
        settings.url = "event-report/event";
        var params = [];
        params.push(RestConnector.buildPair("id", id));
        settings.params = params;
        settings.handler = handler;

        RestConnector.get(settings);
    };
    
    return {
        getEvents:getEvents,
        getEventById:getEventById
    }
})();