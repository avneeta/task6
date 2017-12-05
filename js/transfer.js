const URL = "http://localhost:1337";
const TECH_ERROR_MESSAGE = "Some technical problem. Contact customer service.";

$(document).ready(function() {
	getFromAccounts();
});

function getFromAccounts() {
	$.ajax({
        url: URL + "/api/getFromAccounts",
        method: "GET",        
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
            $("#transfer-error").empty();
            //Show next window
            //window.location.href = "index.html";
            alert("Accounts fetched");
        }
    }).fail(function(response, statusText, xhr) {
        $("#transfer-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#transfer-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            console.log(e);
            $('#transfer-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}