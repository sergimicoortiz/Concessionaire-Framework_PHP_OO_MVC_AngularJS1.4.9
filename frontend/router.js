var app = angular.module('Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9', ['ngRoute', 'toastr', 'ui.bootstrap', 'infinite-scroll']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        })//end contact
        .when("/error/:error_type/:error_msg", {
            templateUrl: "frontend/module/error/view/error.html",
            controller: "controller_error"
        })//end error
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "controller_home",
            resolve: {
                brands: function (services) {
                    return services.post('home', 'get_brands_rand');
                },//end brand
                categorys: function (services) {
                    return services.post('home', 'get_category_rand');
                },//end categorys
                fuels: function (services) {
                    return services.post('home', 'get_fuel_rand_eco');
                },//end fuels
                books: function (services) {
                    return services.getUrl('https://www.googleapis.com/books/v1/volumes?q=electric%20cars');
                }//end books
            }//resolves
        })//end home
        .when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "controller_shop",
            resolve: {
                brands: function (services) {
                    return services.post('shop', 'list_brands');
                },//end brands
                categorys: function (services) {
                    return services.post('shop', 'list_category');
                },//end categorys
                fuels: function (services) {
                    return services.post('shop', 'list_fuels');
                },//end fuels
                citys: function (services) {
                    return services.post('shop', 'list_city');
                }//end citys
            }//end resolve
        })//end shop
        .when("/shop/details/:car_id", {
            templateUrl: "frontend/module/shop/view/shop_details.html",
            controller: "controller_shop_details"
        })//end shop details
        .when("/register", {
            templateUrl: "frontend/module/login/view/register.html",
            controller: "controller_register"
        })//end register
        .when("/login", {
            templateUrl: "frontend/module/login/view/login.html",
            controller: "controller_login"
        })//end login
        .when("/verify/:token", {
            templateUrl: "frontend/module/login/view/verify.html",
            controller: "controller_verify"
        })//end verify
        .when("/recover/", {
            templateUrl: "frontend/module/login/view/recover.html",
            controller: "controller_recover"
        })//end recover
        .when("/recover/:token", {
            templateUrl: "frontend/module/login/view/recover.html",
            controller: "controller_recover"
        })//end recover
        .otherwise("/home")//end default
}]);//end config

app.run(function ($rootScope, $window, services_search, services_login, services_shop) {

    $rootScope.error_callback = function (error_msg, error_type = "503") {
        var callback = "#/error/" + error_type + "/" + error_msg;
        $window.location.href = callback;
    }//end error_callback

    $rootScope.loadIn = function (ms = 500, timeout = 0) {
        setTimeout(function () {
            $("#overlay").fadeIn(ms);
        }, timeout);
    }//end loadIn

    $rootScope.loadOut = function (ms = 500, timeout = 500) {
        setTimeout(function () {
            $("#overlay").fadeOut(ms);
        }, timeout);
    }//end loadOut

    $rootScope.array_divider = function (arr, chunckSize, include_rests = true) {
        var arr_group = [];

        if (include_rests) {
            var chunckFor = Math.ceil(arr.length / chunckSize);
        } else {
            var chunckFor = Math.floor(arr.length / chunckSize);
        }//end else if

        for (let i = 0; i < chunckFor; i++) {
            var offset = i * chunckSize;
            var limit = offset + chunckSize;
            arr_group.push(arr.slice(offset, limit));
        }//end for
        return arr_group;
    }//end array_divider

    ////SEARCH////

    services_search.get_category();

    $rootScope.search_change_category = function () {
        services_search.get_brands();
        $rootScope.brand_search = null;
        $rootScope.city_search = null;
        $rootScope.citys_search = null;
    }//end search_change_category

    $rootScope.search_change_city = function () {
        services_search.get_citys();
    }//end search_change_city

    $rootScope.search_change_brand = function () {
        $rootScope.city_search = null;
        $rootScope.citys_search = null;
    }//end search_change_brand

    $rootScope.select_city = function () {
        $rootScope.city_search = this.city.city;
        $rootScope.citys_search = null;
    }//end select_city

    $rootScope.search_btn = function () {
        services_search.filters_search();
        if ($window.location.hash.split('/')[1] == 'shop' && $window.location.hash.split('/')[2] != 'details') {
            $window.location.reload();
        } else {
            $window.location.href = '#/shop';
            $rootScope.brand_search = null;
            $rootScope.city_search = null;
            $rootScope.category_search = null;
        }//end else if

    }//end select_city

    ////LOGIN////

    $rootScope.logout = function () {
        services_login.logout();
    }//end logout

    setInterval(function () {
        if (!localStorage.getItem('time_interval')) {
            localStorage.setItem('time_interval', 0);
        }//end if
        const time = 5000 + parseInt(localStorage.getItem('time_interval'));
        localStorage.setItem('time_interval', time);
        if (localStorage.getItem('time_interval') >= 600000) { //600000 default
            localStorage.setItem('time_interval', 0);
            if (localStorage.getItem('token')) {
                services_login.user_timeout();
                services_login.refresh_token_cookies();
            }//end if
        }//end if
    }, 5000)//end interval

    $rootScope.$on('$routeChangeSuccess', function () {
        //console.log('rootScope $routeChangeSuccess');
        services_login.load_menu();
        if (localStorage.getItem('token')) {
            services_login.user_control();
            services_shop.get_user_likes();
        }//end if
    });

});//end run