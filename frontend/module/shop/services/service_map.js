app.factory('services_map', ['services', '$rootScope', function (services, $rootScope) {
    const services_map = { add_map: add_map, add_pointer: add_pointer };
    return services_map;

    function add_map(center_def = [-4.057513058981608, 40.22894318274323], zoom_def = 5.4) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2ltaWNvb3J0aXoiLCJhIjoiY2t6eWcwbXBhMDAwYTNpcGdkMzd1d2JxNSJ9.sbrTcTaGTtPwyLzqrLUBHw';
        $rootScope.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center_def, //[lng, lat]
            zoom: zoom_def
        });
        $rootScope.map.scrollZoom.disable();
    }//end add_map

    function add_pointer(car, car_img, details = true) {
        var lang_formater = "";
        if (localStorage.getItem('app-lang') == 'es') {
            lang_formater = 'es-ES';
        } else {
            lang_formater = 'en-US';
        }//end else 
        var formatter_extres = new Intl.ListFormat(lang_formater, { style: 'long', type: 'conjunction' });
        var title = car['brand_name'] + ': ' + car['model_name'];
        title = title.toUpperCase();
        var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));

        if (details) {
            const marker = new mapboxgl.Marker()
                .setLngLat([car['lon'], car['lat']])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                    '<div><img src="' + car_img + '"class="img_map" ><p class="text-1">' + title + '<strong>' + car['price'] + '€</strong></p><p class="upper"><b data-tr="category_name">category</b>: <span data-tr="' + car['category_name'] + '">' + car['category_name'] + '</span></p><p class="upper"><b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car['fuel_type_name'] + '">' + car['fuel_type_name'] + '</span></p><p class="upper"><b data-tr="km">km</b>: ' + car['km'] + '</p><p class="upper"><b data-tr="city">City</b>: <span>' + car['city'] + '</span></p><p class="upper"><b data-tr="extres">extres</b>: ' + extres + '</p><span  id="google_map" data-lon="' + car['lon'] + '" data-lat="' + car['lat'] + '">Google Maps</span></div>'
                ))
                .addTo($rootScope.map);
        } else {
            const marker = new mapboxgl.Marker()
                .setLngLat([car['lon'], car['lat']])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                    '<div><img src="' + car_img + '"class="img_map" ><p class="text-1">' + title + '<strong>' + car['price'] + '€</strong></p><p class="upper"><b data-tr="category_name">category</b>: <span data-tr="' + car['category_name'] + '">' + car['category_name'] + '</span></p><p class="upper"><b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car['fuel_type_name'] + '">' + car['fuel_type_name'] + '</span></p><p class="upper"><b data-tr="km">km</b>: ' + car['km'] + '</p><p class="upper"><b data-tr="city">City</b>: <span>' + car['city'] + '</span></p><p class="upper"><b data-tr="extres">extres</b>: ' + extres + '</p><a href="#/shop/details/' + car['car_id'] + '" class="button" data-tr="See More">See More</a></div>'
                ))
                .addTo($rootScope.map);
        }//end else if
    }//add_pointer

}]);//end services_map