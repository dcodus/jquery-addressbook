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




// Functions that display things on the screen (views)
// function displayAddressBooksList() {
//     getAddressBooks().then(
//         function(addressBooks) {
            
//             $app.html(''); // Clear the #app div
//             $app.append('<h2>Address Books List</h2>');
//             $app.append('<ul>');
            
//             addressBooks.forEach(function(ab) {
//                 $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
//             });
            
//             $app.find('li').on('click', function() {
//                 var addressBookId = $(this).data('id');
//                 //This function shound create new html showing the addressbook.
//                 displayAddressBook(addressBookId);
//             });
//         }
//     )
// }

function displayAddressBook(addressBookId) {
    
}

function displayEntry() {
    
}
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
displayAddressBooksList();