function findAccountById(accounts, id) {
	return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
	return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) 
{
	let result = 0;
	return books.reduce((acc,book) => {
		let borrowed = 0;
		acc += book.borrows.reduce((borrows,borrow) => borrows += borrow.id === account.id ? 1 : 0, borrowed)
		return acc
	}, result)
}

function getBooksPossessedByAccount(account, books, authors) {
	const borrows = books.filter((book) => book.borrows[0].id === account.id);
	return borrows.map((borrow) => {
		const author = authors.find((author) => author.id === borrow.authorId)
		return {
	id: borrow.id,
			title: borrow.title,
			genre: borrow.genre,
			authorId: borrow.authorId,
			author: author,
			borrows: borrow.borrows
		}
	})
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
