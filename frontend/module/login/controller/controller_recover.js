app.controller('controller_recover', function ($scope, $rootScope, services_login, $routeParams) {
    $scope.email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

    $scope.recover_email = function () {
        services_login.recover_send_email(this.recover_email_form.email.$modelValue);
    }//end recover_email

    $scope.recover_password = function () {
        services_login.change_password($routeParams.token, this.recover_password_form.password_recover_1.$modelValue);
    }//end recover_password

    if ($routeParams.token) {
        $scope.recover_token = true;
    } else {
        $scope.recover_token = false;
    }//end else if

});//end controller