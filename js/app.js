// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');




function sortByLetterBook(a, b) {
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

function sortByLetterEntry(a, b) {
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
    return $.getJSON(API_URL + '/Entries/' + entryId + '?filter={"include": ["addresses","emails","phones"]}');
}

function deleteAddressBook(addressBookId) {
    return $.ajax({
        url: API_URL + '/AddressBooks/' + addressBookId,
        type: 'DELETE',
        // beforeSend: function () {
        //     confirm("Are you sure?");
        // }
    });
}

function deleteEntries(entryId) {
    return $.ajax({
        url: API_URL + '/Entries/' + entryId,
        type: 'DELETE'
    })
}
// End data retrieval functions


var result = [];
$('#books').on('click', loadBooks);
$(document).on('ready', loadBooks);

function deleteBook() {
    var $listBooks = $('.listBooks');
    if ($listBooks.find("button").length === 0) {
        $.each($listBooks, function() {
            $(this).prepend('<button class="deleteButton">X</button>  ');
            // console.log(this);
        })
    }
    else {
        $listBooks.children("button").remove();
    }
}

function deleteEntry() {
    var $entryList = $('.entryList');
    if ($entryList.find("button").length === 0) {
        $.each($entryList, function() {
            $(this).prepend('<button class="deleteButton">X</button>  ');
            // console.log(this);
        })
    }
    else {
        $entryList.children("button").remove();
    }
}


$('#delete').on("click", deleteBook);

$(document).on("click", ".deleteButton", function(e) {
    e.stopPropagation();
    var addBookId = $(this).parent().data().id;
    $(this).parent().hide("slow");
    deleteAddressBook(addBookId);
    //   $(this).closest("li").slideUp('slow', function(){ $(this).closest("li").remove(); });

})

function loadBooks() {
    $('.app__contentRight').empty();
    $('.editButton').remove();
    $('input[name="search-bar"]').off("keyup");
    $('input[name="search-bar"]').on('keyup', searchBarBook);
    $('.app__contentLeft').find('ul').remove();
    $('.app__contentLeft').append('<ul></ul>');
    getAddressBooks().then(function(res) {
        result = res;
        result = result.sort(sortByLetterBook)
        result.forEach(function(book) {
            $('.app__contentLeft').find('ul').append('<li class="listBooks" data-id="' + book.id + '">' + book.name + '</li>');
        })
    })
}

function searchBarBook() {
    var search = $(this).val().toLowerCase();
    $('.app__contentLeft').find('ul').empty();
    console.log(result);
    result.forEach(function(book) {
        var lowerCase = book.name.toLowerCase();
        if (lowerCase.indexOf(search) > -1) {
            $('.app__contentLeft').find('ul').append('<li class="listBooks" data-id="' + book.id + '">' + book.name + '</li>');
        }
    })
}

function searchBarEntry() {
    var search = $(this).val().toLowerCase();
    $('.app__contentLeft').find('ul').empty();
    result.forEach(function(entry) {
        var lowerCaseLastName = entry.lastName.toLowerCase();
        var lowerCaseFirstName = entry.firstName.toLowerCase();
        if (lowerCaseLastName.indexOf(search) > -1 || lowerCaseFirstName.indexOf(search) > -1) {
            $('.app__contentLeft').find('ul').append('<li class="entryList" data-id="' + entry.id + '">' + entry.lastName + ' ' + entry.firstName + '</li>');
        }
    })
}

$(document).on('click', '.listBooks', function(e) {
    $('#delete').off("click");
    $('#delete').on("click", deleteEntry);
    $(document).off("click", ".deleteButton");
    $(document).on("click", ".deleteButton", function(e) {
        e.stopPropagation();
        var entryId = $(this).parent().data().id;
        $(this).parent().hide("slow");
        deleteEntries(entryId);
        //   $(this).closest("li").slideUp('slow', function(){ $(this).closest("li").remove(); });

    })
    $('input[name="search-bar"]').off('keyup');
    $('input[name="search-bar"]').on('keyup', searchBarEntry);
    $('.app__contentLeft').find('ul').empty();
    var addBookId = $(this).data();
    getEntries(addBookId.id).then(function(res) {
        result = res;
        result = result.sort(sortByLetterEntry);

        $.each(result, function(i, entry) {
            $('.app__contentLeft').find('ul').append('<li class="entryList" data-id="' + entry.id + '">' + entry.lastName + ' ' + entry.firstName + '</li>');
        })
    })
});
$(document).on('click', '.entryList', function() {
    var $this = $(this);
    var entryId = $(this).data().id;
    //Create new empty array to store filtered addresses
    var allAddresses = [];
    var allPhones = [];
    var allEmails = [];
    getEntry(entryId).then(function(res) {
        $('.editButton').remove();
        $('.leftSideButtons').append('<i class="fa fa-edit fa-2x editButton"></i>');
        $('.app__contentRight').empty();
        $('.app__contentRight').append(
            '<div class="entryInfo">' +
            '<p>First Name: ' + res.firstName + '</p>' +
            '<p>Last Name: ' + res.lastName + '</p>' +
            '<p>Birthday: ' + res.birthday.substring(0, 10) + '</p>' +
            '</div>' +
            '<div class="entryPhone"></div>' +
            '' +
            '<div class="entryEmail"></div>' +
            '' +
            '<div class="entryAddress"></div>' +
            ''
        );
        //Loop over the addresses array from our entry
        //Take each address object and filter it
        res.addresses.forEach(function(address) {
            //Create filtered object
            var filteredAddress = {};
            for (var prop in address) {
                if (address.hasOwnProperty(prop)) {
                    if (address[prop] !== null) {
                        //Add properties and values to filtered object
                        filteredAddress[prop] = address[prop];
                    }
                }
            }
            delete filteredAddress.id
            delete filteredAddress.entryId
                //Push the new address object to the allAddresses array
            allAddresses.push(filteredAddress);

        })
        var id = 0;
        //Display results
        allAddresses.forEach(function(address) {
            $('.entryAddress').append(
                '<div class="toggleAddress" id="' + id + '"><h2>' + address.type.charAt(0).toUpperCase() + address.type.substring(1) + ' Address <i class="fa fa-arrow-circle-down"></i><span>Click to expand</span></h2></div>'
            )
            for (var prop in address) {
                $('.entryAddress').find('#' + id + '').append(
                    '<p>' + prop + ' ' + address[prop] + '</p>'
                )
            }
            id++;
        })

        res.phones.forEach(function(phone) {
            var phoneType = phone.type.charAt(0).toUpperCase() + phone.type.substring(1);
            var phoneSubtype = phone.phoneType.charAt(0).toUpperCase() + phone.phoneType.substring(1)
            var phoneNumber = phone.phoneNumber;
            if (phone) {
                $('.entryPhone').append('<p>' + phoneType + ' (' + phoneSubtype + '): ' + phoneNumber + '</p>')
            }
        })
        res.emails.forEach(function(email) {
            var emailType = email.type.charAt(0).toUpperCase() + email.type.substring(1);
            var emailAddress = email.email
            if (email) {
                $('.entryEmail').append('<p>' + emailType + ' Email: ' + emailAddress + '</p>')
            }
        })

        $('.toggleAddress').find("p").toggle();
    });
});


$(document).on('click', '.toggleAddress', function() {
    var $this = $(this);
    if ($this.find("i").hasClass("rotateArrow")) {
        $this.find("i").removeClass("rotateArrow");
        $this.find("span").text("Click to expand")
    }
    else {
        $this.find("i").addClass("rotateArrow");
        $this.find("span").text("Click to hide")
    }

    $this.find('p').slideToggle(200);
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