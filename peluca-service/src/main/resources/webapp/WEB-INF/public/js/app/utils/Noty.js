/**
 * Created by nicolasdeciancio on 23/05/17.
 */
Noty = (function () {
    
    var notyOptions = function (message, position, type) {
        var notyPosition = 'topRight';
        if(position != undefined && position != null && position != ""){
            notyPosition = position;
        }
        return {
            text: '<strong>' + message + '</strong>',
            layout: notyPosition,
            type: type,
            timeout: 10000,
            animation: {
                open: 'animated bounceInDown', // Animate.css class names
                close: 'animated bounceOutUp', // Animate.css class names
                easing: 'swing', // unavailable - no need
                speed: 500 // unavailable - no need
            }
        };
    };
    
    var notyTopRightError = function (message) {
        noty(notyOptions(message,'topRight', 'error'));
    };

    var notyTopRightAlert = function (message) {
        noty(notyOptions(message,'topRight', 'alert'));
    };

    var notyTopRightWarning = function (message) {
        noty(notyOptions(message,'topRight', 'warning'));
    };

    var notyTopRightSuccess = function (message) {
        noty(notyOptions(message,'topRight', 'success'));
    };

    var notyTopCenterError = function (message) {
        noty(notyOptions(message,'topCenter', 'error'));
    };
    
    return {
        notyTopRightError: notyTopRightError,
        notyTopRightAlert: notyTopRightAlert,
        notyTopRightWarning: notyTopRightWarning,
        notyTopRightSuccess: notyTopRightSuccess,
        notyTopCenterError: notyTopCenterError
    }


})();