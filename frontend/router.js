var app = angular.module('Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        })//end contact
        .when("/error/404", {
            templateUrl: "frontend/module/error/view/404.html",
           controller: "controller_error"
        })//end error404
        .when("/error/503", {
            templateUrl: "frontend/module/error/view/503.html",
           controller: "controller_error"
        })//end error503
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
                }//end fuels
            }//resolves
        })//end home
        .otherwise("/home", {
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
                }//end fuels
            }//resolves
        })//end default
}]);