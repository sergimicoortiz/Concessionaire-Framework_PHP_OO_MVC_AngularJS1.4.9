app.controller('controller_register', function ($scope, $rootScope, services_login) {

    $scope.email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.user_regex = /^[a-zA-Z0-9]*$/;

    $scope.btn_register = function () {
        const form_data = Object.fromEntries(new FormData(document.getElementById('form_register')));
        services_login.register_validate(form_data);
    }//end btn_register
});//end controller