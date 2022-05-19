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

    $scope.send_filters_shop = function () {
        var form_data = Object.fromEntries(new FormData(document.getElementById('filter_form')));
        services_filters.set_filters(form_data);
        $window.location.reload();
    }//end send filters

    $scope.reset_filters_shop = function () {
        services_filters.reset_filters();
        $window.location.reload();
    }//end reset filters

    $rootScope.loadOut();
});//end controller