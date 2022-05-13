var app = angular.module('Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9', ['ngRoute', 'toastr']);

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
        .otherwise("/home")//end default
}]);//end config

app.run(function ($rootScope, $window) {

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
});//end run