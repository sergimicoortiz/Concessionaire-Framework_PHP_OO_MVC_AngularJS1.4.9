app.factory('services_social_login', ['services', '$rootScope', 'toastr', '$window', 'services_localstorage', function (services, $rootScope, toastr, $window, services_localstorage) {
    var services_social_login = { social_login: social_login };
    return services_social_login;

    function social_login(method) {
        if (!$rootScope.firebase_ready) {
            $rootScope.firebase_ready = true;
            var config_firebase = {
                apiKey: "AIzaSyDVvFTxUKXuL-IIZiQWKHtF2s8cQLapAko",
                authDomain: "test-f84a8.firebaseapp.com",
                projectId: "test-f84a8",
                storageBucket: "test-f84a8.appspot.com",
                messagingSenderId: "749406018710"
            };
            firebase.initializeApp(config_firebase);
        }

        switch (method) {
            case 'google':
                var authService = firebase.auth();
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('email');
                authService.signInWithPopup(provider)
                    .then(function (result) {
                        login(result);
                    })
                    .catch(function (error) {
                        toastr.error('An error has occurred. Maybe the email or the username are alredy in use.');
                    });//end firebase
                break;
            case 'git':
                var authService = firebase.auth();
                var provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('email');
                authService.signInWithPopup(provider)
                    .then(function (result) {
                        login(result);
                    })
                    .catch(function (error) {
                        toastr.error('An error has occurred. Maybe the email or the username are alredy in use.');
                    });//end firebase
                break;

            default:
                toastr.warning('Social login method not found');
                break;
        }//end switch
    }//end firebase

    function login(user_data) {
        const username = user_data.user.displayName;
        const email = user_data.user.email
        const profile = user_data.user.photoURL
        const user_id = user_data.user.uid
        const provider = user_data.credential.providerId;
        const user = { 'username': username, 'email': email, 'profile': profile, 'user_id': user_id, "provider": provider };
        services.post('login', 'social_singin', user)
            .then(function (response) {
                if (response == '"error"') {
                    toastr.error('An error has occurred. Maybe the email or the username are alredy in use.');
                } else if (response == '"error_insert"') {
                    $rootScope.callback_error("post_social_login_error_insert");
                } else {
                    services_localstorage.new_sesion(response);
                    if (localStorage.getItem('url_callback')) {
                        var callback = localStorage.getItem('url_callback')
                        localStorage.removeItem('url_callback')
                    } else {
                        var callback = '#/home';
                    }//end else if
                    $window.location.href = callback;
                    $window.location.reload();
                }//end else if 
            },
                function (error) {
                    $rootScope.callback_error("post_social_login_error");
                })//end post
    }//end login_social_singin

}]);//end services_social_login