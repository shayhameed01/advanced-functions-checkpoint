const {findAuthorById} = require('./books');

function deleteExtraObjects(arr, num) {
  while(arr.length > num) {
    arr.pop();
  }
}

function createObject(name, count) {
  return {
    name: name,
    count: count
  }
};


function getTotalBooksCount(books) {
	return books.length;
}

function getTotalAccountsCount(account) {
	return account.length;
}

function getBooksBorrowedCount(books) {
	let numberOfBookBorrowed = 0;
	books.forEach((book) => {
			if(!book.borrows[0].returned) numberOfBookBorrowed++
	})
	return numberOfBookBorrowed
}

function getMostCommonGenres(books) {
  const genres = [];

  books.forEach((book) => {
    const genreName = book.genre;
    
    let found = false;
    genres.forEach((genre) => {
      if(genre.name === genreName) {
        genre.count++;
        found = true;
        return;
      }
    });
	  
    if(!found) {
      genres.push(createObject(genreName, 1));
    }
  });
	
  genres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));
  deleteExtraObjects(genres, 5);

  return genres;
}





function getMostPopularBooks(books) {
  const popularBooks = [];
  books.forEach((book) => {
    popularBooks.push(createObject(book.title, book.borrows.length));
  });

  popularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  deleteExtraObjects(popularBooks, 5);

  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];
  books.forEach((book) => {
    let authorName = findAuthorById(authors, book.authorId).name;
    const numBorrows = book.borrows.length;

    let found = false;
    popularAuthors.forEach((author) => {
      if(author.name === authorName) {
        author.count += numBorrows;
        found = true;
        return;
      }
    });

    if(!found) {
      popularAuthors.push(
        createObject(authorName.first + " " + authorName.last, numBorrows));
    }
  });

  popularAuthors.sort((authorA, authorB) => 
    (authorA.count > authorB.count ? -1 : 1));
  deleteExtraObjects(popularAuthors, 5);

  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
