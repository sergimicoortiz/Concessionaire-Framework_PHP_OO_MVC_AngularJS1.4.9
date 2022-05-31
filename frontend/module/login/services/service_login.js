app.factory('services_login', ['services', '$rootScope', 'toastr', '$window', 'services_localstorage', function (services, $rootScope, toastr, $window, services_localstorage) {
    var services_login = {
        load_menu: load_menu,
        register_validate: register_validate,
        verify: verify,
        login: login,
        logout: logout,
        recover_send_email: recover_send_email,
        change_password: change_password,
        user_control: user_control,
        refresh_token_cookies: refresh_token_cookies,
        user_timeout: user_timeout
    };
    return services_login;

    function load_menu() {
        if (localStorage.getItem('token')) {
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
                    }, 2000);
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
                    $rootScope.login_error = null;
                    toastr.success('Login successful.');
                    services_localstorage.new_sesion(response);
                    setTimeout(function () {
                        if (localStorage.getItem('url_callback')) {
                            var callback = localStorage.getItem('url_callback')
                            localStorage.removeItem('url_callback')
                        } else {
                            var callback = '#/home';
                        }//end else if
                        $window.location.href = callback;
                        $window.location.reload();
                    }, 2000);
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
                    localStorage.removeItem('user_likes')
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


    function recover_send_email(email) {
        services.post('login', 'send_email_recover', { 'email': email })
            .then(function (response) {
                if (response == '"ok"') {
                    toastr.success('Email send successful.');
                } else {
                    toastr.error('An error has occurred.');
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_recover_send_email_error");
                })//end post
    }//end recover_send_email

    function change_password(token, password) {
        services.post('login', 'update_password_recover', { 'token': token, 'password': password })
            .then(function (response) {
                if (response == '"ok"') {
                    toastr.success('Password change successful.');
                    setTimeout(function () {
                        $window.location.href = "#/login";
                    }, 2000);
                } else {
                    toastr.error('An error has occurred.');
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_change_password_error");
                })//end post
    }//end change_password

    function user_control() {
        services.post('login', 'user_control', { 'token': localStorage.getItem('token') })
            .then(function (response) {
                if (response != '"ok"') {
                    toastr.warning('Your session will be closed.');
                    setTimeout(function () {
                        logout();
                    }, 1500);//end setTimeout
                }//end if
            },
                function (error) {
                    $rootScope.callback_error("post_user_control_error");
                })//end post
    }//end user_control

    function refresh_token_cookies() {
        services.post('login', 'refresh_token_cookies', { 'token': localStorage.getItem('token') })
            .then(function (response) {
                if (response == '"error"') {
                    toastr.warning('Your session will be closed.');
                    setTimeout(function () {
                        logout();
                    }, 1500);//end setTimeout
                } else {
                    services_localstorage.new_sesion(response);
                }//end else if
            },
                function (error) {
                    $rootScope.callback_error("post_refresh_token_cookies_error");
                })//end post
    }//refresh_token_cookies

    function user_timeout() {
        services.post('login', 'user_timeout')
            .then(function (response) {
                if (response != '"ok"') {
                    toastr.warning('Your session will be closed.');
                    setTimeout(function () {
                        logout();
                    }, 1500);//end setTimeout
                }//end if
            },
                function (error) {
                    $rootScope.callback_error("post_user_timeout_error");
                })//end post
    }//end user_timeout

}]);//end services_login