import classes from './Pugination.module.css';

const generatePageNumbers = (currentPage, totalPages) => {
	const pageNumbers = [];

	const maxPagesToShow = totalPages > 1000 ? totalPages - 1000 : totalPages;

	if (maxPagesToShow <= 10) {
		for (let i = 1; i <= maxPagesToShow; i++) {
			pageNumbers.push(i);
		}
	} else {
		if (currentPage <= 6) {
			for (let i = 1; i <= 10; i++) {
				pageNumbers.push(i);
			}
			pageNumbers.push('...');
			pageNumbers.push(maxPagesToShow);
		} else {
			pageNumbers.push(1);
			pageNumbers.push('...');
			for (let i = currentPage - 4; i < currentPage; i++) {
				if (i > 1) {
					pageNumbers.push(i);
				}
			}
			pageNumbers.push(currentPage);
			for (let i = currentPage + 1; i <= currentPage + 4; i++) {
				if (i < maxPagesToShow) {
					pageNumbers.push(i);
				}
			}
			pageNumbers.push('...');
			pageNumbers.push(maxPagesToShow);
		}
	}

	return pageNumbers;
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	const pageNumbers = generatePageNumbers(currentPage, totalPages);

	if (totalPages === 1) {
		return null;
	}

	return (
		<div className={classes.pagination}>
			<button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
				Предыдущая
			</button>
			{pageNumbers.map((pageNumber, index) => (
				<button
					key={index}
					className={pageNumber === currentPage ? classes.active : ''}
					disabled={pageNumber === '...'}
					onClick={() => {
						if (pageNumber !== '...') onPageChange(pageNumber);
					}}
				>
					{pageNumber}
				</button>
			))}
			<button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
				Следующая
			</button>
		</div>
	);
}
