import React, { useEffect, useState } from 'react';
import getMoviesTrading from '../../api/api';

import { NavLink } from 'react-router-dom';
import style from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  //definim efectul ca sa obtinem datele la montarea componentei
  useEffect(() => {
    const fetchData = async () => {
      try {
        //apelam functia ca sa obtinem datele
        const data = await getMoviesTrading();
        console.log(data);
        //actualizam starea movies cu noile date primite de la api
        setMovies(data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  console.log(movies);

  return (
  <div className={style.homeContainer}>
    {error ? (
      <p>Error: {error.message}</p>
    ) : (
      <div className={style.movieContainer}>
        <h2 className={style.trending}>Trending today</h2>
        <div className={style.movieList}>
          {movies.map(movie => (
              <NavLink
                  key={movie.id}
                  to={`/movies/${movie.id}`}
              >
                   <div key={movie.id} className={style.movieItem}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="film"
                width="300px"
                height="400px"
              />
              <p className={style.movieTitle}>{movie.title || 'Title not available'}</p>
            </div>
           </NavLink>
          ))}
        </div>
      </div>
    )}
  </div>
);



}
