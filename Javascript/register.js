$(document).ready(function() {

});

// function render () {
//     var reload = '';

//     $.ajax({
//         type: "POST",
//         dataType: "JSON",
//         url: "../API/signup.php",
//         data: {},
//         success: function(response) {
//             console.log("Good", response);
//             data = response.result;
//         }, error: function(err) {
//             console.log("Bad", err);
//         }
//     })
// }

function showPass() {
    var pass = document.getElementById('password');
        if (pass.type == 'password') {
            pass.type = 'text';
            console.log("show password");
        }else if(pass.type == 'text'){
            pass.type = 'password'
        }
}

function validate_signup () {
    var alertStatus = true;
    
    var username = $('#username');
    if(username.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill username'
        })
        username.css("border", "1px solid red");
        alertStatus = false;
    } else {
        username.css("border", "unset");
        alertStatus = true;
    }

    var agentName = $("#agent_name");
    if(agentName.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill agent name'
        })
        agentName.css("border", "1px solid red");
        alertStatus = false;
    } else {
        agentName.css("border", "unset");
        alertStatus = true;
    }

    var password = $("#password");
    if(password.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill password'
        })
        password.css("border", "1px solid red");
        alertStatus = false;
    } else {
        password.css("border", "unset");
        alertStatus = true;
    }

    var confirmPassword = $("#ConfirmPassword");
    if(confirmPassword.val() !== password.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Password not match'
        })
        confirmPassword.css("border", "1px solid red");
        alertStatus = false;
    } else {
        confirmPassword.css("border", "unset");
        alertStatus = true;
    }

    var gender = $("#agent_gender");
    if(gender.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill gender'
        })
        gender.css("border", "1px solid red");
        alertStatus = false;
    } else {
        gender.css("border", "unset");
        alertStatus = true;
    }

    var status = $("#status");
    if(status.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill status'
        })
        status.css("border", "1px solid red");
        alertStatus = false;
    } else {
        status.css("border", "unset");
        alertStatus = true;
    }

    var address = $("#agent_address");
    if(address.val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill address'
        })
        address.css("border", "1px solid red");
        alertStatus = false;
    } else {
        address.css("border", "unset");
        alertStatus = true;
    }

    return alertStatus;
}

function save_signup() {
    if(validate_signup()) {
        console.log("successfully yet");

    //     $.ajax({
    //         type: "POST",
    //         dataType: "JSON",
    //         async: false,
    //         url: "http://127.0.0.1/jareanrubber-project/API/signup.php",
    //         data: {
    //             username: $("#username").val(),
    //             agentName: $("#agent_name").val(),
    //             password: $("#password").val(),
    //             confirmPassword: $("#ConfirmPassword").val(),
    //             gender: $("#agent_gender").val(),
    //             status: $("#status").val(),
    //             address: $("#agent_address").val()
    //         }, success: function(response) {
    //             console.log("Good", response);
    //             if(response.result[0].code == 200) {
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Create success',
    //                     text: 'Create successfully'
    //                 });
    //             }
    //         }, error: function(err) {
    //             console.log("Bad", err);
    //         }
    //     })
    }
    // console.log("successfully");
}

