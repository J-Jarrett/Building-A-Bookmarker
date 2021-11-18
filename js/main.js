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

// 6. Display bookmarks
window.addEventListener('DOMContentLoaded', fetchBookmarks);

// 1. Add Event Listener for Submit button
document.querySelector('#myForm').addEventListener("submit", saveBookmark);

// 3. Get values passed in by input
function saveBookmark(e) {
    e.preventDefault();

    // Get form values:
    const siteName = document.querySelector('#siteName').value;
    const siteUrl = document.querySelector('#siteUrl').value;

    // 4. Create object to store values
    const bookmark = {
        name: siteName,
        url: siteUrl
    };

    // 8. Validate form from function validateForm
    if (!validateForm(siteName, siteUrl)) return false;

    // 9. Clear form fields after submit:
    document.getElementById('myForm').reset();

    // 5. Create localStorage/retrieve from localStorage
 
    // Test if bookmarks is null:
    if (localStorage.getItem('bookmarks')===null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // 6. Display bookmarks - call the function to be created next:
    fetchBookmarks();

} // end function saveBookmark(e)

// 7. Create Delete bookmarks function
function deleteBookmark(url) {
    const bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks:
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
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 
    // Get output id and assign to var:
    const bookmarksResults = document.querySelector('#bookmarksResults');

    // Build output:
    bookmarksResults.innerHTML = "";
    bookmarks.forEach(bookmark => {
        const name = bookmark.name;
        const url = bookmark.url;
        
        bookmarksResults.innerHTML+=`<div class="card card-body mb-1"><h3>${name} <a class="btn btn-primary" target="_blank" href="${url}">Visit</a> <a onclick="deleteBookmark('${url}')" class="btn btn-danger delete" href="#">Delete</a></h3></div>`;     
    });

    // 7. Add event listener for Delete button:
    document.querySelector(".delete").addEventListener("click", deleteBookmark);

} // end function fetchBookmarks()


// 8. Validate inputs
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