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
                }//end fuels
            }//resolves
        })//end home
        .otherwise("/home")//end default
}]);