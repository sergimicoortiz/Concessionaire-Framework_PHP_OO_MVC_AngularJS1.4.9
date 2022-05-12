function error_callback(error_msg, error_type = "503") {
    var callback = "#/error/" + error_type + "/" + error_msg;
    window.location.href = callback;
}//end error_callback


function loadIn(ms = 500, timeout = 0) {
    setTimeout(function () {
        $("#overlay").fadeIn(ms);
    }, timeout);
};//end loadIn


function loadOut(ms = 400, timeout = 400) {
    setTimeout(function () {
        $("#overlay").fadeOut(ms);
    }, timeout);
};//end loadOut