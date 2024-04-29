import { Link } from 'react-router-dom';
import MovieCard from '../../shared/Moviecard/MovieCard';
import SearchBar from '../../features/SearchBar/SearchBar';
import FilterOptions from '../../features/FilterOptions/FilterOptions';
import Pugination from '../../widgets/Pugination/Pugination';
import classes from './MovieList.module.css';

export default function MovieList({ movies, handleSearch, handleFilter, currentPage, totalPages, setCurrentPage }) {
	return (
		<div className={classes['movie-list-container']}>
			<div className={classes['movie-container']}>
				<SearchBar onSearch={handleSearch} />
				<FilterOptions onFilter={handleFilter} />
				<div className={classes['movie-grid']}>
					{movies.map((movie) => (
						<Link key={movie.id} to={`/movie/${movie.id}`} className={classes['movie-card-link']}>
							<MovieCard movie={movie} className={classes['movie-card']} />
						</Link>
					))}
				</div>
			</div>
			<div className={classes['pagination-container']}>
				<Pugination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
			</div>
		</div>
	);
}
