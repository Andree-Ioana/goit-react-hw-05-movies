import React, { useEffect, useState } from 'react';
import getMovieCast from '../../api/apiCast';
import { useParams } from 'react-router-dom';

export default function Cast() {
  const { movie_id } = useParams();
  const [castMovie, setCastMovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const castMovie = async () => {
      try {
        const movieCast = await getMovieCast();
        setCastMovie(movieCast.cast);
      } catch (error) {
        setError(error);
      }
    };
    castMovie();
  }, [movie_id]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

    return (
        <div>
            <ul>
                {castMovie.map(actor => (
                    <li key={actor.id}>
                         <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} height='200px' width='200px'
                alt={`${actor.name} profile`}
                        />
                        <div>
                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
