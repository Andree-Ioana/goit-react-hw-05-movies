import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getMovieDetails from '../../api/apiMovieDetails';
import { useParams } from 'react-router-dom';
import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';
import style from './MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [activeComp, setActiveComp] = useState('');

  const handleCompChange = (component) => {
    setActiveComp(component);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        if (!movieDetails) {
          throw new Error('Movie not found!');
        }
        setMovie(movieDetails);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { poster_path, title, overview, vote_average, genres } = movie;

  return (
    <div className={style.movieDetailsContainer}>
      <div className={style.moviePoster}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt="film"
          width="300px"
          height="400px"
        />
      </div>
      <div className={style.movieInfo}>
        <h1>{title}</h1>
        <p>User Score: {vote_average}</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul>
          {genres?.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div className={style.additionalInfo}>
          <p>Additional Information</p>
          <NavLink
            to={`/movies/${movieId}/cast`}
            onClick={() => handleCompChange('cast')}
            className={style.link}
          >
            Cast
          </NavLink>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            onClick={() => handleCompChange('reviews')}
            className={style.link}
          >
            Reviews
          </NavLink>
        </div>
      </div>
      {activeComp === 'cast' && <Cast />}
      {activeComp === 'reviews' && <Reviews />}
    </div>
  );
}
