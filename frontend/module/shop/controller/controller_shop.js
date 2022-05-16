app.controller('controller_shop', function ($scope, $rootScope, services_shop) {
    $rootScope.loadIn();
    services_shop.load_cars();
    console.log($rootScope.cars);
    $rootScope.loadOut();
});//end controller