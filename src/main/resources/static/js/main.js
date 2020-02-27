$(document).ready(function(){
    $("#getPaymentsButton").click(getPayment);
    $("#postButton").click(postPayment);
});


function getPayment() {
    $.get("api/payment", function (payments) {
        console.log(payments);
        $("#paymentes-list").empty();
        for (var i = 0; i < payments.length; i++) {
            const payment = payments[i];
            $("#paymentes-list").append(
            '<tr><td>' + payment.name + '</td>'+
            '<td>'+ payment.cardNumber + '</td>'+
            '<td>' + payment.billAddress + '</td>'+
            '<td>' + payment.cardExpiryDate + '</td></tr>'
            );

//            const list = document.getElementById('paymentes-list');
//                                                const row = document.createElement('tr');
//                                                row.innerHTML = `
//                                                    <td>${payment[i].id}</td>
//                                                    <td>${payment[i].CardName}</td>
//                                                    <td>${payment[i].CardNo}</td>
//                                                    <td>${payment[i].BillAdrdres}</td>
//                                                    <td>${payment[i].CardExpiry}</td>
//
//                                                list.appendChild(row);



    }
});
}

function postPayment() {
    var payment = {
        name: $("#nameInput").val(),
        cardNumber:$("#NOInput").val(),
        billAddress:$("#BillInput").val(),
        cardExpiryDate:$("#expiryInput").val()

    };

    var jsonObject = JSON.stringify(payment);


    $.ajax({
            url: "api/payment",
            type: "POST",
            contentType: "application/json",
            data: jsonObject,
            success: function () {
                alert('We succeeded!');
                $("#nameInput").val('');
                $("#NOInput").val('');
                $("#BillInput").val('');
                $("#expiryInput").val('');
                getPayment();
            },
            error: function () {
                alert('Error:Try Again');
            }
        });
    }
