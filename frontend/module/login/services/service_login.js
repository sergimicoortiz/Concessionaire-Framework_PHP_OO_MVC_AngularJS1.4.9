app.factory('services_login', ['services', '$rootScope', 'toastr', '$window', 'services_localstorage', function (services, $rootScope, toastr, $window, services_localstorage) {
    var services_login = { load_menu: load_menu, register_validate: register_validate, verify: verify, login: login, logout: logout };
    return services_login;

    function load_menu() {
        if (localStorage.getItem('token')) {
            //$rootScope.menutype = 'user';
            get_user_data();
            $rootScope.menutype = 'user';
        } else {
            $rootScope.menutype = 'default';
        }//end else if
    }//end load_menu

    function register_validate(form_data) {
        //console.log(form_data);
        services.post('login', 'validate_user', form_data)
            .then(function (response) {
                if (response[0]['cont'] == 1) {
                    $rootScope.invalid_user_register = true;
                } else {
                    $rootScope.invalid_user_register = false;
                    register(form_data);
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_validate_user_error");
                })//end post
    }//end register

    function register(form_data) {
        services.post('login', 'insert_user', form_data)
            .then(function (response) {
                if (response) {
                    toastr.success('Register successful, please cech your email to verify your account.');
                    setTimeout(function () {
                        $window.location.href = "#/home";
                    }, 3000);
                } else {
                    toastr.error('An error has occurred.');
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_register_error");
                })//end post
    }//end register

    function verify(token) {
        services.post('login', 'validate_email_user', { 'token': token })
            .then(function (response) {
                if (response) {
                    toastr.success('Register successful.');
                    setTimeout(function () {
                        $window.location.href = "#/login";
                    }, 3000);
                } else {
                    toastr.error('An error has occurred.');
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_verify_error");
                })//end post
    }//end verify

    function login(form_data) {
        services.post('login', 'login', form_data)
            .then(function (response) {
                if (response == '"error"') {
                    $rootScope.login_error = 2;
                } else {
                    toastr.success('Login successful.');
                    response = response.substring(1, response.length - 1);
                    services_localstorage.new_sesion(response);
                    setTimeout(function () {
                        $window.location.href = "#/home";
                        $window.location.reload();
                    }, 3000);
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_login_error");
                })//end post
    }//end login

    function get_user_data() {
        var token = localStorage.getItem('token');
        services.post('login', 'get_user_data', { 'token': token })
            .then(function (response) {
                $rootScope.user_data = response;
            },
                function (error) {
                    $rootScope.callback_error("post_get_user_data_error");
                })//end post
    }//end get_user_data

    function logout() {
        services.post('login', 'logout')
            .then(function (response) {
                if (response == '"ok"') {
                    services_localstorage.delete_sesion();
                    $window.location.href = "#/home";
                    $window.location.reload();
                } else {
                    $rootScope.callback_error("post_logout_error_response");
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_logout_error");
                })//end post
    }//end logout

}]);//end services_login