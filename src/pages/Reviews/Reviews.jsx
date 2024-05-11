import React, { useState, useEffect } from 'react';
import getMoviesReviews from '../../api/apiMovieReviews';
import { useParams } from 'react-router-dom';
import style from './Reviews.module.css';

export default function Reviews() {
  const [reviewMovie, setReviewMovie] = useState([]);
  const [error, setError] = useState(null);
  const { movie_id } = useParams();

  useEffect(() => {
    const reviewsMovie = async () => {
      try {
        const moviesReviews = await getMoviesReviews(movie_id);
        setReviewMovie(moviesReviews.results);
      } catch (error) {
        setError(error);
      }
    };
    reviewsMovie();
  }, [movie_id]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={style.reviewsContainer}>
      {reviewMovie.map(review => (
        <div key={review.id} className={style.reviewItem}>
          <p className={style.reviewContent}>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
