app.controller('controller_error', function ($scope, services, toastr) {
    var error_type = window.location.hash.split('/')[2].split('?')[0];
    var error_msg = window.location.hash.split('/')[2].split('?')[1].split('=')[1] || "Empty";
    var error_data = { 'type': error_type, 'msg': error_msg };
    console.log(error_data);
});//end controller