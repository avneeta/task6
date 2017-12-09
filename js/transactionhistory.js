const URL = "http://localhost:1337";
const TECH_ERROR_MESSAGE = "Some technical problem occured";

$(document).ready(function() {
	setupDataTable();
    getFromAccounts();

    $("#search-history").click(function() {
        var fromDate = $("#from-date").val();
        var toDate = $("#to-date").val();
        var accountid = $("#pay-from-account").val();
        var params = {
            'fromDate': fromDate,
            'toDate': toDate,
            'accountid': accountid.split("-")[1].trim()
        };

        getTransactionHistory(params);
    });

});

function getTransactionHistory(params) {
    $.ajax({
        url: URL + "/api/getTransactionHistory",
        method: "GET",
        data: params,
        xhrFields: {
            withCredentials: true
        }
    }).done(function(response, statusText, xhr) {
        if (xhr.status == 200) {
            $("#transaction-history-error").empty();

            var dataset = [];
            response.message.forEach(function(transaction) {
                var data = [];
                data.push(transaction.date);
                data.push(transaction.desc);
                if (transaction.debit) {
                    data.push(transaction.amount);
                    data.push("");
                } else {
                    data.push("");
                    data.push(transaction.amount);
                }
                data.push(transaction.category);
                data.push(transaction.balance);
                dataset.push(data);
            });


			//var datatable = $("#transaction-history-table").DataTable();
			$('#transaction-history-table').dataTable().fnClearTable();
            if(dataset.length>0)
			 $('#transaction-history-table').dataTable().fnAddData(dataset);
            console.log("History fetched");
        }
    }).fail(function(response, statusText, xhr) {
        $("#transaction-history-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#transaction-history-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            console.log(e);
            $('#transaction-history-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}

function setupDataTable() {
    $('#transaction-history-table').DataTable({
        data: [],
        columns: [
            { title: "Date" },
            { title: "Description" },
            { title: "Withdraw" },
            { title: "Deposit" },
            { title: "Category" },
            { title: "Balance" }
        ]
    });
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
            $("#transaction-history-error").empty();
            //Show next window
            $("#pay-from-account").empty();

            response.message.forEach(function(acc) {
                $("#pay-from-account").append("<option>" + acc.type + " - " + acc.accountid + "</option>");
            });

            console.log("Accounts fetched");
        }
    }).fail(function(response, statusText, xhr) {
        $("#transaction-history-error").empty();
        try {
            response.responseJSON.message.forEach(function(msg) {
                $('#transaction-history-error').append("<span style='padding-left:1px;color:red;'>" + msg + "</spn><br/>");
            });
        } catch (e) {
            console.log(e);
            $('#transaction-history-error').append("<span style='padding-left:1px;color:red;'>" + TECH_ERROR_MESSAGE + "</spn><br/>");
        }

    });
}