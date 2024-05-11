import React, { useState } from "react";
import getMovieSearch from '../../api/apiMovieSearch';
import { NavLink } from "react-router-dom";
import style from './MovieSearch.module.css';

export default function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const searchMovie = async () => {
        try {
            if (query.trim() !== '') {
                const data = await getMovieSearch(query);
                setMovies(data);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        searchMovie();
    };

    return (
        <div className={style.searchContainer}>
            <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={handleInputChange}
                className={style.searchInput}
            />
            <button onClick={handleSearchClick} className={style.searchButton}>Search</button> 
            
            <ul className={style.movieList}>
                {movies.map(movie => (
                    <NavLink
                  key={movie.id}
                  to={`/movies/${movie.id}`}
                  className={style.movieItem}
              >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="film"
                className={style.moviePoster}
              />
              <p className={style.movieTitle}>{movie.title || 'Title not available'}</p>
           </NavLink>
                ))}
            </ul>
        </div>
    );
}
