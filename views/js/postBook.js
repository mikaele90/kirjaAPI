$('#postForm').on('submit', function() {
  const bookTitle = $('#bookTitle').val();
  const bookAuthor = $('#bookAuthor').val();
  const bookGenre = $('#bookGenre').val();
  const bookYear = $('#bookYear').val();
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
  return false;
});
