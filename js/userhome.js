// <hr>
// 					    	<label for="exampleInputEmail1"> My Checking Account</label>
// 					    	<ul>
// 						    	<li> <a href="#"> Personal 0123-4567-8901 </a>
// 									<span style="margin-left:100px;"> </span>
// 						    	    <input class="idName" type="hidden" size="20" value="checki1"/>
// 						    		<input class="viewBalance" type="text" id="checking1" size="12" value="$ 3333.33" readonly="readonly" style="text-align:right; margin-right:30px">
// 						    	</li>

// 						    	<small id="emailHelp" id="checking2" class="form-text text-muted">
// 						    	Our acount is designed for your best convenience</small> <br>
// 						    	<small id="emailHelp" id="checking2" class="form-text text-muted">
// 						    	Want to open another acount? $100 bonus will be awarded</small>
// 					    	</ul>
// 							<hr>
// 							<label for="exampleInputEmail1"> My Saving Account</label>
// 							<ul>
// 						    	<li> <a href="#"> Personal 5123-4567-3686 </a>
// 									<span style="margin-left:100px;"> </span>
// 						    		<input class="idName" type="hidden" size="20" value="saving1"/>
// 						    		<input class="viewBalance" type="text" id="saving1" size="12" value="$ 5555.55" readonly="readonly" style="text-align:right; margin-right:30px">
// 						    	</li>
// <!-- 								<li> <a href="#"> Personal 8666-6666-3333 </a>
// 									<span style="margin-left:100px; "> </span>
// 									<input class="idName" type="hidden" size="20" value="saving2"/>
// 									<input class="viewBalance" type="text" id="saving2" size="12" value="$ 6666.66" readonly="readonly" style="text-align:right; margin-right:30px">
// 								</li> -->
// 							    <small id="emailHelp" class="form-text text-muted">
// 							    We will perform monthly transfer-in for your saving account</small>
// 							</ul>
// 							<hr>

const URL = "http://localhost:1337";
const TECH_ERROR_MESSAGE = "Some technical problem occured";

$(document).ready(function() {
    showAccounts();
});

function showAccounts() {
    $.ajax({
        url: URL + "/api/getFromAccounts",
        method: "GET",
        
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
            $("#user-home-error").empty();

            //Show next window
            $("#user-account").empty();

            response.message.forEach(function(acc) {
                $("#user-account").append('<hr>' +
                    '<label for="exampleInputEmail1"> My ' + acc.type + ' Account</label>' +
                    '<ul>' +
                    '<li> <a href="#"> ' + acc.type + ' - ' + acc.accountid + '</a>' +
                    '<span style="margin-left:100px;"> </span>' +
                    '<input class="idName" type="hidden" size="20" value="checki1"/>' +
                    '<input class="viewBalance" type="text" id="checking1" size="12" value="$ ' + acc.balance + '" readonly="readonly" style="text-align:right; margin-right:30px">' +
                    '</li>' +

                    '<small id="emailHelp" id="checking2" class="form-text text-muted">' +
                    'Our acount is designed for your best convenience</small> <br>' +
                    '<small id="emailHelp" id="checking2" class="form-text text-muted">' +
                    'Want to open another acount? $100 bonus will be awarded</small>' +
                    '</ul>');
            });

            console.log("Accounts fetched");
        }
    }).fail(function(response, statusText, xhr) {
        $("#user-home-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#user-home-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            console.log(e);
            $('#user-home-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}