app.factory('services_localstorage', function () {
    var services_localstorage = { new_sesion: new_sesion, delete_sesion: delete_sesion };
    return services_localstorage;

    function new_sesion(jwt) {
        jwt = jwt.substring(1, jwt.length - 1);
        localStorage.setItem('token', jwt);
    }//end new_sesion

    function delete_sesion() {
        localStorage.removeItem('token');
    }//end delete_sesion

});//end services_localstorage