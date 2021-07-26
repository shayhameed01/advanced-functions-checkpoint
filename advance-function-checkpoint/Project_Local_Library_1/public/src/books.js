const {findAccountById} = require('./accounts');


function findAuthorById(authors, id) {
	return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
	return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const isThere = books.filter((book) => book.borrows[0].returned);
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  return [borrowed, isThere];
}

function getBorrowersForBook(book, accounts) {
  const allBorrowers = book.borrows.map((lend) => {
    const account = findAccountById(accounts, lend.id);
    return {
      id: lend.id, 
      returned: lend.returned, 
      ...account
    };
  });

  while(allBorrowers.length > 10) {
    allBorrowers.pop();
  }
  return allBorrowers;
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
