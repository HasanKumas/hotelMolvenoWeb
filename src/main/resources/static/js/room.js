var roomId
var roomTable
function getRooms() {
    $("#tableShowRoom").dataTable().fnDestroy();
    $('#tableInputRoom').hide();
    $('#formEditRooms').hide();
    $('#tableShowRoom').show();
    roomTable = $('#tableShowRoom').DataTable({
        ajax: {
            url: "api/rooms",
            dataSrc: function (json) {
                var return_data = new Array();
                for (var i = 0; i < json.length; i++) {
                    return_data.push({
                        'id': json[i].id,
                        'roomSizeType': json[i].roomSizeType,
                        'roomBudgetType': json[i].roomBudgetType,
                        'roomSceneType': json[i].roomSceneType,
                        'maxBeds': json[i].maxBeds,
                        'roomPrice': json[i].roomPrice,
                        'deleteBtn': "<button class='btn btn-danger deleteButton' roomId=' " + json[i].id + " ' >delete</button>",
                        'editBtn': "<button class='btn btn-primary editBtn' roomId=' " + json[i].id + " '> edit </button>",
                        'roomNumber': json[i].roomNumber
                    });
                }
                return return_data;
            }
        },
        "columns": [
            { "data": "roomNumber" },
            { "data": "maxBeds" },
            { "data": "roomPrice" },
            { "data": "roomSizeType" },
            { "data": "roomBudgetType" },
            { "data": "roomSceneType" },
            { "data": "editBtn" },
            { "data": "deleteBtn" }
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Create a room',
                action: function (e, dt, node, config) {
                    var content = $('#formEditRooms').html();
                    $('#exampleModal .modal-body').html(content);
                    $('#exampleModal .modal-title').text("Room Registration Form");
                    $('#exampleModal').modal('show');
                    $('#okDelModalBtn').hide();
                    $('#saveEdtModalBtn').hide();
                    $('#saveCrtModalBtn').show();
                }
            }
        ]
    });
    $("#saveCrtModalBtn").click(function () {
        postRoom();
        $('#exampleModal').modal('hide');
    });

    $("#tableShowRoom tbody").off().on('click', 'button.deleteButton', function () {
        $('#exampleModal').modal('show');
        $('#exampleModal .modal-body').text("Are you sure to delete this room?");
        $('#exampleModal .modal-title').text("Delete Confirmation!");
        $('#okDelModalBtn').show();
        $('#saveEdtModalBtn').hide();
        $('#saveCrtModalBtn').hide();
        roomId = $(this).attr('roomId');
    });
    $("#okDelModalBtn").click(function () {
        console.log(roomId);
        deleteRoom(roomId);
        $('#exampleModal').modal('hide');
    });

    $('#tableShowRoom').off().on('click', 'button.editBtn', function () {
        console.log(roomTable.row($(this).parents('tr')));
        var data1 = roomTable.row($(this).parents('tr')).data();

        $('#exampleModal').modal('show');
        var content = $('#formEditRooms').html();
        $('#exampleModal .modal-body').html(content);
        $('#exampleModal .modal-title').text("Room Modification Form");
        $('#okDelModalBtn').hide();
        $('#saveEdtModalBtn').show();
        $('#saveCrtModalBtn').hide();

        document.getElementById("roomNumberEdit").value = data1.roomNumber;
        document.getElementById("maxBedsEdit").value = data1.maxBeds;
        document.getElementById("roomPriceEdit").value = data1.roomPrice;
        document.getElementById("roomSizeEdit").value = data1.roomSizeType;
        document.getElementById("roomSceneEdit").value = data1.roomSceneType;
        document.getElementById("roomBudgetEdit").value = data1.roomBudgetType;
        roomEditId = data1.id;
    });
    $('#saveEdtModalBtn').click(function () {
        changeRoom(roomEditId);
        $('#exampleModal').modal('hide');
    });
}
//function postRoomInput() {
//    $('#formEditRooms').show();
//    $("#saveInputButton").show();
//    $("#editInputButton").hide();
//
//    $("#roomNumberEdit").val('');
//    $("#maxBedsEdit").val ('');
//    $("#roomPriceEdit").val ('');
//    $("#roomSizeEdit").val ('');
//    $("#roomSceneEdit").val ('');
//    $("#roomBudgetEdit").val('');
//}
function postRoom() {
    var room = {
        roomNumber: $("#roomNumberEdit").val(),
        maxBeds: Number($("#maxBedsEdit").val()),
        roomPrice: Number($("#roomPriceEdit").val()),
        roomSizeType: $("#roomSizeEdit").val(),
        roomBudgetType: $("#roomBudgetEdit").val(),
        roomSceneType: $("#roomSceneEdit").val()
    };

    var jsonObject = JSON.stringify(room);

    $.ajax({
        url: "api/rooms",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function (message) {
            //           alert('The room has created!');
            alert(message);
            $("#roomNumber").val('');
            $("#maxBeds").val('');
            $("#roomPrice").val('');
            $("#roomSize").val('');
            $("#roomBudget").val('');
            $("#roomScene").val('');

            //           $('#formEditRooms').hide();
            roomTable.ajax.reload();
        },
        error: function () {
            alert('try again');
        }
    });
}

function deleteRoom(roomId) {
    $.ajax({
        url: "api/rooms/" + roomId,
        type: "DELETE",
        success: function () {
            alert('The room has deleted!');
            roomTable.ajax.reload();
        }
    });
}

function changeRoom(roomId) {
    var room = {
        roomNumber: $("#roomNumberEdit").val(),
        maxBeds: Number($("#maxBedsEdit").val()),
        roomPrice: Number($("#roomPriceEdit").val()),
        roomSizeType: $("#roomSizeEdit").val(),
        roomBudgetType: $("#roomBudgetEdit").val(),
        roomSceneType: $("#roomSceneEdit").val()
    };
    var jsonObject = JSON.stringify(room);

    $.ajax({
        url: "api/rooms/" + roomId,
        type: "PUT",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert('The room has modified!');
            //         $("#formEditRooms").hide();
            roomTable.ajax.reload();
        },
        error: function () {
            alert('try again');
        }
    });
}
$(document).ready(function () {
    getRooms();
});
