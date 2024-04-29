import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../shared/Moviecard/MovieCard';
import classes from './SimilarMovies.module.css';
import Button from '../../shared/Button/Button';

export default function SimilarMovies({ movieId }) {
	const apiKey = '81952f696c48f318693c68c337eba570';
	const [similarMovies, setSimilarMovies] = useState([]);
	const [carouselPosition, setCarouselPosition] = useState(0);

	useEffect(() => {
		const fetchSimilarMovies = async () => {
			try {
				const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=ru-RU`);
				const data = await response.json();
				setSimilarMovies(data.results);
			} catch (error) {
				console.error('Error fetching similar movies:', error);
			}
		};

		fetchSimilarMovies();
	}, [movieId]);

	const handleCarouselScroll = (direction) => {
		const container = document.getElementById('similar-movies-container');
		if (container) {
			const scrollDistance = direction === 'left' ? -200 : 200;
			container.scrollBy({
				left: scrollDistance,
				behavior: 'smooth',
			});
			setCarouselPosition((prevPosition) => prevPosition + scrollDistance);
		}
	};

	return (
		<div className={classes.similar__movies__carousel}>
			{similarMovies.length > 0 && <p className={classes.similar__label}>Похожие фильмы</p>}
			<div className={classes.carousel__controls}>
				<button className={classes.carousel__button} onClick={() => handleCarouselScroll('left')}>
					{'<'}
				</button>
				<button className={classes.carousel__button} onClick={() => handleCarouselScroll('right')}>
					{'>'}
				</button>
			</div>
			<div className={classes.similar__movies__container} id="similar-movies-container">
				<div className={classes.similar__movies}>
					{similarMovies.map((similarMovie) => (
						<Link key={similarMovie.id} to={`/movie/${similarMovie.id}`} style={{ textDecoration: 'none' }}>
							<div className={classes.movie__card__container}>
								<MovieCard movie={similarMovie} />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
