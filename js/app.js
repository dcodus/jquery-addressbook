// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');





// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    // TODO... perhaps by using a GET to /AddressBooks/:id/entries :)
}

function getEntry(entryId) {
    // TODO..
}
// End data retrieval functions


var result = [];
$('#books').click(function() {
    $('.app__contentLeft').find('ul').remove();
    $('.app__contentLeft').append('<ul></ul>');
    getAddressBooks().then(function(res) {
        result = res;
        result = result.sort(function(a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            } else if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            } else {
                return 0
            }
        })
        result.forEach(function(book) {
            $('.app__contentLeft').find('ul').append('<li class="listBooks" data-id="' + book.id + '">' + book.name + '</li>');
        })
    })
})
$('input[name="search-bar"]').on('keyup', function() {
    var search = $(this).val().toLowerCase();
    $('.app__contentLeft').find('ul').empty();
    result.forEach(function(book) {
        var lowerCase = book.name.toLowerCase();
        if (lowerCase.indexOf(search) > -1) {
            $('.app__contentLeft').find('ul').append('<li class="listBooks" data-id="' + book.id + '">' + book.name + '</li>');
        }
    })
});


$(document).on('click', '.listBooks', function() {
    console.log($(this).data('id'));
})


function displayAddressBook(addressBookId) {

}

function displayEntry() {

}
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
// displayAddressBooksList();