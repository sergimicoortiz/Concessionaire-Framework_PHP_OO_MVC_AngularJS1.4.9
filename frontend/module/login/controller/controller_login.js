app.controller('controller_login', function ($scope, $rootScope, services_login, services_social_login) {
    $scope.btn_login = function () {
        const form_data = Object.fromEntries(new FormData(document.getElementById('form_login')));
        if (form_data.email == '' || form_data.password == '') {
            $rootScope.login_error = 1;
        } else {
            $rootScope.login_error = null;
            services_login.login(form_data);
        }//end else if
    }//end btn_login

    $scope.social_google = function () {
        services_social_login.social_login('google');
    }//end social_google

    $scope.social_git = function () {
        services_social_login.social_login('git');
    }//end social_git
});//end controller