function getRooms() {
    $("#tableShowRoom").dataTable().fnDestroy();
    $('#tableInputRoom').hide();
    $("#saveButton").hide();
    $("#idInput").hide();
    $("#deleteInputTitle").hide();
    $("#deleteBtn").hide();
    $("#editButton").hide();
    $('#tableShowRoom').show();
    $('#tableShowRoom').DataTable({
        ajax: {
            url: "api/rooms",
            dataSrc: ''
        },
        "columns": [
            { "data": "id" },
            { "data": "roomNumber" },
            { "data": "maxBeds" },
            { "data": "isAvailable" },
            { "data": "roomPrice" },
            { "data": "roomSizeType" },
            { "data": "roomBudgetType" },
            { "data": "roomSceneType" }
        ]
    });
}
function postRoomInput() {
    $('#tableInputRoom').show();
    $("#saveButton").show();
    $("#deleteInputTitle").hide();
    $("#deleteBtn").hide();
    $("#editButton").hide();
//    $('#tableShowRoom').hide();
    $("#idInput").hide();
}
function postRoom() {
   var room = {
       roomNumber:Number($("#roomNumber").val()),
       maxBeds:Number($("#maxBeds").val()),
       isAvailable:Boolean($("#roomAvailability").val()),
       roomPrice:Number($("#roomPrice").val()),
       roomSizeType:$("#roomSize").val(),
       roomBudgetType:$("#roomBudget").val(),
       roomSceneType:$("#roomScene").val()
   };

   var jsonObject = JSON.stringify(room);

   $.ajax({
       url: "api/rooms",
       type: "POST",
       contentType: "application/json",
       data: jsonObject,
       success: function () {
           alert('The room has created!');
           $("#roomNumber").val('');
           $("#maxBeds").val('');
           $("#roomAvailability").val('');
           $("#roomPrice").val('');
           $("#roomSize").val('');
           $("#roomBudget").val('');
           $("#roomScene").val('');
           getRooms();
       },
       error: function () {
           alert('try again');
       }
   });
}
function deleteRooms() {
   $('#tableInputRoom').hide();
   $("#saveButton").hide();
   $("#editButton").hide();
   $("#idInput").show();
   $("#deleteBtn").show();
   $("#deleteInputTitle").show();
}
function deleteRoom() {
   var id = $("#idInput").val();
//TODO how to delete a room without deleting the reservation/currently throwing constraint violation
   $.ajax({
       url: "api/rooms/"+id,
       type: "DELETE",
       success: function() {
           alert('The room has deleted!');
           $("#idInput").val('');
           getRooms();
       }
   });
}
function changeRoomInput() {
        $('#tableInputRoom').show();
        $("#editButton").show();
        $("#deleteInputTitle").show();
        $("#idInput").show();
        $("#deleteBtn").hide();
        $("#saveButton").hide();
//        $('#tableShowRoom').hide();

}
function changeRoom() {
   var id = $("#idInput").val();
   var room = {
                 roomNumber:Number($("#roomNumber").val()),
                 maxBeds:Number($("#maxBeds").val()),
                 isAvailable:Boolean($("#roomAvailability").val()),
                 roomPrice:Number($("#roomPrice").val()),
                 roomSizeType:$("#roomSize").val(),
                 roomBudgetType:$("#roomBudget").val(),
                 roomSceneType:$("#roomScene").val()
   };
   var jsonObject = JSON.stringify(room);

   $.ajax({
      url: "api/rooms/"+id,
      type: "PUT",
      contentType: "application/json",
      data: jsonObject,
      success: function () {
         alert('The room has modified!');
         $("#roomNumber").val('');
         $("#maxBeds").val('');
         $("#roomAvailability").val('');
         $("#roomPrice").val('');
         $("#roomSize").val('');
         $("#roomBudget").val('');
         $("#roomScene").val('');
         $("#idInput").val('');
         getRooms();
      },
      error: function () {
          alert('try again');
      }
   });
}
$(document).ready(function () {
        getRooms();
//       $("#getButton").click(getRooms);
       $("#saveButton").click(postRoom);
       $("#postInputButton").click(postRoomInput);
       $("#deleteButton").click(deleteRooms);
       $("#deleteBtn").click(deleteRoom);
       $("#editButton").click(changeRoom);
       $("#editInputButton").click(changeRoomInput);
});