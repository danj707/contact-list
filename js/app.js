//contact object, contains all contact information, including two arrays for
//addresses and phone numbers linked to contact

var contactObj = {
    firstname: '',
    lastname: '',
    address: [],
    city: [],
    state: [],
    phone: []
};


function addContact(data) {
    var newContact = Object.create(contactObj);

    newContact.firstname = data[0].value;
    newContact.lastname = data[1].value;
    newContact.address = data[2].value;
    newContact.city = data[3].value;
    newContact.state = data[4].value;
    newContact.phone = data[5].value;



    listContacts(newContact);

    //    contactObj.city.forEach(function (value) {
    //      console.log(contactObj.city);
    //value.address.forEach(function (address) {
    //   console.log(address.name);
    // });
    //    });


}

function listContacts(newContact) {

    $('div.contact_list').show();

    var contactName = "<li><a class=\"display\" href=\"#\">" + newContact.firstname + " " + newContact.lastname + "</a></li>";


    $('ul.contact_list').append(contactName);

    //    for (var key in newContact) {
    //        console.log(key + " = " + newContact[key])
    //    }

}

function displayContact() {
    console.log("WTF?");
    $("div.contact_display").show();
}



$(document).ready(function () {

    //on initial load, hide the contact list, as it's empty, and the right side nav
    //after entering a contact, display the bottom contact list, until clicked
    //on, then show right side contact info for item clicked
    //also, reset the contact add form
    $('div.contact_display').hide();
    $('div.contact_list').hide();

    $("form#add_form").on("submit", function (event) {
        event.preventDefault(event);

        var data = $(this).serializeArray();
        addContact(data);

        this.reset(); //reset the page form

    });

    $("a.display").click(function (event) {
        displayContact();
    });

});
