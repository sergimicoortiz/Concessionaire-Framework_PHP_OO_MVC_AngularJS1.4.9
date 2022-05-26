app.controller('controller_verify', function ($scope, $rootScope, services_login, $routeParams) {
    services_login.verify($routeParams.token);
});//end controller