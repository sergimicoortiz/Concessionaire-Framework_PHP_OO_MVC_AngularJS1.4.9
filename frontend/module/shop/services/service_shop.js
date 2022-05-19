app.factory('services_shop', ['services', '$rootScope', function (services, $rootScope) {
    let service_shop = { load_cars: load_cars, get_car_details: get_car_details };
    return service_shop;

    function car_tractament(car_list, size = 4) {
        var lang_formater = "";
        if (localStorage.getItem('app-lang') == 'es') {
            lang_formater = 'es-ES';
        } else {
            lang_formater = 'en-US';
        }//end else 
        var formatter_extres = new Intl.ListFormat(lang_formater, { style: 'long', type: 'conjunction' });

        var car_tmp = [];
        car_list.forEach(car => {
            var title = car['brand_name'] + ': ' + car['model_name'];
            car['title'] = title.toUpperCase();
            var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));
            car['extres_formated'] = extres;
            car['like'] = false;
            car_tmp.push(car);
        });
        return $rootScope.array_divider(car_tmp, size);
    }//end car_tractament

    function load_cars() {
        var use_filters = false;
        $rootScope.car_page = 1;
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
                    var limit = $rootScope.car_page * 1;
                    $rootScope.cars_root = car_tractament(response);
                    $rootScope.cars_group = $rootScope.cars_root.slice(0, limit);
                },
                    function (error) {
                        $rootScope.error_callback("post_shop_cars_filters_error");
                    })//end post
        } else {
            services.post('shop', 'list_cars')
                .then(function (response) {
                    var limit = $rootScope.car_page * 1;
                    $rootScope.cars_root = car_tractament(response);
                    $rootScope.cars_group = $rootScope.cars_root.slice(0, limit);
                },
                    function (error) {
                        $rootScope.error_callback("post_shop_cars_all_error");
                    })//end post
        }//end else if
    }//end load_cars

    function get_car_details(car_id) {
        services.post('shop', 'details_car', { 'id': car_id })
            .then(function (response) {
                if (response.car.length == 0) {
                    $rootScope.error_callback("post_shop_cars_detail_not_found", "404");
                } else {
                    var lang_formater = "";
                    if (localStorage.getItem('app-lang') == 'es') {
                        lang_formater = 'es-ES';
                    } else {
                        lang_formater = 'en-US';
                    }//end else 
                    var formatter_extres = new Intl.ListFormat(lang_formater, { style: 'long', type: 'conjunction' });
                    var img_tmp = [];
                    response.img.forEach(row => {
                        img_tmp.push(row.car_img_file);
                    });//end foreach
                    var car_tmp = response.car[0];
                    var extres = formatter_extres.format(car_tmp['extres'].split(':').slice(0, -1));
                    car_tmp['extres_formated'] = extres;
                    $rootScope.car_details = car_tmp;
                    $rootScope.car_details_img = img_tmp;
                }//end else if
            },
                function (error) {
                    $rootScope.error_callback("post_shop_cars_detail_error");
                })//end post
    }//end get_car_details

}]);//end services_shop