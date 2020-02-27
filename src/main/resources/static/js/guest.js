function getGuest() {
     $.get("api/guests", function (guest) {
         console.log(guest);
         $("#guest-list").empty();
         for (var i = 0; i < guest.length; i++) {
             // Do something
             const list = document.getElementById('guest-list');
                                const row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${guest[i].id}</td>
                                    <td>${guest[i].firstName}</td>
                                    <td>${guest[i].lastName}</td>
                                    <td>${guest[i].tel}</td>
                                    <td>${guest[i].email}</td>
                                    <td>${guest[i].address}</td>
                                    <td>${guest[i].idType}</td>
                                    <td>${guest[i].idValue}</td>`;
                                list.appendChild(row);
         }
     });
 }

function postGuest() {
    var guest = {
        firstName: $("#First_Name").val(),
        lastName: $("#Last_Name").val(),
        tel: $("#Phone").val(),
        email:$("#Email").val(),
        address: $("#Address").val(),
        idType: $("#Id_Type").val(),
        idValue:$("#Id_Value").val()


    };
    console.log(guest);

    var jsonObject = JSON.stringify(guest);

    $.ajax({
        url: "/api/guests",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            getGuest();
            alert('We succeeded!');
            $("#First_Name").val('');
            $("#Last_Name").val('');
            $("#Phone").val('');
            $("#Email").val('');
            $("#Address").val('');
            $("#Id_Type").val('');
            $("#Id_Value").val('');

        },
        error: function () {
            alert('NOOOOOOOOOOOOOOOOOOOOOOOOO');
        }

    });
}


$(document).ready(function () {

    $("#create").click(postGuest);

});