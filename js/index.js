const URL = "http://localhost:1337";

jQuery(document).ready(function($) {
    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
    });
});


$(document).ready(function() {
    $("#user-login").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();

        login(username, password);
    });

    $().UItoTop({ easingType: 'easeOutQuart' });

});

//Login function
function login(username, password) {
    $.ajax({
        url: URL + "/api/login",
        method: "POST",
        data:{
	   		"username" : username,
	   		"password" : password
	   	},
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
        	$("#login-error").empty();
            //Open user home page
            window.location.href = "user_home.html";
        }
    }).fail(function(response, statusText, xhr) {
    	$("#login-error").empty();
    	response.responseJSON.message.forEach(function(msg) {
			$('#login-error').append("<span style='padding-left:1px;color:red;'>"+msg+"</spn><br/>");	
		});
        
    });
}