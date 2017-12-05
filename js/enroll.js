const URL = "http://localhost:1337";
const TECH_ERROR_MESSAGE = "Some technical problem. Contact customer service.";
const ENROLL_SUCCESS = "You are enrolled successfully. Please login now to user Devonshire online services";

$(document).ready(function() {
    //
    $("#nextbutton1").click(function() {
        var accountid = $("#enroll-account").val();
        var pin = $("#pin").val();
        var dob = $("#dob").val();

        var params = {
            accountid: accountid,
            pin: pin,
            dob: dob
        };
        verifyAccount(params);
    });

    //Confirm and enroll
    $("#enroll").click(function() {
        var params = {
            username: $("#username").val(),
            password: $("#password").val(),
            confirmPassword: $("#confirm-password").val(),
            userid: $("#userid").val(),

            q1: $("#q1").val(),
            q2: $("#q2").val(),
            q3: $("#q3").val(),

            a1: $("#a1").val(),
            a2: $("#a2").val(),
            a3: $("#a3").val()
        };

        enrollUser(params);
    });

});


//Enroll
function enrollUser(params) {
    $.ajax({
        url: URL + "/api/enrollUser",
        method: "POST",
        data: params,
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
            $("#enroll-error").empty();
            //Show next window
            window.location.href = "index.html";
            alert(ENROLL_SUCCESS);
        }
    }).fail(function(response, statusText, xhr) {
        $("#enroll-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#enroll-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            console.log(e);
            $('#enroll-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}

//Verify Account
function verifyAccount(params) {
    $.ajax({
        url: URL + "/api/verifyAccount",
        method: "POST",
        data: params,
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
            $("#account-verify-error").empty();
            //Show next window
            $("#userid").val(response.message[0]);
            $('#customized').tab('show');
        }
    }).fail(function(response, statusText, xhr) {
        $("#account-verify-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#account-verify-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            $('#account-verify-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}