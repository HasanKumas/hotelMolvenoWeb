var reservationList;
function getDate() {
    $("#checkInDate").datepicker("setDate", "0d");
    $(".checkInDate").datepicker("minDate", "0d");
    $("#checkOutDate").datepicker("setDate", "+1d");
    $(".checkOutDate").datepicker("minDate", "+1d");
    document.getElementById("numOfGuests").value = 2;
}

function GetDays() {
    var startDate = $("#checkInDate").datepicker("getDate");
    var endDate = $("#checkOutDate").datepicker("getDate");
    console.log(endDate);
    var diffInDays = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffInDays;
}
function GetTotalPrice(roomPrice) {
    return Number(roomPrice * GetDays());
}

function getRooms() {
    $("#tableReservation")
        .dataTable()
        .fnDestroy();
    $("#tableContainer").show();
    $("#reservationListContainer").hide();

    var table1 = $("#tableReservation").DataTable({
        ajax: {
            type: "POST",
            url:
                "api/availableRooms?numOfGuests=" +
                document.getElementById("numOfGuests").value +
                "&checkInDate=" +
                document.getElementById("checkInDate").value +
                "&checkOutDate=" +
                document.getElementById("checkOutDate").value,
            dataSrc: function (json) {
                var return_data = new Array();
                for (var i = 0; i < json.length; i++) {
                    return_data.push({
                        id: json[i].id,
                        roomSizeType: json[i].roomSizeType,
                        roomBudgetType: json[i].roomBudgetType,
                        roomSceneType: json[i].roomSceneType,
                        maxBeds: json[i].maxBeds,
                        totalPrice: GetTotalPrice(json[i].roomPrice),
                        reserve: "<button id='reserveButton'>Reserve</button>",
                        roomNumber: json[i].roomNumber
                    });
                }
                return return_data;
            }
        },
        columns: [
            { data: "roomNumber" },
            { data: "roomSizeType" },
            { data: "roomBudgetType" },
            { data: "roomSceneType" },
            { data: "maxBeds" },
            { data: "totalPrice" },
            { data: "reserve" }
        ]
    });

    $("#tableReservation tbody")
        .off()
        .on("click", "button", function () {
            console.log(table1.row($(this).parents("tr")));
            var data1 = table1.row($(this).parents("tr")).data();
            $("#tableContainer").hide();
            $("#reservationContainer").show();
            document.getElementById("inputCheckIn").value = document.getElementById(
                "checkInDate"
            ).value;
            document.getElementById("inputCheckOut").value = document.getElementById(
                "checkOutDate"
            ).value;
            document.getElementById(
                "inputNumOfGuest"
            ).value = document.getElementById("numOfGuests").value;
            document.getElementById("inputTotalFlex").value = data1.totalPrice;
            document.getElementById("inputRoomID").value = data1.id;
            document.getElementById("inputRoomNumber").value = data1.roomNumber;
        });
}

function getReservations() {
    $("#tableReservationList")
        .dataTable()
        .fnDestroy();
    $("#reservationListContainer").show();
    //    $('#tableReservationList').show();
    $("#tableContainer").hide();
    reservationList = $("#tableReservationList").DataTable({
        ajax: {
            url: "api/reservations",
            dataSrc: ""
        },
        columns: [
            { data: "id" },
            { data: "guest.lastName" },
            { data: "room.roomNumber" },
            { data: "checkInDate" },
            { data: "checkOutDate" },
            { data: "numOfGuests" },
            { data: "totalPrice" }
        ]
    });
}

function completeReservation() {
    var guest = {
        lastName: $("#inputLastName").val(),
        firstName: $("#inputName").val(),
        email: $("#inputEmail").val(),
        tel: $("#inputPhone").val(),
        idType: $("#inputIDType").val(),
        address: $("#inputAddress").val()
    };

    var jsonObject = JSON.stringify(guest);

    $.ajax({
        url: "api/guests",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function (guestId) {
            var reservation = {
                checkInDate: $("#inputCheckIn").val(),
                checkOutDate: $("#inputCheckOut").val(),
                numOfGuests: Number($("#inputNumOfGuest").val()),
                totalPrice: Number($("#inputTotalFlex").val()),
                room: { id: $("#inputRoomID").val() },
                guest: {
                    id: guestId
                }
            };

            var jsonObject = JSON.stringify(reservation);

            $.ajax({
                url:
                    "api/reservations?checkInDate=" +
                    document.getElementById("checkInDate").value +
                    "&checkOutDate=" +
                    document.getElementById("checkOutDate").value,
                type: "POST",
                contentType: "application/json",
                data: jsonObject,
                success: function () {
                    alert(
                        "The room number " +
                        document.getElementById("inputRoomNumber").value +
                        " reserved for " +
                        $("#inputLastName").val() +
                        " " +
                        $("#inputName").val() +
                        ". The total price is: " +
                        $("#inputTotalFlex").val()
                    );
                    $("#inputCheckIn").val(""),
                        $("#inputCheckOut").val(""),
                        $("#inputNumOfGuest").val(""),
                        $("#inputTotalFlex").val(""),
                        $("#inputLastName").val(""),
                        $("#inputName").val(""),
                        $("#inputEmail").val(""),
                        $("#inputPhone").val(""),
                        $("#inputIDType").val(""),
                        $("#inputAddress").val("");
                    $("#reservationContainer").hide();
                },
                error: function () {
                    //                              alert('try again for reservation');
                }
            });
        },
        error: function () {
            alert("try again");
        }
    });
}

function deleteReservations() {
    $("#tableInputRoom").hide();
    $("#saveButton").hide();
    $("#editButton").hide();
    $("#idInput").show();
    $("#deleteBtn").show();
    $("#deleteInputTitle").show();
}

function deleteReservation() {
    var id = $("#idInputReservation").val();

    $.ajax({
        url: "api/reservations/" + id,
        type: "DELETE",
        success: function () {
            alert("We succeeded!");
            $("#idInputReservation").val("");
        }
    });
}

function changeRoomInput() {
    $("#tableInputRoom").show();
    $("#editButton").show();
    $("#deleteInputTitle").show();
    $("#idInput").show();
    $("#deleteBtn").hide();
    $("#saveButton").hide();
    $("#tableShowRoom").hide();
}

function changeReservation() {
    var id = $("#idInputReservation").val();
    var room = {
        checkInDate: $("#checkInDate").val(),
        checkOutDate: $("#checkOutDate").val(),
        numOfGuests: Number($("#numOfGuests").val())
    };
    var jsonObject = JSON.stringify(room);

    $.ajax({
        url: "api/reservations/" + id,
        type: "PUT",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert("We succeeded!");
            $("#checkInDate").val("");
            $("#checkOutDate").val("");
            $("#numOfGuests").val("2");
        },
        error: function () {
            alert("try again");
        }
    });
}

$(document).ready(function () {
    $("#checkAvailabilityBtn").click(getRooms);
    $("#showReservations").click(getReservations);
    $("#completeReservationBtn").click(completeReservation);
    $(".datepicker").datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "dd-mm-yyyy"
    });
    getDate();
});
