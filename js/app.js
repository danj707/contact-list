///With assistance from Mentor, M.Banea for coding

///function to create the contactBook (repository)

function contactBook() {
    this.knownKeys = ['firstname', 'lastname', 'street', 'city', 'state', 'phone'];
    this.addresses = [];
}

//prototype methods for contactBook
contactBook.prototype = {

    //creates an ID to track the object per instance
    newId: function () {
        //if there are no IDs set create ID 1;
        if (this.addresses.length == 0) return 1;
        return (
            //check the last ID set so far and return that ID + 1
            Math.max.apply(null, this.addresses.map(function (address) {
                return address.id;
            })) + 1
        );
    },

    //add a contact function
    addContact: function (contact) {
        //get the last ID created above and
        contact.id = this.newId();
        // populate the rest of the contact details
        this.addresses.push(contact);
        console.log(contact);
    },

    //get a contact function
    getContact: function (id) {
        //search for a contact based the input received
        return this.addresses.find(function (contact) {
            return contact.id === id;
        });
    }
};

//function to create the contactForm object
function contactForm() {
    //list of all input field IDs, these match the id's used in the html form
    this.inputFieldIds = ['firstname', 'lastname', 'street', 'city', 'state', 'phone'];
}

//prototype methods for the contactForm object
contactForm.prototype = {

    //collects the data from the form by id (matches above), get the value and adds to array
    collectFormData: function () {
        var output = {};
        //for each of the input fields match the IDs and their values, and add them to the output array;
        this.inputFieldIds.forEach(function (element) {
            output[element] = $('#' + element).val();
        });
        return output;
    },
};

///new global objects - new call creates new objects
var contactBook = new contactBook();
var contactForm = new contactForm();

// show contact names in order to be clicked for more details
function renderContacts(contactBook) {
    $('ul.c_list').empty();
    $('div.contact_list').show();

    contactBook.addresses.forEach(function (contact) {
        $('ul.c_list').append("<li><a href='#' id='" + contact.id + "-show-contact' class='show'>" + contact.firstname + " " + contact.lastname + "</a></li>");
    });
}
//show contact details after you click on the contact name
function displayContact(contactBook, contact) {
    var htmlOutput = '';
    contactBook.knownKeys.forEach(function (keyName) {
        //the keyname is the key of the address book array (firstname, lastname etc)
        //contact[keyName] is the value of the key

        if (contact[keyName]) {
            htmlOutput += "<li><strong>" + keyName + ": </strong>" + contact[keyName] + "</li>";
        }
    });

    $('ul.c_display').html(htmlOutput); //output aggregated html to the DOM
}

$(document).ready(function () {

    $('div.contact_display').hide(); //hide the sections we dont need on load
    $('div.contact_list').hide();

    $('button#newcontact').click(function (event) {
        event.preventDefault();

        //collect all the form data to put them in the address book
        var contact = contactForm.collectFormData(); // collect the form data

        contactBook.addContact(contact); //add the form data to a new contact obj
        renderContacts(contactBook); //display the list of contacts

        document.getElementById('add_form').reset(); //reset the form

    });

    $('.contact_list').on('click', '.show', function (event) {
        event.preventDefault();
        $('div.contact_display').show();
        var contact = contactBook.getContact(parseInt(event.target.id));
        displayContact(contactBook, contact);
    });
});
