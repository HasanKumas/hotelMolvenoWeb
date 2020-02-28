function getGuests() {
    $("#tableShowGuest").dataTable().fnDestroy();
    $('#tableInputGuest').hide();

    $("#idInput").hide();
    $("#deleteInputTitle").hide();
    $("#deleteBtn").hide();
    $("#editBtn").hide();
    $('#tableShowGuest').show();
    $('#tableShowGuest').DataTable({
        ajax: {
            url: "api/guests",
            dataSrc: ''
        },
        "columns": [
            { "data": "id" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "tel" },
            { "data": "email" },
            { "data": "address" },
            { "data": "idType" },
            { "data": "idValue" }
        ]
    });
}

function deleteGuests() {
   $('#tableInputGuest').hide();
   $("#saveButton").hide();
   $("#editBtn").hide();
   $("#idInput").show();
   $("#deleteBtn").show();
   $("#deleteInputTitle").show();
}
function deleteGuest() {
   var id = $("#idInput").val();

   $.ajax({
       url: "api/guests/" + id,
       type: "DELETE",
       success: function() {
           alert('We succeeded!');
           $("#idInput").val('');
       }
   });
}

function changeGuestInput() {
        $('#tableInputGuest').show();
        $("#editBtn").show();
        $("#deleteInputTitle").show();
        $("#idInput").show();
        $("#deleteBtn").hide();
        $("#saveButton").hide();
//        $('#tableShowRoom').hide();

}
function changeGuest() {
   var id = $("#idInput").val();
   var guest = {
                 firstName:$("#firstName").val(),
                 lastName:$("#lastName").val(),
                 tel:$("#tel").val(),
                 email:$("#email").val(),
                 address:$("#address").val(),
                 idType:$("#idType").val(),
                 idValue:$("#idValue").val()
   };
   var jsonObject = JSON.stringify(guest);

   $.ajax({
      url: "api/guests/"+id,
      type: "PUT",
      contentType: "application/json",
      data: jsonObject,
      success: function () {
         alert('We succeeded!');
         $("#firstName").val('');
         $("#lastName").val('');
         $("#tel").val('');
         $("#email").val('');
         $("#address").val('');
         $("#idType").val('');
         $("#idValue").val('');
      },
      error: function () {
          alert('try again');
      }
   });
}

$(document).ready(function () {
        getGuests();
//
       $("#deleteButton").click(deleteGuests);
       $("#deleteBtn").click(deleteGuest);
       $("#editInputButton").click(changeGuestInput);
       $("#editBtn").click(changeGuest);
});



//function getGuest() {
//     $.get("api/guests", function (guest) {
//         console.log(guest);
//         $("#guest-list").empty();
//         for (var i = 0; i < guest.length; i++) {
//             // Do something
//             const list = document.getElementById('guest-list');
//                                const row = document.createElement('tr');
//                                row.innerHTML = `
//                                    <td>${guest[i].id}</td>
//                                    <td>${guest[i].firstName}</td>
//                                    <td>${guest[i].lastName}</td>
//                                    <td>${guest[i].tel}</td>
//                                    <td>${guest[i].email}</td>
//                                    <td>${guest[i].address}</td>
//                                    <td>${guest[i].idType}</td>
//                                    <td>${guest[i].idValue}</td>`;
//                                list.appendChild(row);
//         }
//     });
// }
//
//function postGuest() {
//    var guest = {
//        firstName: $("#First_Name").val(),
//        lastName: $("#Last_Name").val(),
//        tel: $("#Phone").val(),
//        email:$("#Email").val(),
//        address: $("#Address").val(),
//        idType: $("#Id_Type").val(),
//        idValue:$("#Id_Value").val()
//
//
//    };
//    console.log(guest);
//
//    var jsonObject = JSON.stringify(guest);
//
//    $.ajax({
//        url: "/api/guests",
//        type: "POST",
//        contentType: "application/json",
//        data: jsonObject,
//        success: function () {
//            getGuest();
//            alert('We succeeded!');
//            $("#First_Name").val('');
//            $("#Last_Name").val('');
//            $("#Phone").val('');
//            $("#Email").val('');
//            $("#Address").val('');
//            $("#Id_Type").val('');
//            $("#Id_Value").val('');
//
//        },
//        error: function () {
//            alert('NOOOOOOOOOOOOOOOOOOOOOOOOO');
//        }
//
//    });
//}
//
//
//$(document).ready(function () {
//
//    $("#create").click(postGuest);
//
//});