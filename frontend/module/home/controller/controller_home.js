app.controller('controller_home', function ($scope, services, toastr, brands, categorys, fuels) {
    $scope.brands = brands;
    $scope.categorys = categorys;
    $scope.fuels = fuels;

    $scope.callback_shop = function () {
        var data_fileters = [];
        try {
            data_fileters.push(['b.brand_name', this.brand.brand_name])
        } catch (error) {
            //console.log("catch brand");
        }//end trycatch brand

        try {
            data_fileters.push(['cat.category_name', this.category.category_name])
        } catch (error) {
            //console.log("catch category");
        }//end trycatch category

        try {
            data_fileters.push(['f.fuel_type_name', this.fuel.fuel_type_name])
        } catch (error) {
            //console.log("catch fuel");
        }//end trycatch fuel

        console.log(data_fileters);
    }//end callback_shop

    window.addEventListener('load', function () {
        $('#slider').owlCarousel({
            items: 3,
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800
        });//end owlCarousel
    })//end load
});//end controller