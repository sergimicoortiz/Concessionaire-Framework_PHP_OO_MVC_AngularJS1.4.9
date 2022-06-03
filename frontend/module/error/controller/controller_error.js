app.controller('controller_error', function ($scope, services, $routeParams) {
    var error_type = $routeParams.error_type;
    if ($routeParams.error_type != "404" && $routeParams.error_type != "503") {
        error_type = "404";
    }//end if
    $scope.error_img = error_type;
    var error_data = { 'type': error_type, 'msg': $routeParams.error_msg };
    services.post('error', 'send_error', error_data);
});//end controller