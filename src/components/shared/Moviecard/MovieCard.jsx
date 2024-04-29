import classes from './MovieCard.module.css';

export default function MovieCard({ movie }) {
	if (!movie) {
		return <div>No movie data available</div>;
	}

	if (!movie.poster_path) {
		return <div>No poster available for this movie</div>;
	}

	const releaseDate = new Date(movie.release_date);
	const day = releaseDate.getDate();
	const month = releaseDate.getMonth() + 1;
	const year = releaseDate.getFullYear();

	const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

	return (
		<div className={classes.movie__card}>
			<div className={classes.image__container}>
				<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
			</div>
			<div className={classes.title}>
				<h3>{movie.title}</h3>
				<p className={classes.date}>{formattedDate}</p>
			</div>
			<div className={classes.rating}>{movie.vote_average.toFixed(1)}</div>
		</div>
	);
}
