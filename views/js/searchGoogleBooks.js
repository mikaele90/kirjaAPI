/* eslint-disable max-len */
$(document).ready(function() {
  $('#searchForm').submit(function() {
    const search = $('#searchInput').val();
    if (search === '') {
      $('#searchInput').attr('id', 'searchInputError');
      alert('Please enter something in the field');
      $('#searchInputError').attr('id', 'searchInput');
    } else {
      let url = '';
      let img = '';
      let title = '';
      let author = '';
      let year = '';
      // Clear old results
      $('#result').html('');

      $.get('https://www.googleapis.com/books/v1/volumes?q=' + search, function(response) {
        $('#result').html('<br><br><h4>Search results: </h4>');
        for (let i = 0; i < response.items.length; i++) {
          console.log(response.items[i].selfLink);
          title = $('<hr><h5 class="center-align white-text"> Book Title: ' + response.items[i].volumeInfo.title + '</h5>');
          if (response.items[i].volumeInfo.authors === undefined) {
            author = $('<h5 class="center-align white-text"> Author(s): Unknown author(s)</h5>');
          } else {
            author = $('<h5 class="center-align white-text"> Author(s): ' + response.items[i].volumeInfo.authors + '</h5>');
          }
          if (response.items[i].volumeInfo.publishedDate === undefined) {
            year = $('<h5 class="center-align white-text"> Published: 0000</h5>');
          } else {
            year = $('<h5 class="center-align white-text"> Published: ' + response.items[i].volumeInfo.publishedDate.substring(0, 4) + '</h5>');
          }
          img = $('<img class="aligning card z-depth-5" id="bookCoverImage"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imageButton" class="btn red aligning">Read More</button></a><button id="addButton" class="btn red aligning" onClick="postToDb(\'' + response.items[i].selfLink + '\')">Add to database</button>');
          url= response.items[i].volumeInfo.imageLinks.thumbnail;
          img.attr('src', url);
          title.appendTo('#result');
          author.appendTo('#result');
          year.appendTo('#result');
          img.appendTo('#result');
        }
      });
    }
    return false;
  });
});

// eslint-disable-next-line require-jsdoc,no-unused-vars
function postToDb(googleSelfLink) {
  console.log('postToDb: ' + googleSelfLink);
  $.get(googleSelfLink, function(res) {
    console.log(res);
    const bookTitle = res.volumeInfo.title;
    console.log(bookTitle);
    let bookAuthor = '';
    if (res.volumeInfo.authors !== undefined) {
      for (let j = 0; j < res.volumeInfo.authors.length; j++) {
        if (j === res.volumeInfo.authors.length-1) {
          bookAuthor += res.volumeInfo.authors[j];
        } else {
          bookAuthor += res.volumeInfo.authors[j] + ', ';
        }
      }
    } else {
      bookAuthor = 'Unknown Author';
    }
    console.log(bookAuthor);
    let bookGenre = '';
    if (res.volumeInfo.categories !== undefined) {
      for (let k = 0; k < res.volumeInfo.categories.length; k++) {
        if (k === res.volumeInfo.categories.length-1) {
          bookGenre += res.volumeInfo.categories[k];
        } else {
          bookGenre += res.volumeInfo.categories[k] + ' / ';
        }
      }
    } else {
      bookGenre = 'Missing Genre';
    }
    console.log(bookGenre);
    let bookYear = undefined;
    if (res.volumeInfo.publishedDate !== undefined) {
      bookYear = res.volumeInfo.publishedDate.substring(0, 4);
    }
    console.log(bookYear);
    $.ajax({
      url: '/api/v1/books',
      type: 'POST',
      cache: false,
      data: {
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        year: bookYear
      },
      success: function(data) {
        console.log('Success: ', data);
        alert('Success!');
      },
      error: function(jqXHR, status, err) {
        console.log(bookTitle, bookAuthor, bookGenre, bookYear);
        console.log('Fail: ', jqXHR, status, err);
        alert('Status: ' + status + '\nError: ' + err);
      }
    });
  });
}
