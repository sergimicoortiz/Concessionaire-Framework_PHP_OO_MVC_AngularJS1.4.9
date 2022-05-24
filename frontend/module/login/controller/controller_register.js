app.controller('controller_register', function ($scope, $rootScope) {

    $scope.email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.user_regex = /^[a-zA-Z0-9]*$/;

    $scope.btn_register = function () {
        console.log('btn_register');
    }//end btn_register
});//end controller