// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');




function sortByLetterBook(a,b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
    }
    else {
        return 0
    }
}
function sortByLetterEntry(a,b) {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1
    }
    else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1
    }
    else {
        return 0
    }
}
// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries');
}

function getEntry(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId);
}
function getAddresses(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId + '/addresses')
}
// End data retrieval functions


var result = [];
$('#books').click(function() {
    $('.app__contentLeft').find('ul').remove();
    $('.app__contentLeft').append('<ul></ul>');
    getAddressBooks().then(function(res) {
        result = res;
        result = result.sort(sortByLetterBook)
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

$(document).on('click', '.listBooks', function(e) {
    $('.app__contentLeft').find('ul').empty();
    var addBookId = $(this).data();
    getEntries(addBookId.id).then(function(res) {
        result = res;
        result = result.sort(sortByLetterEntry);
        $.each(result, function(i, entry) {
            $('.app__contentLeft').find('ul').append('<li class="entryList" data-id="'+entry.id+'">' + entry.lastName + ' ' + entry.firstName + '</li>');
        })
    })
});

$(document).on('click', '.entryList', function() {
    var entryId = $(this).data().id;
    var addresses = [];
    var allAddresses = [];
    getAddresses(entryId).then(function(res) {
        if(res){
            addresses = res;
            addresses.forEach(function(address){
                var filteredAddress = {};
                for(var prop in address){
                    if(address.hasOwnProperty(prop)){
                        if(address[prop] !== null){
                            filteredAddress[prop] = address[prop];
                        }
                    }
                }
                allAddresses.push(filteredAddress);
                console.log(allAddresses);
            })
        }
    })
    getEntry(entryId).then(function(res) {
        $('.app__contentRight').empty();
        $('.app__contentRight').append(
            '<div class="entryInfo">' +
            '<p>First Name: '+res.firstName+'</p>' +
            '<p>Last Name: '+res.lastName+'</p>' +
            '<p>Birthday: '+res.birthday.substring(0, 10)+'</p>' +
            '</div>' +
            '' +
            '<div class="entryAddress"></div>'
            );
        allAddresses.forEach(function(address) {
            for(var prop in address){
                $('.entryAddress').append(
                    '<p>'+prop+' '+address[prop]+'</p>'
                    )
            }
        })
    });
});


function displayAddressBook(addressBookId) {

}

function displayEntry() {

}
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
// displayAddressBooksList();