import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SimilarMovies from '../../widgets/SimilarMovies/SimilarMovies';
import classes from './MovieDetails.module.css';

export default function MovieDetails() {
	const apiKey = '81952f696c48f318693c68c337eba570';
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [trailerKey, setTrailerKey] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ru-RU`);
				const data = await response.json();
				setMovie(data);
				const trailerKey = await fetchTrailerKey(movieId);
				setTrailerKey(trailerKey);
			} catch (error) {
				console.error('Error fetching movie:', error);
			}
		};

		fetchMovie();
	}, [movieId]);

	async function fetchTrailerKey(movieId) {
		const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ru-RU`;
		const response = await fetch(url);
		const data = await response.json();
		const officialTrailer = data.results.find((video) => video.type === 'Trailer');
		if (officialTrailer) {
			return officialTrailer.key;
		} else {
			return null;
		}
	}

	function getTrailerUrl(trailerKey) {
		if (trailerKey) {
			return `https://www.youtube.com/watch?v=${trailerKey}`;
		} else {
			return null;
		}
	}

	const openTrailerFullscreen = () => {
		if (trailerKey) {
			window.open(getTrailerUrl(trailerKey), '_blank');
		}
	};

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className={classes.movie__page}>
				<div className={classes.movie__details}>
					<div className={classes.img__container} onClick={openTrailerFullscreen}>
						<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
						<button className={classes.watch__trailer__button} onClick={openTrailerFullscreen}>
							Смотреть трейлер
						</button>
					</div>

					<div className={classes.movie__details__info}>
						<h1>{movie.title}</h1>
						<p>{movie.overview}</p>
						<p>
							<span className={classes.bold}>Длительность:</span> {movie.runtime} минут
						</p>
						<p>
							<span className={classes.bold}>Жанр:</span> {movie.genres.map((genre) => genre.name).join(', ')}
						</p>
						<p>
							<span className={classes.bold}>Рейтинг:</span> {movie.vote_average}
						</p>
					</div>
				</div>
			</div>
			<SimilarMovies movieId={movieId}/>
		</>
	);
}
