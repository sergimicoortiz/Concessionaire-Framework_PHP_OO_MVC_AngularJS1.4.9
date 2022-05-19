app.controller('controller_shop_details', function ($scope, $rootScope, $routeParams, $window,  services_shop) {
    $rootScope.loadIn();
    services_shop.get_car_details($routeParams.car_id);
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;

    $scope.close_details = function () {
       $window.location.href = '#/shop'
    }//end close_details

    $rootScope.loadOut();
});//end controller