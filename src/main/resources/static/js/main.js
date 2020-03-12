$(document).ready(function() {
  $("#getPaymentsButton").click(getPayment);
  $("#postButton").click(postPayment);
  getPayment();
});

function getPayment() {
  $.get("api/payment", function(payments) {
    $("#paymentes-list").empty();
    for (var i = 0; i < payments.length; i++) {
      const payment = payments[i];
      $("#paymentes-list").append(
        "<tr><td>" +
          payment.name +
          "</td>" +
          "<td>" +
          payment.cardNumber +
          "</td>" +
          "<td>" +
          payment.billAddress +
          "</td>" +
          "<td>" +
          payment.cardExpiryDate +
        "</td>" +
        "<td>"+
          payment.reservation.totalPrice +
        "</td>" +
          "<td> <button class='remove-button' paymentId='" +
          payment.id +
        "'>Delete</button></td><tr>" 
        
      );
    }

    $("#paymentes-list .remove-button").click(deletePayment);
  });
}

function postPayment() {
  var payment = {
    name: $("#nameInput").val(),
    cardNumber: $("#NOInput").val(),
    billAddress: $("#BillInput").val(),
    cardExpiryDate: $("#expiryInput").val(),
    reservation: { id: Number($("#reserInput").val()) }
    // pay_Type:$("#typeInput")
  };

  var jsonObject = JSON.stringify(payment);

  $.ajax({
    url: "api/payment",
    type: "POST",
    contentType: "application/json",
    data: jsonObject,
    success: function() {
      alert("We succeeded!");
      $("#nameInput").val("");
      $("#NOInput").val("");
      $("#BillInput").val("");
      $("#expiryInput").val("");
      $("#reserInput").val("");
    
      // $("typeInput").val('');
      getPayment();
    },
    error: function() {
      alert("Error:Try Again");
    }
  });
}

function deletePayment() {
  var paymentId = $(this).attr("paymentId");
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      $.ajax({
        url: "api/payment/" + paymentId,
        type: "DELEtE",
        success: function(data) {
          swal({
            title: "Delete Done!",
            text: "You Clicked The Button!",
            icon: "Success",
            buttons: "Done"
          });
          getPayment();
        },
        error: function() {
          swal({
            title: "Delete Done!",
            text: "You Clicked The Button!",
            icon: "Success",
            buttons: "Done"
          });
        }
      });
    } else {
      swal("Your imaginary file is safe!");
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

// $.each(payments, function(index, payment) {
//   $("#paymentes-list").append(
//     " <tr><td> " +
//       payment.name +
//       "  </td><td> " +
//       payment.cardNumber +
//       "  </td><td> " +
//       payment.billAddress +
//       "  </td><td> " +
//       payment.cardExpiryDate +
//       "<td>" +
//       payment.reservation.totalPrice +
//       "</td>" +
//       '<td><button class="remove-button" paymentId="' +
//       payment.id +
//       '">delete ' +
//       payment.id +
//       "</button></td></tr>"
//   );
// });
