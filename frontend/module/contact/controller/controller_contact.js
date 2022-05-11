app.controller('controller_contact', function ($scope, services, toastr) {
    $scope.rex_asunto = /^[A-Za-z-\s]{6,60}$/;
    $scope.rex_name = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
    $scope.rex_msg = /^[A-Za-z0-9-\s.]{15,200}$/;
    $scope.rex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //El regex de el asunto y el del msg no funcionan correctamente, si esta en vlanco los considera validos.
    $scope.send_email = function () {
        var form_data = { name: $scope.name, email: $scope.email, asunto: $scope.asunto, msg: $scope.msg };
        services.post('contact', 'send_email_contact', form_data)
            .then(function (response) {
                if (response == '"ok"') {
                    $scope.name = null;
                    $scope.email = null;
                    $scope.asunto = null;
                    $scope.msg = null;
                    toastr.success('Email sendes successfuly');
                } else {
                    toastr.error('The email could not be sended');
                }//end else if
            },
                function (error) {
                    var callback = "#/error/503/post_contact_sendemail_error";
                    window.location.href = callback;
                })//end post
    }//end send email
});//end controller