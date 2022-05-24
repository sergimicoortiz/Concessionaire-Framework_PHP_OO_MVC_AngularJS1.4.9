app.factory('services_login', ['services', '$rootScope', function (services, $rootScope) {
    var services_login = { load_menu: load_menu };
    return services_login;

    function load_menu() {
        if (localStorage.getItem('token')) {
            $rootScope.menutype = 'user';
        } else {
            $rootScope.menutype = 'default';
        }//end else if
    }//end load_menu

}]);//end services_login