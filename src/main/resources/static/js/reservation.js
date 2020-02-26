function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var ddt = today.getDate()+1;
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }
  if(ddt<10) {
      ddt = '0'+dd
  }

  today = yyyy + '-' + mm + '-' + dd;
  var tomorrow = yyyy + '-' + mm + '-' + ddt;
  console.log(today);
  document.getElementById("checkInDate").value = today;
  document.getElementById("checkInDate").min = today;
  document.getElementById("checkOutDate").value = tomorrow;
  document.getElementById("checkOutDate").min = tomorrow;
  document.getElementById("numOfGuests").value = 2;
}

function GetDays(){
                var checkOutDate = new Date(document.getElementById("checkOutDate").value);
                var checkInDate = new Date(document.getElementById("checkInDate").value);
                return parseInt((checkOutDate - checkInDate) / (24 * 3600 * 1000));
}
function GetTotalPrice(roomPrice){
    return Number(roomPrice*GetDays());
}

window.onload = function() {
  getDate();
}

function getRooms() {
    $("#tableReservation").dataTable().fnDestroy();
    $('#tableContainer').show();
//    var avrooms = $.ajax({
//         type: "POST",
//         url: "api/availableRooms",
//         data: { numOfGuests: document.getElementById("numOfGuests").value } // parameters
//    });

    var table1 = $('#tableReservation').DataTable({
            ajax :{
                     type: "POST",
                     url: "api/availableRooms?numOfGuests=" + document.getElementById("numOfGuests").value,
                     dataSrc: function (json) {
                                                var return_data = new Array();
                                                for(var i=0;i< json.length; i++){
                                                  return_data.push({
                                                    'id': json[i].id,
                                                    'roomSizeType'  : json[i].roomSizeType,
                                                    'roomBudgetType' : json[i].roomBudgetType,
                                                    'roomSceneType' : json[i].roomSceneType,
                                                    'maxBeds' : json[i].maxBeds,
                                                    'totalPrice' : GetTotalPrice(json[i].roomPrice),
                                                    'reserve' : "<button id='reserveButton'>Reserve</button>",
                                                    'roomNumber' : json[i].roomNumber
                                                  })
                                                }
                                                return return_data;
                                              }
            },
            columns: [
                { data: "id" },
                { data: "roomSizeType" },
                { data: "roomBudgetType" },
                { data: "roomSceneType" },
                { data: "maxBeds" },
                { data: "totalPrice"},
                { data: "reserve"}
            ]
    });
    //TODO check why this button does not work when check availability button refresh or pressed again "reservation.js:86 Uncaught TypeError: Cannot read property 'totalPrice' of undefined"
    $('#tableReservation tbody').on( 'click', 'button', function () {
        console.log('Hiii');
        console.log(table1.row($(this).parents('tr')));
            var data1 = table1.row( $(this).parents('tr') ).data();
            console.log(data1);
            alert("This is: "+ data1.totalPrice );
            $('#tableContainer').hide();
            $('#reservationContainer').show();
            document.getElementById("inputCheckIn").value = document.getElementById("checkInDate").value;
            document.getElementById("inputCheckOut").value = document.getElementById("checkOutDate").value;
           document.getElementById("inputNumOfGuest").value = document.getElementById("numOfGuests").value;;
           document.getElementById("inputTotalFlex").value = data1.totalPrice;
           document.getElementById("inputRoomID").value = data1.id;
           document.getElementById("inputRoomNumber").value = data1.roomNumber;

    });

}
//function reserveButton(){
//
//        console.log('Hiii');
//        console.log(table1.row($(this).parents('tr')));
//            var data1 = table1.row( $(this).parents('tr') ).data();
//            console.log(data1);
//            alert("This is: "+ data1.totalPrice );
//            $('#tableContainer').hide();
//            $('#reservationContainer').show();
//            document.getElementById("inputCheckIn").value = document.getElementById("checkInDate").value;
//            document.getElementById("inputCheckOut").value = document.getElementById("checkOutDate").value;
//           document.getElementById("inputNumOfGuest").value = document.getElementById("numOfGuests").value;;
//           document.getElementById("inputTotalFlex").value = data1.totalPrice;
//           document.getElementById("inputRoomID").value = data1.id;
//           document.getElementById("inputRoomNumber").value = data1.roomNumber;
//
//    }

function getReservations() {
    $('#tableReservation').show();
    $('#tableReservation').DataTable({
        ajax: {
            url: "api/reservations",
            dataSrc: ''
        },
        "columns": [
            { "data": "id" },
            { "data": "checkInDate" },
            { "data": "checkOutDate" },
            { "data": "numOfGuests" },
            { "data": "totalPrice" },
            { "data": "room" }
        ]
    });
}

function completeReservation() {
   postGuest();
   postReservation();
   //TODO check how to execute function one after another alert function works first!!!
   alert('The room reserved...');
}

function postReservation() {
   var reservation = {
       checkInDate:$("#inputCheckIn").val(),
       checkOutDate:$("#inputCheckOut").val(),
       numOfGuests:Number($("#inputNumOfGuest").val()),
       totalPrice:Number($("#inputTotalFlex").val()),
       room: {
            id: Number($("#inputRoomID").val())
       }
       //TODO find how an object in an object to post
//       data: { numOfGuests: document.getElementById("numOfGuests").value }
       //,
//       guest:$("#inputGuestID").val()
   };

   var jsonObject = JSON.stringify(reservation);

   $.ajax({
       url: "api/reservations",
       type: "POST",
       contentType: "application/json",
       data: jsonObject,
       success: function () {
           alert('We succeeded for reservation!');
       },
       error: function () {
           alert('try again for reservation');
       }
   });
}
function postGuest() {
   var guest = {
       lastName:$("#inputLastName").val(),
       firstName:$("#inputName").val(),
       email:$("#inputEmail").val(),
       tel:$("#inputPhone").val(),
       idType:$("#inputIDType").val(),
       idValue:$("#inputIDNumber").val(),
       address:$("#inputAddress").val()

   };

   var jsonObject = JSON.stringify(guest);

   $.ajax({
       url: "api/guests",
       type: "POST",
       contentType: "application/json",
       data: jsonObject,
       success: function () {
           alert('We succeeded for the guest!');
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
   var id = $("#idInputReservation").val();

   $.ajax({
       url: "api/reservations/" + id,
       type: "DELETE",
       success: function() {
           alert('We succeeded!');
           $("#idInputReservation").val('');
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
        $('#tableShowRoom').hide();

}

function changeRoom() {
   var id = $("#idInputReservation").val();
   var room = {
                 checkInDate:$("#checkInDate").val(),
                 checkOutDate:$("#checkOutDate").val(),
                 numOfGuests:Number($("#numOfGuests").val())
   };
   var jsonObject = JSON.stringify(room);

   $.ajax({
      url: "api/reservations/"+id,
      type: "PUT",
      contentType: "application/json",
      data: jsonObject,
      success: function () {
         alert('We succeeded!');
         $("#checkInDate").val('');
         $("#checkOutDate").val('');
         $("#numOfGuests").val('2');
      },
      error: function () {
          alert('try again');
      }
   });
}

$(document).ready(function () {
       $("#checkAvailabilityBtn").click(getRooms);
       $("#completeReservationBtn").click(completeReservation);
//       $('#reserveButton').click(reserveButton);
//       $('#tableReservation tbody').click(reserveButton);
});
