function getReservation() {
    $.get("api/reservations", function (reservation) {
    console.log(reservations)
        $("#reservation").empty();
        for (var i = 0; i < reservations.length; i++) {
            // Do something
            const reservation = reservations[i];
            $("#reservations").append('<p>' + reservation.room + '</p>');
            $("#reservations").append('<p>' + reservation.payment + '</p>');
            $("#reservations").append('<p>' + reservation.checkInDate + '</p>');
            $("#reservations").append('<p>' + reservation.checkOutDate + '</p>');
            $("#reservations").append('<p>' + reservation.numOfGuests + '</p>');
            $("#reservations").append('<p>' + reservation.id + '</p>');
            $("#reservations").append('<p>' + reservation.reservationNumber + '</p>');



        }
    });
}

function postReservation() {
    var reservation = {
        room: $("#roomInput").val(),
        payment: Number($("#paymentInput").val()),
        checkInDate: Number($("#checkInDate").val()),
        checkOutDate: Number($("#checkOutInput").val()),
        numOfGuests: Number($("#numOfGuestsInput").val()),
        id: Number($("#idInput").val()),
       reservationNumber: Number($("#reservationNumberInput").val())
    };

    var jsonObject = JSON.stringify(movie);

    $.ajax({
        url: "api/reservation",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert('We succeeded!');
            $("#roomInput").val('');
            $("#paymentInput").val('');
            $("#checkInInput").val('');
            $("#chechkOutInput").val('');
            $("#numOfGuestsInput").val('');
            $("#idInput").val('');

        },
        error: function () {
            alert('NOOOOOOOOOOOOOOOOOOOOOOOOO');
        }
    });
}