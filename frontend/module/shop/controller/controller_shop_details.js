app.controller('controller_shop_details', function ($scope, $rootScope, $routeParams, $window, services_shop, services_map) {
    $rootScope.loadIn();
    services_shop.get_car_details($routeParams.car_id);
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;

    $scope.close_details = function () {
        $window.location.href = '#/shop'
    }//end close_details

    $scope.car_like_details = function () {
        services_shop.like(this.car_details.car_id);
    }//end car_like_details

    $scope.car_like_related = function () {
        services_shop.like(this.car_related.car_id);
    }//end car_like_related

    $scope.scroll_related = function () {
        $rootScope.related_cont++;
        $rootScope.cars_related_group = $rootScope.cars_related_all.slice(0, $rootScope.related_cont * 1);

    }//end scroll_related
    $rootScope.loadOut();
});//end controller