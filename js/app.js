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
        url: API_URL + '/AddressBooks/' + entryId,
        type: 'DELETE'
    })
}

function deleteEmails(emailId) {
    return $.ajax({
        url: API_URL + '/EmailAddresses/' + emailId,
        type: 'DELETE'
    })
}

function deletePhones(phoneId) {
    return $.ajax({
        url: API_URL + '/Phones/' + phoneId,
        type: 'DELETE'
    })
}

function deleteAddresses(addressId) {
    return $.ajax({
        url: API_URL + '/Addresses/' + addressId,
        type: 'DELETE'
    })
}

function addAddressBook(addBookName) {
    return $.ajax({
        type: 'POST',
        url: API_URL + '/AddressBooks',
        data: addBookName,
        dataType: 'json'
    })
}

function addEntry(bookId, addNewEntry) {
    return $.ajax({
        type: 'POST',
        url: API_URL + '/Entries',
        data: addNewEntry,
        dataType: 'json'
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
    console.log("HELLO!")
    var $entryList = $('.entryList');
    if ($entryList.find("button").length === 0) {
        $.each($entryList, function() {
            $(this).prepend('<button class="deleteButton">X</button>  ');
            console.log(this);
        })
    }
    else {
        $entryList.children("button").remove();
    }
}

function addNewBook() {
    $('.app__contentRight').empty();
    $('.app__contentRight').append(
        '<form class="addNewBookForm">' +
        '<label for="addNewBook">Address Book Name</label>' +
        '<input type="text" name="addNewBook">' +
        '<button id="addNewBookButton">Add</button>' +
        '</form>'
    )
}

function addNewEntry(e) {
    console.log(e.data.bookId);
    $('.app__contentRight').empty();
    $('.app__contentRight').append(
        '<form class="addNewEntryForm">' +
        '<label for="addNewEntryName">First Name</label>' +
        '<input type="text" name="addNewEntryName">' +
        '<label for="addNewEntryLastName">Last Name</label>' +
        '<input type="text" name="addNewEntryLastName">' +
        '<div class="addEntryBirthday addEntryData">' +
        '<div class="addEditBtn">' +
        '<button class="addButtonEntry">+</button>' +
        '</div>' +
        '<p>add birthday</p></div>' +
        '<div class="addEntryPhones addEntryData">' +
        '<button class="addButtonEntry">+</button><span>add phones</span>' +
        '</div>' +
        '<div class="addEntryEmail addEntryData">' +
        '<button class="addButtonEntry">+</button><span>add emails</span>' +
        '</div>' +
        '<div class="addEntryAddresses addEntryData">' +
        '<button class="addButtonEntry">+</button><span>add addresses</span>' +
        '</div>' +
        '<button data-id="' + e.data.bookId + '" id="addNewEntryButton">Add</button>' +
        '</form>'
    )
}
$(document).on("click", ".deleteButton", function(e) {
    e.stopPropagation();
    var addBookId = $(this).parent().data().id;
    $(this).parent().hide("slow");
    deleteAddressBook(addBookId);
    //   $(this).closest("li").slideUp('slow', function(){ $(this).closest("li").remove(); });

})
$(document).on("dblclick", ".entryEmail p", function() {
    var emailId = $(this).data().id;
    if ($(this).find("button").length === 0) {
        $(this).prepend('<button class="removeEmail">X</button>  ')
    }
    else {
        $(this).find("button").remove();
    }
});
$(document).on("click", ".removeEmail", function(e) {
    e.stopPropagation();
    var emailId = $(this).parent().data().id
    console.log(emailId);
    $(this).parent().hide("normal");
    deleteEmails(emailId);
});
$(document).on("dblclick", ".entryPhone p", function(e) {
    if ($(this).find("button").length === 0) {
        $(this).prepend('<button class="removePhone">X</button>  ')
    }
    else {
        $(this).find("button").remove();
    }
})
$(document).on("click", ".removePhone", function(e) {
    e.stopPropagation();
    var phoneId = $(this).parent().data().id
    console.log(phoneId);
    $(this).parent().hide("normal");
    deletePhones(phoneId);
});
$(document).on("click", ".removeAddress", function(e) {
    e.stopPropagation();
    $(this).closest("div").hide("fast");
    var addressId = $(this).closest("div").data().id;
    deleteAddresses(addressId);
    // console.log(addressId);

})
$(document).on("click", ".addNewBookForm", function(e) {
    e.preventDefault();
})
$(document).on("click", ".addNewEntryForm", function(e) {
    e.preventDefault();
})
$(document).on("click", "#addNewBookButton", function(e) {
    var bookName = $('.addNewBookForm input[type="text"]').val();
    var postNewBook = {
        name: bookName
    }
    if (bookName) {
        addAddressBook(postNewBook);
    }
    $('.app__contentRight').empty();
    if (bookName) {
        $('.app__rightSide').append(
            '<h2>Address Book Added!</h2>'
        );
        $('.app__rightSide').find("h2").hide().fadeIn(500).delay(1000).fadeOut("slow", function() {
            $('.app__rightSide').find("h2").remove();
            loadBooks();
        })
    }
    else {
        loadBooks();
    }
})

$(document).on("click", ".addButtonEntry", function(e) {
    var $this = $(this);
    var birthday = $('.addEntryBirthday');
    var phones = $('.addEntryPhones');
    var emails = $('.addEntryEmail');
    var addresses = $('.addEntryAddresses');
    
    if($this.closest(birthday).length > 0){
        console.log("BIRTHDAY")
        if ($('.addEntryBirthday input').length === 0) {
            $(this).parent().parent().prepend('<input placeholder="YYYY-MM-DD" type="text"></input>')
            $(this).after('<button class="addButtonEntryDelete addButtonEntry">-</button>')
        }
    }
    
    if($this.closest(phones).length > 0){
        console.log("PHONES")
        $this.parent().prepend('<div class="pushLeft"><select><option>Home</option><option>Work</option><option>Other</option></select><input type="text"></input><button class="addButtonEntryDelete">-</button></div>');
        
    }
    
    if($this.closest(emails).length > 0){
        console.log('EMAILS')
        $this.parent().prepend('<div class="pushLeft"><select><option>Home</option><option>Work</option><option>Other</option></select><input type="text"></input></div>');
    }
    
    if($this.closest(addresses).length > 0){
        console.log("ADDRESSES")
        $this.parent().prepend(
            '<div class="addressForm">' +
            '<select><option>Home</option><option>Work</option><option>Other</option></select>' +
            '<label><span>Line 1</span><input type="text"></input></label>' +
            '<label><span>Line 2</span><input type="text"></input></label>' +
            '<label><span>City</span><input type="text"></input></label>' +
            '<label><span>State</span><input type="text"></input></label>' +
            '<label><span>Zip</span><input type="text"></input></label>' +
            '<label><span>Country</span><input type="text"></input></label>' +
            '</div>'
            )
    }
})

//HERE ADD CHECKS FOR PARRENT AND REMOVE LIKE ABOVE

$(document).on("click", ".addButtonEntryDelete", function(e) {
    
    //MUST MAKE INDIVIDUAL DELETE BUTTONS BASED ON PARENT LOCATION FOR BIRTHDAY ITS parent().parent()
    $(this).parent().remove();
    $(this).remove();
})


$(document).on("click", "#addNewEntryButton", function(e) {
    var bookId = $(this).data().id;
    var firstName = $('.addNewEntryForm input[name="addNewEntryName"]').val();
    var lastName = $('.addNewEntryForm input[name="addNewEntryLastName"]').val();
    var newEntry = {
        firstName: firstName,
        lastName: lastName,
        addressBookId: bookId
    };

    var d = new Date($('.addEntryBirthday input').val())
    console.log(d.toISOString())

    // addEntry(bookId, newEntry).then(
    //     function(entry) {
    //         console.log(entry)
    //     }
    // )

})

function loadBooks() {
    $('#addNew').on("click", addNewBook);
    $("#delete").off("click")
    $('#delete').on("click", deleteBook);
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
    var $currentBookId = $(this).data().id;

    $('.app__contentRight').empty();
    $('#delete').off("click");
    $('#delete').on("click", deleteEntry);
    $('#addNew').off("click");
    $('#addNew').on("click", {
        bookId: $currentBookId
    }, addNewEntry);

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

    //WE STOPED HERE WE HAVE TO HIDE THE ID
    // console.log($(this).find('.toggleAddress'))
    var $this = $(this);
    var entryId = $(this).data().id;
    //Create new empty array to store filtered addresses
    var allAddresses = [];
    var allPhones = [];
    var allEmails = [];
    getEntry(entryId).then(function(res) {
        $('.editButton').remove();
        $('.app__contentRight').empty();
        if (res.birthday) {
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
        }
        else {
            $('.app__contentRight').append(
                '<div class="entryInfo">' +
                '<p>First Name: ' + res.firstName + '</p>' +
                '<p>Last Name: ' + res.lastName + '</p>' +
                '</div>' +
                '<div class="entryPhone"></div>' +
                '' +
                '<div class="entryEmail"></div>' +
                '' +
                '<div class="entryAddress"></div>' +
                ''
            );
        }
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
            delete filteredAddress.entryId
                //Push the new address object to the allAddresses array
            allAddresses.push(filteredAddress);

        })
        var id = 0;
        //Display results
        allAddresses.forEach(function(address) {
            $('.entryAddress').append(
                '<div data-id="' + address.id + '"class="toggleAddress" id="' + id + '"><h2>' + address.type.charAt(0).toUpperCase() + address.type.substring(1) + ' Address <i class="fa fa-arrow-circle-down"></i><span>Click to expand</span></h2></div>'
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
                $('.entryPhone').append('<p data-id="' + phone.id + '">' + phoneType + ' (' + phoneSubtype + '): ' + phoneNumber + '</p>')
            }
        })
        res.emails.forEach(function(email) {
            var emailType = email.type.charAt(0).toUpperCase() + email.type.substring(1);
            var emailAddress = email.email
            if (email) {
                $('.entryEmail').append('<p data-id="' + email.id + '">' + emailType + ' Email: ' + emailAddress + '</p>')
            }
        })

        $('.toggleAddress').find("p").toggle();
    });
});


$(document).on('click', '.toggleAddress', function() {
    $(this).find('p:contains("id")').detach();
    var $this = $(this);
    if ($this.find("i").hasClass("rotateArrow")) {
        $this.find("i").removeClass("rotateArrow");
        $this.find("span").text("Click to expand")
        $this.find('h2 button').remove();
    }
    else {
        $this.find("i").addClass("rotateArrow");
        $this.find("span").text("Click to hide");
        $this.find("h2").prepend('<button class="editAddress">Edit</button>');
        $this.find("h2").prepend('<button class="removeAddress">X</button>');
    }

    $this.find('p').slideToggle(200);
})



// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
// displayAddressBooksList();