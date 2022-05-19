app.controller('controller_home', function ($scope, $rootScope, $window, brands, categorys, fuels, books) {
    $rootScope.loadIn();
    $scope.brands_home = brands;
    $scope.categorys_home = categorys;
    $scope.fuels_home = fuels;

    var books_all = [];
    var book_cont = 1;

    books.items.forEach(book => {
        if (book.volumeInfo.title.length > 0 && book.volumeInfo.pageCount > 0 && book.volumeInfo.description != undefined) {
            const book_tmp = {
                'link': book.volumeInfo.infoLink,
                'title': book.volumeInfo.title,
                'pages': book.volumeInfo.pageCount,
                'desc': book.volumeInfo.description,
                'img': book.volumeInfo.imageLinks.thumbnail
            };
            books_all.push(book_tmp);
        }//end if
    });//end foreach 

    var books_group = $rootScope.array_divider(books_all, 4, false);
    $scope.books_group = books_group.slice(0, book_cont);
    //console.log(books_group);

    $scope.more_books = function () {
        book_cont++;
        if (book_cont = books_group.length) {
            //console.log('No more books');
            document.querySelector('#btn_more_books').remove();
        }//end if
        $scope.books_group = books_group.slice(0, book_cont);
    }//end more books

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

        localStorage.setItem('filters', JSON.stringify(data_fileters));
        $window.location.href = '#/shop';
    }//end callback_shop

    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $rootScope.loadOut();
});//end controller