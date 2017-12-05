const URL = "http://localhost:1337";
const TECH_ERROR_MESSAGE = "Some technical problem. Contact customer service."; 

$(document).ready(function() {
	getFromAccounts();
    //confirm-popup
    //popup-header
    //popup-header
    $("#make-payment-button1").click(function(){
        showConfirmPopup();
    });

    $("#make-payment").click(function(){
        makePayment();
    });

    $("#transfer-success-popup-btn").click(function() {
        hideTransferSuccessPopup();
    });
    
});

function hideTransferSuccessPopup() {
    $("#transfer-success-popup").modal("toggle");
    window.location.href = "transfer_func_head.html";
}

function showTransferSuccessPopup() {
    var popupBody = "Fund transferred successfully";
    $("#transfer-success-popup-body").empty();
    $("#transfer-success-popup-body").append("<p>"+popupBody+"<\p>");    
    $("#transfer-success-popup").modal();
}

function makePayment() {
    var fromAccount = $("#pay-from-account").val();
    var toAccount = $("#pay-to-account").val();
    var amount = $("#auto-amount").val();
    fromAccount = fromAccount.split("-")[1].trim();
    toAccount = toAccount.split("-")[1].trim();

    var params = {
        'from' : fromAccount,
        'to' : toAccount,
        'amount' : amount,
        'type' : 'Transfer to self'
    };

    $.ajax({
        url: URL + "/api/transferToAccount",
        method: "POST",
        data: params,
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        $("#confirm-popup").modal('toggle');
        showTransferSuccessPopup();
    }).fail(function(response, statusText, xhr) {
        $("#confirm-popup").modal('toggle');
        alert("Error");
    });    
}

function showConfirmPopup() {
    var popupHeader = "Confirm (Transfer to self)";
    
    var fromAccount = $("#pay-from-account").val();
    var toAccount = $("#pay-to-account").val();
    var amount = $("#auto-amount").val();
    
    var popupBody = "Please confirm below details:</br>";
    popupBody = popupBody + "</br>" + "From Account: "+fromAccount;
    popupBody = popupBody + "</br>" + "To Account: " +toAccount;
    popupBody = popupBody + "</br>" + "Amount: "+amount;

    $("#popup-header").text("");
    $("#popup-header").text(popupHeader);
    
    $("#popup-body").empty();
    $("#popup-body").append("<p>"+popupBody+"<\p>");

    $("#confirm-popup").modal();
}

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
            $("#pay-from-account").empty();
            $("#account-to-pay").empty();
            
            response.message.forEach(function(acc) {
                $("#pay-from-account").append("<option>"+acc.type+" - "+acc.accountid+"</option>");
                $("#pay-to-account").append("<option>"+acc.type+" - "+acc.accountid+"</option>");
            });
            
            console.log("Accounts fetched");
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