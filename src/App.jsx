import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieList from './components/pages/MovieList/MovieList';
import MovieDetails from './components/pages/MovieDetails/MovieDetails';


const apiKey = '81952f696c48f318693c68c337eba570';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [genres, setGenres] = useState([]);
	const [movies, setMovies] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterOptions, setFilterOptions] = useState(null);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`);
				const data = await response.json();
				setGenres(data.genres);
			} catch (error) {
				console.error('Error fetching genres:', error);
			}
		};

		fetchGenres();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${currentPage}`;

				if (searchQuery) {
					url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ru-RU&query=${searchQuery}&page=${currentPage}`;
				} else if (filterOptions) {
					const { genre, year, rating } = filterOptions;
					url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&page=${currentPage}`;
					if (genre) url += `&with_genres=${genre}`;
					if (year) url += `&year=${year}`;
					if (rating) url += `&vote_average.gte=${rating}`;
				}

				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Ошибка загрузки данных');
				}

				const data = await response.json();
				setMovies(data.results);
				setTotalPages(data.total_pages);
			} catch (error) {
				console.error('Error fetching movies:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchQuery, filterOptions]);

	const handleSearch = (query) => {
		setSearchQuery(query);
		setFilterOptions(null);
		setCurrentPage(1);
	};

	const handleFilter = (options) => {
		setFilterOptions(options);
		setSearchQuery('');
		setCurrentPage(1);
	};

	return (
		<Router>
			<div className="app">
				<Routes>
					<Route
						path="/"
						element={<MovieList movies={movies} handleSearch={handleSearch} handleFilter={handleFilter} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
					/>
					<Route path="/movie/:movieId" element={<MovieDetails />} />
				</Routes>
			</div>
		</Router>
	);
}
