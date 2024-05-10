import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getMovieDetailes from '../../api/apiMovieDetails';
import { useParams } from 'react-router-dom';
import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [activeComp, setActiveComp] = useState('');
  const handleComChange = compoonent => {
    setActiveComp(compoonent);
  };
  useEffect(() => {
    const detailsMovie = async () => {
      try {
        const movieDetails = await getMovieDetailes(movieId);
        if (!movieDetails) {
          throw new Error('Filmul nu a fost gasit!');
        }
        setMovies(movieDetails);
      } catch (error) {
        setError(error);
      }
    };
    detailsMovie();
  }, [movieId]);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }
  const { poster_path, title, overview, vote_average, genres } = movie;
  return (
    <div>
      <NavLink to={'/'}>
        <button>Back</button>
      </NavLink>
      <div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt="film"
            width="300px"
            height="400px"
          />
        </div>
        <div>
          <h1>{title}</h1>
          <p>User Score: {vote_average}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres?.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Aditional Information</p>
          <NavLink
            to={`/movies/${movieId}/cast`}
            onClick={() => handleComChange('cast')}
          >
            Cast
                  </NavLink>
                  <NavLink to={`/movies/${movieId}/reviews`} onClick={() => handleComChange('reviews')}>
                      Reviews
                  </NavLink>
              </div>
               {activeComp === 'cast' && <Cast></Cast>}
             {activeComp === 'reviews' && <Reviews></Reviews>}
      </div>
    </div>
  );
}
