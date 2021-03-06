// Set up: a fair bit of this.
// Create the UI with Bootstrap, html, original used jQuery, and style.css contains jumbotron-narrow css from old Bootstrap versions.

// 1. Add Event Listener for Submit button
// 2. Create function for event listener action
// 3. Get values passed in by input
// 4. Create object to store values
// 5. Create localStorage/retrieve from localStorage
// 6. Display bookmarks
// 7. Create Delete bookmarks function
// 8. Validate inputs
// 9. Clear form fields after submit.

// ========================================================

// 6. Display bookmarks - add this after fetchBookmarks() written to get already saved bookmarks loaded.
window.addEventListener('DOMContentLoaded', fetchBookmarks);
    // note NOTHING SHOWS at first, because we haven't assigned a variable to contain it, or added any html to the array fetched from localStorage to build any output. 


// 1. Add Event Listener for Submit button

document.querySelector('#myForm').addEventListener("submit", saveBookmark);





// 2. Create function for event listener action

// function saveBookmark(e) {
//     e.preventDefault();

//     // first test: click on "Submit"
//     console.log("It works!");
// }


// 3. Get values passed in by input

function saveBookmark(e) {
    e.preventDefault();

    // Get form values:
    const siteName = document.querySelector('#siteName').value;
    const siteUrl = document.querySelector('#siteUrl').value;

    //test
    console.log(siteName, siteUrl);

    // 4. Create object to store values
    const bookmark = {
        name: siteName,
        url: siteUrl
    };

    //test
    console.log(bookmark);

    // 8. Validate form from function validateForm
    if (!validateForm(siteName, siteUrl)) return false;

    // 9. Clear form fields after submit:
    document.getElementById('myForm').reset();

    // 5. Create localStorage/retrieve from localStorage
    // ================================================

    // How local storage works: localStorage test:
    localStorage.setItem('test', 'Hello World');
        // input some content, click submit - "nothing happens" because we're not outputting localStorage.
        // Check localStorage by going to Tools, Application, Storage, LocalStorage, file: see Key test, Value Hello World, highlighted line 1: Hello World. So that is working too, good.
        // Can also delete items from here too: highlight, X (delete selected), reload: all gone.
        console.log(localStorage.getItem('test'));
    // now let's test removeItem:
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
        // what happened here? well, we input something, it got set to localStorage, it logged out "Hello World"; then we removed what was set to Key 'test' completely, it logged 'null'. Well done.

    // We want to save the created bookmark object in localStorage, but FIRST check to see if there is anything in localStorage
    // IF SO: retrieve it, add to it, save it again
    // ELSE create our array, add the bookmark object to it, then setItem to localStorage, BUT saved as a string (JSON.stringify()).

    // Test if bookmarks is null:
    if (localStorage.getItem('bookmarks')===null) {
        // initialize an empty array
        const bookmarks = [];
        // add this new object to array
        bookmarks.push(bookmark);
        // and set it to local storage as a JSON
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
        // test this:
        // we don't have anything in 'bookmarks' yet, so its value in storage is null, so it should store what we input. 
        // Enter Google, enter https://www.google.com.au/, and click Submit.
        // Go to Tools, Application, Storage, LocalStorage to see it there as a string formatted JSON array (content all in "").
    
        // =================

    // What if bookmarks is NOT null, ie it has some items stored there?
        // Get the item, assign it to a var, and parse it back from JSON to an array of objects.
    else {
        // get bookmarks from localStorage:
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add our newly created bookmark object to the array bookmarks:
        bookmarks.push(bookmark);
        // Stringify the array and reset back to localStorage:
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
        // Test this by adding another site (input some fields, Submit), then go to Tools, Application, Storage, LocalStorage to see the new stored JSON array with 2 objects in it now.

    // 6. Display bookmarks - call the function to be created next:
    fetchBookmarks();

    

} // end function saveBookmark(e)

// 7. Create Delete bookmarks function

function deleteBookmark(url) {
    
    // get bookmarks from local storage:
    const bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks:
    // bookmarks.forEach(bookmark => {
    //     if (bookmark.url===url) bookmarks.splice(bookmark,1);
    // })
        // NOPE. TRY AGAIN.
    for(i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].url===url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Reset back to local storage:
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

}



// 6. Display bookmarks

function fetchBookmarks() {

    // Get bookmarks from localStorage:
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // test:
    console.log(bookmarks);
        // This is where i added "window.addEventListener('DOMContentLoaded', fetchBookmarks);" at the top of this file.
    
    // Get output id and assign to var:
    const bookmarksResults = document.querySelector('#bookmarksResults');

    // Build output TEST:
    // bookmarksResults.innerHTML = "Hello";
        // Save, run - see it works! we have "Hello" under the form!
        // So we managed to pass some HTML to that spot through JavaScript.
        // Next: change .innerHTML to an empty string; loop thru bookmarks array and output them by name and URL one by one, then put them inside a div.

    // Build output:
    bookmarksResults.innerHTML = "";
    // `<div class="container"><div class="row align-items-start">`;
    // Loop thru bookmarks and concat to innerHTML:
    bookmarks.forEach(bookmark => {
        const name = bookmark.name;
        const url = bookmark.url;
        // test
        // bookmarksResults.innerHTML+=name;
        // So this test run gives us "GoogleBootstrapJigsawsCSS Tricks" in the browser under the form. Need to format these.
        // Side note: used forEach instead of a for loop here.

        // bookmarksResults.innerHTML+=`<div class="card mt-1 px-3"><h3>${name}</h3></div>`;
            // good-ish; Now we need to add buttons, which will be links to take us to the websites, and more links for deleting the shortcut.

            bookmarksResults.innerHTML+=`<div class="card card-body mb-1"><h3>${name} <a class="btn btn-primary" target="_blank" href="${url}">Visit</a> <a onclick="deleteBookmark('${url}')" class="btn btn-danger delete" href="#">Delete</a></h3></div>`;

            // original tutorial used '<a onclick="deleteBookmark(\''+url+'\')"> in there as well; onclick now deprecated for eventListener, need to remember to add eventListener for class delete, which I've added in above.
            // onclick is right, bit too hard to add eventListener for a class that doesn't exist until generated. NOW it works.

        // Well, it could look better. Must look at that sometime. Moving on to create deleteBookmark(), between saveBookmark() and fetchBookmark()

    });
    // bookmarksResults.innerHTML+=`</div></div>`;

    // 7. Add event listener for Delete button:
    document.querySelector(".delete").addEventListener("click", deleteBookmark);
    // Trickier than it looks.
    // Think hard: this is a class of <a>, within a parent <h3>, within a parent <div>; we did this a little while ago in.... 

    
} // end function fetchBookmarks()


// 8. Validate inputs
// (this was originally within saveBookmark() but decided to pull it from there, write it here then call it within saveBookmark())
function validateForm(siteName, siteUrl) {
    if (!siteName||!siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    // if submit hit without content in fields, sends alert message reminder
    
    const urlCheck = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    if(!siteUrl.match(urlCheck)) {
        alert("Please use a valid URL");
        return false;
    }
    // check for valid url

    return true;
    // VERY IMPORTANT! we're going to pass this result, true or false if not validated, through to our call of this function in saveBookmark
 
}

// 9. Clear form fields after submit - see within saveBookmark()