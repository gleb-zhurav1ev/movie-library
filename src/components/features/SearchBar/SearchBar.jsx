import { useState } from 'react';
import Button from '../../shared/Button/Button';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
	const [query, setQuery] = useState('');

	const handleChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit} className={styles['search-bar']}>
			{' '}
			<input type="text" placeholder="Введите название фильма" value={query} onChange={handleChange} className={styles['search-input']} />
			<Button>Поиск</Button>
		</form>
	);
}
