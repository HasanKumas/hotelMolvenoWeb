
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
            '<td>' + payment.cardExpiryDate +'</td></tr>'
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
        cardExpiryDate:$("#expiryInput").val(),
       // pay_Type:$("#typeInput")

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
               // $("typeInput").val('');
                getPayment();

            },
            error: function () {
                alert('Error:Try Again');
            }
        });

    }



//var paymentDataTable;
//
//function getPayment() {
//    $("#tableShowPayment").dataTable().fnDestroy();
////   $("#editInputButton").show();
////    $("#postInputButton").show();
////
//
//  $("#tableShowPayment").show();
//  $("#tableInputPayment").hide();
//  $("#saveButton").hide();
//
//   paymentDataTable = $('#tableShowPayment').DataTable({
//        ajax: {
//            url: "api/payment",
//            dataSrc: ''
//        },
//        "columns": [
//            { "data": "id" },
//            { "data": "cardName" },
//            { "data": "cardNumber" },
//            { "data": "billAddress" },
//            { "data": "cardExpiry" }
//
//        ]
//    });
//}
//function changePaymentInput() {
//        $('#tableInputPayment').show();
//        $("#editButton").show();
//        $("#deleteInputTitle").show();
////        $("#idInput").show();
//
//          $('#postInputButton').hide();
//
//}
//function changePayment() {
//   var id = $("#idInput").val();
//   var payment = {
//                 name:$("#cardName").val(),
//                 cardNumber:$("#cardNumber").val(),
//                 billAddress:$("#billAddress").val(),
//                 cardExpiryDate:$("#cardExpiry").val()
//
//   };
//   var jsonObject = JSON.stringify(payment);
//
//   $.ajax({
//      url: "api/payment/"+id,
//      type: "PUT",
//      contentType: "application/json",
//      data: jsonObject,
//      success: function () {
//         alert('We succeeded!');
//         $("#cardname").val('');
//         $("#cardNumber").val('');
//         $("#billAddress").val('');
//         $("#cardExpiry").val('');
//
//          paymentDataTable.ajax.reload();
//      },
//      error: function () {
//          alert('try again');
//      }
//   });
//}
//$(document).ready(function () {
//        getPayment();
////
//
//
////       $("#editInputButton").click(changePaymentInput);
////       $("#postInputButton").click(changePayment);
////        $("#saveButton").click(changePayment);
//
//});






