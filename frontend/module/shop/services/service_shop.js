app.factory('services_shop', ['services', '$rootScope', function (services, $rootScope) {
    let service_shop = { load_cars: load_cars };
    return service_shop;

    function load_cars() {
        var use_filters = false;
        if (localStorage.getItem('filters')) {
            var filters = JSON.parse(localStorage.getItem('filters'));
            filters.forEach(filter => {
                if (filter[1] != 'null') {
                    use_filters = true;
                }//end if
            });//end foreach
        }//end if

        if (use_filters) {
            services.post('shop', 'list_cars_filters', { "f_data": JSON.parse(localStorage.getItem('filters')) })
                .then(function (response) {
                    console.log(response);
                    $rootScope.cars = response;
                },
                    function (error) {
                        $rootScope.error_callback("post_shop_cars_all_error");
                    })//end post
        } else {
            services.post('shop', 'list_cars')
                .then(function (response) {
                    console.log(response);
                    $rootScope.cars = response;
                },
                    function (error) {
                        $rootScope.error_callback("post_shop_cars_all_error");
                    })//end post
        }//end else if
    }//end load_cars

}]);//end services_shop