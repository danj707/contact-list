//contact object, contains all contact information, including two arrays for
//addresses and phone numbers linked to contact


var contactObj = {
    firstname: '',
    lastname: '',
    address: [{
        street: '',
        city: '',
        state: ''
    }],
    phone: [],

    //assigns the form data
    assign: function (data) {
        this.firstname = data[0].value;
        this.lastname = data[1].value;
        this.address = data[2].value + data[3].value + data[4].value;
        this.phone = data[5].value;

        this.list(this);
    },

    //displays the clicked contact
    display: function () {
        for (var key in this) {
            var txt = "<li> " + key + " : " + this[key] + "</li>";
            $("ul.c_display").append(txt);
            $('ul.c_display').empty();
            console.log(key + " = " + this[key]);
        }
    },

    //lists the contacts
    list: function () {
        $('div.contact_list').show();
        var contactName = "<li><a class=\"contact_list\" href=\"#\">" + this.firstname + " " + this.lastname + "</a></li>";
        $('ul.c_list').append(contactName);
    }
};


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
        var newContact = Object.create(contactObj); //obj constructor
        newContact.assign(data);
        this.reset(); //reset the page form
    });

    $(".contact_list").on("click", 'ul', newContact.display(event) {
        $("div.contact_display").show();
        newContact.display(); //<<<---- HERE IS WHAT DOESN'T WORK
    });

});
