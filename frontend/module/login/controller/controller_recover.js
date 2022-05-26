app.controller('controller_recover', function ($scope, $rootScope, services_login, $routeParams) {
    if ($routeParams.token) {
        console.log($routeParams.token);
    } else {
        console.log('no token');
    }//end else if
});//end controller