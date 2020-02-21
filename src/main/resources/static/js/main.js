     function getRooms() {
        $("#tableShowRoom").dataTable().fnDestroy();
        $('#tableRoom').hide();
        $('#createRoom').hide();
        $("#saveButton").hide();
        $("#deleteByIdInput").hide();
        $("#deleteInputTitle").hide();
        $("#deleteBtn").hide();
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
                { "data": "available" },
                { "data": "roomPrice" },
                { "data": "roomSizeType" },
                { "data": "roomBudgetType" },
                { "data": "roomSceneType" },
                { "data": "checkInDate" },
                { "data": "checkOutDate" }
            ]
        });
   }

   function postRoom() {
       var room = {
           roomNumber:Number($("#roomNumber").val()),
           maxBeds:Number($("#maxBeds").val()),
           available:Boolean($("#roomAvailability").val()),
           roomPrice:Number($("#roomPrice").val()),
           roomSizeType:$("#roomSize").val(),
           roomBudgetType:$("#roomBudget").val(),
           roomSceneType:$("#roomScene").val(),
           checkInDate:$("#checkInDate").val(),
           checkOutDate:$("#checkOutDate").val()
       };


       var jsonObject = JSON.stringify(room);

       $.ajax({
           url: "api/rooms",
           type: "POST",
           contentType: "application/json",
           data: jsonObject,
           success: function () {
               alert('We succeeded!');
               $("#roomNumber").val('');
               $("#maxBeds").val('');
               $("#roomAvailability").val('');
               $("#roomPrice").val('');
               $("#roomSize").val('');
               $("#roomBudget").val('');
               $("#roomScene").val('');
               $("#checkInDate").val('');
               $("#checkOutDate").val('');
           },
           error: function () {
               alert('try again');
           }
       });
   }
   function deleteRooms() {
               $('#tableRoom').hide();
               $('#createRoom').hide();
               $("#saveButton").hide();
               $("#deleteByIdInput").show();
               $("#deleteBtn").show();
               $("#deleteInputTitle").show();
   }
   function deleteRoom() {
            var id = $("#deleteByIdInput").val();

           $.ajax({
               url: "api/rooms/" + id,
               type: "DELETE",
               success: function() {
                   alert('We succeeded!');
                   $("#deleteByIdInput").val('');
               }
           });
   }
   function changeRoom() {
          var id = $("#idRoom").val();
          var room = {
                     roomNumber:Number($("#roomNumber").val()),
                     maxBeds:Number($("#maxBeds").val()),
                     availability:Boolean($("#roomAvailability").val()),
                     roomPrice:Number($("#roomPrice").val()),
                     roomSizeType:$("#roomSize").val(),
                     roomBudgetType:$("#roomBudget").val(),
                     roomSceneType:$("#roomScene").val(),
                     checkInDate:Date($("#checkInDate").val()),
                     checkOutDate:Date($("#checkOutDate").val())
                };
          var jsonObject = JSON.stringify(room);

          $.ajax({
              url: "api/rooms/"+id,
              type: "PUT",
              contentType: "application/json",
              data: jsonObject,
              success: function () {
                 alert('We succeeded!');
                 $("#roomNumber").val('');
                 $("#maxBeds").val('');
                 $("#roomAvailability").val('');
                 $("#roomPrice").val('');
                 $("#roomSize").val('');
                 $("#roomBudget").val('');
                 $("#roomScene").val('');
                 $("#checkInDate").val('');
                 $("#checkOutDate").val('');
              },
              error: function () {
                  alert('try again');
              }
          });
      }

//function getRoomInput() {
//        $('#tableRoom').show();
//
//        $("#getButton").show();
//}
function postRoomInput() {

        $("#deleteByIdInput").hide();
        $('#tableRoom').show();
        $('#createRoom').show();
        $("#saveButton").show();
        $("#deleteInputTitle").hide();
        $("#deleteBtn").hide();
        $('#tableShowRoom').hide();
 }

$(document).ready(function () {
       $("#getButton").click(getRooms);
       $("#saveButton").click(postRoom);
       $("#postInputButton").click(postRoomInput);
       $("#deleteButton").click(deleteRooms);
       $("#deleteBtn").click(deleteRoom);
       $("#changeButton").click(changeRoom);
});

