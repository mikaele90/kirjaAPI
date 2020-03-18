/* eslint-disable max-len,require-jsdoc,no-unused-vars */
let formOpen = false;

$.ajax({
  url: '/api/v1/books',
  data: {
    // author: 'Juupa Juu',
  },
  success: function(result) {
    let i;
    let resultHTML = '';
    let bookSelfLink = '';
    let bookId = '';
    const tableHeaderHTML = '<tr id="bookTableKeyRow">\n' +
      '                <th id="bookTableTitleHeader">Book Title</th>\n' +
      '                <th id="bookTableHeader">PUT</th>\n' +
      '                <th id="bookTableHeader">PATCH</th>\n' +
      '                <th id="bookTableHeader">DELETE</th>\n' +
      '            </tr>';
    for (i = 0; i < result.length; i++) {
      bookSelfLink = result[i].links.linkToThisBook;
      bookId = result[i]._id;
      console.log(bookId);
      resultHTML += '<tr id="bookTableGenericRow">' +
        '<td id="bookTableTitleTd"><a href=\'' + bookSelfLink + '\'>' + result[i].title + '</a><p id="p_' + bookId + '"></p></td>' +
        '<td id="bookTablePutTd"><button type="button" name="putButton" id="putButton_' + bookId + '" onclick="putBook(\'' + bookId + '\')">Replace</button></td>' +
        '<td id="bookTablePatchTd"><button type="button" name="patchButton" id="patchButton_' + bookId + '" onclick="patchBook(\'' + bookId + '\')">Patch</button></td>' +
        '<td id="bookTableDeleteTd"><button type="button" name="deleteButton" id="deleteButton_' + bookId + '" onclick="deleteBook(\'' + bookId + '\')">Delete</button></td>' +
        '</tr>';
    }
    $('#bookTable').html(tableHeaderHTML + resultHTML);
    console.log(result);
  }
});

function putBook(bookId) {
  console.log('Replace book: ' + bookId);
  const element = document.getElementById('p_' + bookId);
  $.get('http://localhost:8000/api/v1/books/' + bookId, function(res) {
    const bookTitle = res.title;
    const bookAuthor = res.author;
    const bookGenre = res.genre;
    const bookYear = res.year;
    console.log(bookTitle);
    const putFormHTML = $('<form id="putForm_' + bookId + '">\n' +
      '            <label for="bookTitle">Book title:</label>\n' +
      '            <input type="text" id="bookTitle_' + bookId + '" name="bookTitle" value="' + bookTitle + '"><br>\n' +
      '            <label for="bookAuthor">Book author:</label>\n' +
      '            <input type="text" id="bookAuthor_' + bookId + '" name="bookAuthor" value="' + bookAuthor + '"><br>\n' +
      '            <label for="bookGenre">Book genre:</label>\n' +
      '            <input type="text" id="bookGenre_' + bookId + '" name="bookGenre" value="' + bookGenre + '"><br>\n' +
      '            <label for="bookYear">Published (Year):</label>\n' +
      '            <input type="number" id="bookYear_' + bookId + '" name="bookYear" value="' + bookYear + '"><br>\n' +
      '            <button type="submit" name="submit" id="submit">Replace book</button>\n' +
      '            <button type="reset" value="Reset">Reset form</button>\n' +
      '        </form>');
    if (element.childNodes.length < 1 && !formOpen) {
      formOpen = true;
      putFormHTML.appendTo('#' + element.id);
      document.getElementById('putButton_' + bookId).innerText='Close form';
      const formElement = document.getElementById('putForm_' + bookId);
      $('#' + formElement.id).on('submit', function() {
        console.log('Replace start');
        const newBookTitle = $('#bookTitle_' + bookId).val();
        const newBookAuthor = $('#bookAuthor_' + bookId).val();
        const newBookGenre = $('#bookGenre_' + bookId).val();
        const newBookYear = $('#bookYear_' + bookId).val();
        $.ajax({
          url: '/api/v1/books/' + bookId,
          type: 'PUT',
          data: {
            title: newBookTitle,
            author: newBookAuthor,
            genre: newBookGenre,
            year: newBookYear
          },
          success: function(data) {
            console.log('Success: ', data);
            alert('Success!');
            location.reload();
          },
          error: function(jqXHR, status, err) {
            console.log(bookTitle, bookAuthor, bookGenre, bookYear);
            console.log('Fail: ', jqXHR, status, err);
            alert('Status: ' + status + '\nError: ' + err);
          }
        });
        return false;
      });
    } else if (document.getElementById('putButton_' + bookId).innerText === 'Close form') {
      document.getElementById('putButton_' + bookId).innerText='Replace';
      try {
        element.removeChild(element.childNodes[0]);
        formOpen = false;
      } catch (e) {
        console.log('form already open');
      }
    }
  });
}

function patchBook(bookId) {
  console.log('Patch book: ' + bookId);
  const element = document.getElementById('p_' + bookId);
  $.get('http://localhost:8000/api/v1/books/' + bookId, function(res) {
    const bookTitle = res.title;
    const bookAuthor = res.author;
    const bookGenre = res.genre;
    const bookYear = res.year;
    console.log(bookTitle);
    const patchFormHTML = $('<form id="patchForm_' + bookId + '">\n' +
      '            <label for="bookTitle">Book title:</label>\n' +
      '            <input type="text" id="bookTitle_' + bookId + '" name="bookTitle" value="' + bookTitle + '"><br>\n' +
      '            <label for="bookAuthor">Book author:</label>\n' +
      '            <input type="text" id="bookAuthor_' + bookId + '" name="bookAuthor" value="' + bookAuthor + '"><br>\n' +
      '            <label for="bookGenre">Book genre:</label>\n' +
      '            <input type="text" id="bookGenre_' + bookId + '" name="bookGenre" value="' + bookGenre + '"><br>\n' +
      '            <label for="bookYear">Published (Year):</label>\n' +
      '            <input type="number" id="bookYear_' + bookId + '" name="bookYear" value="' + bookYear + '"><br>\n' +
      '            <button type="submit" name="submit" id="submit">Patch book</button>\n' +
      '            <button type="reset" value="Reset">Reset form</button>\n' +
      '        </form>');
    if (element.childNodes.length < 1 && !formOpen) {
      formOpen = true;
      patchFormHTML.appendTo('#' + element.id);
      document.getElementById('patchButton_' + bookId).innerText='Close form';
      const formElement = document.getElementById('patchForm_' + bookId);
      $('#' + formElement.id).on('submit', function() {
        console.log('Patch start');
        // patchData ei toimi
        let patchData = '';
        const newBookTitle = $('#bookTitle_' + bookId).val();
        const newBookAuthor = $('#bookAuthor_' + bookId).val();
        const newBookGenre = $('#bookGenre_' + bookId).val();
        const newBookYear = Number($('#bookYear_' + bookId).val());
        if (newBookTitle !== bookTitle) {
          patchData += 'title: ' + newBookTitle + ',';
        }
        if (newBookAuthor !== bookAuthor) {
          patchData += 'author: ' + newBookAuthor + ',';
        }
        if (newBookGenre !== bookGenre) {
          patchData += 'genre: ' + newBookGenre + ',';
        }
        if (newBookYear !== bookYear) {
          patchData += 'year: ' + newBookYear + ',';
        }
        if (patchData === '') {
          alert('Nothing to patch');
          return false;
        }
        console.log(patchData);
        $.ajax({
          url: '/api/v1/books/' + bookId,
          type: 'PATCH',
          data: {
            title: newBookTitle,
            author: newBookAuthor,
            genre: newBookGenre,
            year: newBookYear
          },
          success: function(data) {
            console.log('Success: ', data);
            alert('Success!');
            location.reload();
          },
          error: function(jqXHR, status, err) {
            console.log(bookTitle, bookAuthor, bookGenre, bookYear);
            console.log('Fail: ', jqXHR, status, err);
            alert('Status: ' + status + '\nError: ' + err);
          }
        });
        return false;
      });
    } else if (document.getElementById('patchButton_' + bookId).innerText === 'Close form') {
      document.getElementById('patchButton_' + bookId).innerText='Patch';
      try {
        element.removeChild(element.childNodes[0]);
        formOpen = false;
      } catch (e) {
        console.log('form already open');
      }
    }
  });
}

function deleteBook(bookId) {
  console.log('Delete book: ' + bookId);
  const confirmation = confirm('Delete book: ' + bookId + '?');
  if (confirmation) {
    $.ajax({
      url: '/api/v1/books/' + bookId,
      type: 'DELETE',
      data: {},
      success: function() {
        console.log('Success');
        alert('Success!');
        location.reload();
      },
      error: function(jqXHR, status, err) {
        console.log(bookTitle, bookAuthor, bookGenre, bookYear);
        console.log('Fail: ', jqXHR, status, err);
        alert('Status: ' + status + '\nError: ' + err);
      }
    });
    return false;
  }
}
