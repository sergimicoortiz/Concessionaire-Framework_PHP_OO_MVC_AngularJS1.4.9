app.controller('controller_home', function ($scope, $timeout, brands, categorys, fuels, books) {
    loadIn();
    $scope.brands = brands;
    $scope.categorys = categorys;
    $scope.fuels = fuels;
    var books_tmp = [];
    books.items.forEach(book => {
        if (book.volumeInfo.title.length > 0 && book.volumeInfo.pageCount > 0) {
            books_tmp.push(book.volumeInfo);
        }//end if
    });//end foreach
    $scope.books = books_tmp;

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

    $timeout(function () {
        $('#slider').owlCarousel({
            items: 3,
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800
        });//end owlCarousel
        loadOut();
    }, 1000);//end timeout
});//end controller