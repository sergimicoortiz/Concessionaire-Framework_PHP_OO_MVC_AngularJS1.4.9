app.factory('services_search', ['services', '$rootScope', function (services, $rootScope) {
    let services_search = { get_category: get_category, get_brands: get_brands, get_citys: get_citys, filters_search: filters_search };
    return services_search;

    function get_category() {
        services.post('search', 'get_categories')
            .then(function (response) {
                $rootScope.categorys_search = response;
            },
                function (error) {
                    $rootScope.error_callback("post_search_category_error");
                })//end post
    }//end get_category

    function get_brands() {
        services.post('search', 'get_brands', { 'category': $rootScope.category_search })
            .then(function (response) {
                $rootScope.brands_search = response;
            },
                function (error) {
                    $rootScope.error_callback("post_search_brand_error");
                })//end post
    }//end get_brands

    function get_citys() {
        const search_data = { 'category': $rootScope.category_search || null, 'brand': $rootScope.brand_search || null, 'city': $rootScope.city_search || null };
        services.post('search', 'get_city', search_data)
            .then(function (response) {
                $rootScope.citys_search = response;
                if (response.length == 0 || search_data.city == null) {
                    $rootScope.citys_search = null;
                }//end if
            },
                function (error) {
                    $rootScope.error_callback("post_search_city_error");
                })//end post
    }//end get_citys

    function filters_search() {
        const search_data = { 'category': $rootScope.category_search || null, 'brand': $rootScope.brand_search || null, 'city': $rootScope.city_search || null };
        if (search_data.brand == null) {
            search_data.brand = 'null';
        }//end if

        if (search_data.category == null) {
            search_data.category = 'null';
        }//end if

        if (search_data.city == null) {
            search_data.city = 'null';
        }//end if
        const filters = [['b.brand_name', search_data.brand], ['cat.category_name', search_data.category], ['c.city', search_data.city]];
        localStorage.setItem('filters', JSON.stringify(filters));
    }//end callback_shop

}]);//end services_search