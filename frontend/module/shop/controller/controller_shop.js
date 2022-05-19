app.controller('controller_shop', function ($scope, $rootScope, $window, toastr, services_shop, services_filters, brands, categorys, fuels, citys) {
    $rootScope.loadIn();
    services_shop.load_cars();
    services_filters.get_filters();
    $scope.brands_shop = brands;
    $scope.categorys_shop = categorys;
    $scope.fuels_shop = fuels;
    $scope.citys_shop = citys;

    $scope.scroll_shop = function () {
        $rootScope.car_page++;
        var limit = $rootScope.car_page * 1;
        $rootScope.cars_group = $rootScope.cars_root.slice(0, limit);
    }//end scroll_shop

    $scope.car_like = function () {
        console.log(this.car.car_id);
    }//end car_like

    console.log(categorys);
    console.log(fuels);
    console.log(citys);

    $rootScope.loadOut();
});//end controller