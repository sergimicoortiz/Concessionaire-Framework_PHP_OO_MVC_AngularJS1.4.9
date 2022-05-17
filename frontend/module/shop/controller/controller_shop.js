app.controller('controller_shop', function ($scope, $rootScope, $window, toastr, services_shop, brands, categorys, fuels, citys) {
    $rootScope.loadIn();
    services_shop.load_cars();
    $scope.brands = brands;
    $scope.categorys = categorys;
    $scope.fuels = fuels;
    $scope.citys = citys;

    $scope.price_selected = 'null';

    $scope.scroll_shop = function () {
        $rootScope.car_page++;
        var limit = $rootScope.car_page * 1;
        $rootScope.cars_group = $rootScope.cars_root.slice(0, limit);
    }//end scroll_shop

    $scope.car_like = function () {
        console.log(this.car.car_id);
    }//end car_like

    console.log(brands);
    console.log(categorys);
    console.log(fuels);
    console.log(citys);

    $rootScope.loadOut();
});//end controller