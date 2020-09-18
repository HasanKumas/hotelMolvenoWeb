function getGuests() {
    $.get('api/guests', function (guests) {
        displayGuests(guests);
    });
}

$(document).ready(function () {

    $('#createGuestButton').click(function () {
        $('#guestCreatePop').modal("show");
        $('#CreateguestFirstNameInput').val('');
        $('#CreateguestLastNameInput').val('');
        $('#CreateguestTelInput').val('');
        $('#CreateguestEmailInput').val('');
        $('#CreateguestAddressInput').val('');
        $('#CreateguestIdTypeInput').val('');
        $('#CreateguestIdValueInput').val('');
    });
    $('#savePop').click(createGuest);
    getGuests();
    $('#confirmDelete').click(removeGuest);
    $('#editPop').click(createEditGuest);
});


var guestIdDelete;
var guestIdEdit;
function displayGuests(guests) {
    var guestContainer = $('#guestContainer');
    guestContainer.empty();
    $.each(guests, function (index, guest) {
        $('#guestContainer').append(' <tr><td> ' + guest.firstName + '  </td><td> ' + guest.lastName + '  </td><td> ' + guest.tel + '  </td><td> ' + guest.email + '  </td><td> ' + guest.address + '  </td><td> ' + guest.idType + '  </td><td> ' + guest.idValue + '  </td><td><button class="remove-button" guestId="' + guest.id + '">delete</button></td><td><button class="edit-button" guestId="' + guest.id + '">edit</button></td></tr>');
    });

    $('#guestContainer .remove-button').click(function () {
        guestIdDelete = $(this).attr('guestId');

        $('#areYouSure').modal({ backdrop: 'static', keyboard: false });
    });
    $('#guestContainer .edit-button').click(function () {
        var guestData =


            guestIdEdit = $(this).attr('guestId');


        $.get('api/guests/' + guestIdEdit, function (guest) {

            $('#guestEditPop').modal({ backdrop: 'static', keyboard: false });
            $('#guestFirstNameInput').val(guest.firstName);
            $('#guestLastNameInput').val(guest.lastName);
            $('#guestTelInput').val(guest.tel);
            $('#guestEmailInput').val(guest.email);
            $('#guestAddressInput').val(guest.address);
            $('#guestIdTypeInput').val(guest.idType);
            $('#guestIdValueInput').val(guest.idValue);
        });
    });

}

function postGuest(guest) {
    var jsonGuest = JSON.stringify(guest);
    $.ajax({
        url: "api/guests",
        type: "post",
        contentType: "application/json",
        data: jsonGuest,
        success: function () {
            alert('you created a new guest.');
            $('#guestCreatePop').modal("hide");
            getGuests();
        },
        error: function () {
            $('#guestCreatePop').modal("hide");
            alert('something went wrong.');
        }
    });
}
function createGuest() {
    var guestFirstName = $('#CreateguestFirstNameInput').val();
    var guestLastName = $('#CreateguestLastNameInput').val();
    var GuestTel = $('#CreateguestTelInput').val();
    var guestEmail = $('#CreateguestEmailInput').val();
    var GuestAddress = $('#CreateguestAddressInput').val();
    var guestIdType = $('#CreateguestIdTypeInput').val();
    var guestIdValue = $('#CreateguestIdValueInput').val();
    if (!guestFirstName) {
        $("#noName").modal("show");
        return;
    }
    if (guestFirstName.length < 3) {
        $("#tooShort").modal("show");
        return;
    }
    var guest = {
        firstName: guestFirstName,
        lastName: guestLastName,
        tel: GuestTel,
        email: guestEmail,
        address: GuestAddress,
        idType: guestIdType,
        idValue: guestIdValue
    };
    postGuest(guest);
}

function removeGuest() {
    var guestId = guestIdDelete;
    $.ajax({
        url: 'api/guests/' + guestId,
        type: "DELETE",
        success: function () {
            getGuests();
            $("#areYouSure").modal("hide");

        },
        error: function () {
            $("#areYouSure").modal("hide");
            alert('You can not delete a guest who has a reservation. First delete the reservation..');
        }

    });

}
function editGuest(guest) {
    var jsonGuest = JSON.stringify(guest);
    $.ajax({
        url: 'api/guests/' + guestIdEdit,
        type: 'PUT',
        contentType: "application/json",
        data: jsonGuest,
        success: function () {
            alert('you edited the guest.');
            getGuests();
            $("#guestEditPop").modal("hide");
        },
        error: function () {
            $("#guestEditPop").modal("hide");
            alert('something went wrong.' + guestIdEdit);
        }
    });
}

function createEditGuest() {

    var guestFirstName = $('#guestFirstNameInput').val();
    var guestLastName = $('#guestLastNameInput').val();
    var GuestTel = $('#guestTelInput').val();
    var guestEmail = $('#guestEmailInput').val();
    var GuestAddress = $('#guestAddressInput').val();
    var guestIdType = $('#guestIdTypeInput').val();
    var guestIdValue = $('#guestIdValueInput').val();
    if (!guestFirstName) {
        $("#noName").modal("show");
        return;
    }
    if (guestFirstName.length < 3) {
        $("#tooShort").modal("show");
        return;
    }
    var guest = {
        firstName: guestFirstName,
        lastName: guestLastName,
        tel: GuestTel,
        email: guestEmail,
        address: GuestAddress,
        idType: guestIdType,
        idValue: guestIdValue
    };
    editGuest(guest);
}
