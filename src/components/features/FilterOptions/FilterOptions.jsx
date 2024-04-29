import { useState } from 'react';
import classes from './FilterOptions.module.css';
import Button from '../../shared/Button/Button';

export default function FilterOptions({ onFilter }) {
	const [genre, setGenre] = useState('');
	const [rating, setRating] = useState('');

	const handleGenreChange = (event) => {
		setGenre(event.target.value);
	};

	const handleRatingChange = (event) => {
		setRating(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onFilter({ genre, rating });
	};

	return (
		<form className={classes.formContainer} onSubmit={handleSubmit}>
			<label className={classes.label}>
				Жанр:
				<select className={classes.select} value={genre} onChange={handleGenreChange}>
					<option value="">Выберите жанр</option>
					<option value="28">Боевик</option>
					<option value="878">Фантастика</option>
					<option value="35">Комедия</option>
					<option value="27">Ужасы</option>
					<option value="18">Драма</option>
					<option value="10749">Мелодрама</option>
					<option value="53">Триллер</option>
					<option value="16">Мультфильм</option>
					<option value="14">Фэнтези</option>
					<option value="12">Приключения</option>
					<option value="36">Исторический</option>
					<option value="10751">Семейный</option>
					<option value="10752">Военный</option>
				</select>
			</label>
			<label className={classes.label}>
				Рейтинг: 
				<select className={classes.select} value={rating} onChange={handleRatingChange}>
					<option value="">Выберите рейтинг</option>
					{[...Array(11).keys()].map((ratingValue) => (
						<option key={ratingValue} value={ratingValue}>
							{ratingValue} и выше
						</option>
					))}
				</select>
			</label>
			<Button>
				Применить фильтр
			</Button>
		</form>
	);
}
