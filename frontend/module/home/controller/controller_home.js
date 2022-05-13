app.controller('controller_home', function ($scope, $rootScope, $timeout, brands, categorys, fuels, books) {
    $rootScope.loadIn();
    $scope.brands = brands;
    $scope.categorys = categorys;
    $scope.fuels = fuels;

    var books_all = [];
    var books_group = [];
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

    const chunkSize = 4;
    for (let i = 0; i < books_all.length; i += chunkSize) {
        const chunk = books_all.slice(i, i + chunkSize);
        books_group.push(chunk);
    }//end for
    //https://stackoverflow.com/questions/8495687/split-array-into-chunks  Thanks Google

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

        console.log(data_fileters);
    }//end callback_shop

    $timeout(function () {
        $('#slider').owlCarousel({
            items: 3,
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800
        });//end owlCarousel
        $rootScope.loadOut();
    }, 0);//end timeout
    //Sin el timeout no carga el slider, pero con el timeaut aunque este a 0ms si que funciona.
});//end controller