app.factory('services_shop', ['services', '$rootScope', '$window', 'services_map', 'toastr', function (services, $rootScope, $window, services_map, toastr) {
    let service_shop = { load_cars: load_cars, get_car_details: get_car_details, like: like, get_user_likes: get_user_likes };
    return service_shop;

    function car_has_like(car) {
        if (localStorage.getItem('token')) {
            var user_likes = JSON.parse(localStorage.getItem('user_likes'));
            if (user_likes.includes(car.car_id)) {
                car['like'] = true;
                return car;
            }//end if
        }//end if  
        car['like'] = false;
        return car;
    }//end  car_has_like

    function get_user_likes() {
        services.post('shop', 'get_user_likes', { token: localStorage.getItem('token') })
            .then(function (response) {
                if (response == '"error"') {
                    $rootScope.error_callback("post_get_user_likes_error_data");
                } else {
                    localStorage.setItem('user_likes', JSON.stringify(response));
                }//end else if
            },
                function (error) {
                    $rootScope.error_callback("post_get_user_likes_error");
                })//end post
    }//end get_user_likes

    function like(car_id) {
        if (localStorage.getItem('token')) {
            services.post('shop', 'user_like', { token: localStorage.getItem('token'), car_id: car_id })
                .then(function (response) {
                    if (response) {
                        angular.element(document.getElementById('heart_' + car_id)).toggleClass('heart-active');
                    } else {
                        $rootScope.error_callback("post_user_like_error_data");
                    }//end else if
                },
                    function (error) {
                        $rootScope.error_callback("post_like_error");
                    })//end post
        } else {
            localStorage.setItem('url_callback', $window.location.hash);
            toastr.warning('Your need to be loged to do this.');
            setTimeout(function () {
                $window.location.href = '#/login';
            }, 1500)
        }//end else if
    }//end like

    function add_car_map(car_list) {
        car_list.forEach(car => {
            services_map.add_pointer(car, car.img, false);
        });//end foreach
    }//end add_car_map

    function car_tractament(car_list, car_id = null, size = 4) {
        var lang_formater = "";
        if (localStorage.getItem('app-lang') == 'es') {
            lang_formater = 'es-ES';
        } else {
            lang_formater = 'en-US';
        }//end else 
        var formatter_extres = new Intl.ListFormat(lang_formater, { style: 'long', type: 'conjunction' });

        var car_tmp = [];
        car_list.forEach(car => {
            if (car.car_id != car_id || car_id == null) {
                var title = car['brand_name'] + ': ' + car['model_name'];
                car['title'] = title.toUpperCase();
                var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));
                car['extres_formated'] = extres;
                car = car_has_like(car);
                car_tmp.push(car);
            }//end if
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
                    add_car_map(response);
                    $rootScope.cars_root = car_tractament(response);
                    $rootScope.cars_group = $rootScope.cars_root.slice(0, $rootScope.car_page * 1);
                },
                    function (error) {
                        $rootScope.error_callback("post_shop_cars_filters_error");
                    })//end post
        } else {
            services.post('shop', 'list_cars')
                .then(function (response) {
                    add_car_map(response);
                    $rootScope.cars_root = car_tractament(response);
                    $rootScope.cars_group = $rootScope.cars_root.slice(0, $rootScope.car_page * 1);
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
                    car_tmp = car_has_like(car_tmp);
                    get_cars_related(car_tmp);
                    services_map.add_map([car_tmp.lon, car_tmp.lat], 8)
                    services_map.add_pointer(car_tmp, img_tmp[0]);
                    $rootScope.car_details = car_tmp;
                    $rootScope.car_details_img = img_tmp;
                }//end else if
            },
                function (error) {
                    $rootScope.error_callback("post_shop_cars_detail_error");
                })//end post
    }//end get_car_details

    function get_cars_related(car) {
        const filters_related = [['b.brand_name', car.brand_name]];
        services.post('shop', 'list_cars_filters', { "f_data": filters_related })
            .then(function (response) {
                $rootScope.related_cont = 1;
                $rootScope.cars_related_all = car_tractament(response, car.car_id);
                $rootScope.cars_related_group = $rootScope.cars_related_all.slice(0, $rootScope.related_cont * 1);

            },
                function (error) {
                    $rootScope.error_callback("post_shop_cars_related_error");
                })//end post
    }//end get_cars_related
}]);//end services_shop