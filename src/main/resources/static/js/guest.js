var guestDataTable;

function getGuests() {
    $("#tableShowGuest").dataTable().fnDestroy();
    $('#tableInputGuest').hide();

    $("#idInput").hide();
    $("#deleteInputTitle").hide();
    $("#deleteBtn").hide();
    $("#editBtn").hide();
    $('#tableShowGuest').show();
    guestDataTable = $('#tableShowGuest').DataTable({
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
           guestDataTable.ajax.reload();
       },
       error: function() {
        alert('something went wrong!');
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
          guestDataTable.ajax.reload();
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

