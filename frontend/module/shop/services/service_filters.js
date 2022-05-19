app.factory('services_filters', ['services', '$rootScope', function (services, $rootScope) {
    let services_filters = { reset_filters: reset_filters, get_filters: get_filters, set_filters: set_filters };
    return services_filters;

    function reset_filters() {
        const filters = [['c.price', 'null'], ['b.brand_name', 'null'], ['cat.category_name', 'null'], ['f.fuel_type_name', 'null'], ['c.city', 'null'], ['c.view_count', 'null']];
        localStorage.setItem('filters', JSON.stringify(filters));
    }//end reset filters

    function get_filters() {
        if (!localStorage.getItem('filters')) {
            reset_filters();
        }//end if

        var filters_tmp = JSON.parse(localStorage.getItem('filters'));
        var f_price = "null";
        var f_brand = "null";
        var f_category = "null";
        var f_fuel = "null";
        var f_city = "null";
        var f_view_count = "null";

        filters_tmp.forEach(filter => {
            switch (filter[0]) {
                case 'c.price':
                    f_price = filter[1];
                    break;
                case 'b.brand_name':
                    f_brand = filter[1];
                    break;
                case 'cat.category_name':
                    f_category = filter[1];
                    break;
                case 'f.fuel_type_name':
                    f_fuel = filter[1];
                    break;
                case 'c.city':
                    f_city = filter[1];
                    break;
                case 'c.view_count':
                    f_view_count = filter[1];
                    break;

            }//end swich
        });//end foreach

        const filters = { price: f_price, brand: f_brand, category: f_category, fuel: f_fuel, city: f_city, view_count: f_view_count };
        //console.log(filters);
        $rootScope.filters = filters;
    }//end get filters

    function set_filters(form_data) {
        const filters = [['c.price', form_data.price], ['b.brand_name', form_data.brands], ['cat.category_name', form_data.category], ['f.fuel_type_name', form_data.fuel], ['c.city', form_data.city], ['c.view_count', form_data.view_count]];
        localStorage.setItem('filters', JSON.stringify(filters));
    }//end set_filters

}]);//end services_filters