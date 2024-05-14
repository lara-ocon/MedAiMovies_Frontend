import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import './templates/MovieDetailPage.css';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const { isLoggedIn, userId } = useAuth();  

  useEffect(() => {
    async function fetchReviews() {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:8000/api/reviews/?pelicula=${movieId}`, { headers });
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Failed to fetch reviews', response.statusText);
      }
    }
    fetchReviews();
  }, [movieId]);

  const addReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };
  console.log('Reviews:', reviews);

  return (
    <div>
      <h3>Reseñas</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div id="review" key={review.id}>
            <h4>{review.usuario_email} - {review.fecha_creacion.slice(0, 10)}</h4>
            <div id="stars-review">
              <StarRating rating={review.calificacion} />
              <p>{review.comentario}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay reseñas para esta película.</p>
      )}
      {isLoggedIn && <ReviewForm movieId={movieId} addReview={addReview} userId={userId} />}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div>
      {[...Array(5)].map((star, index) => (
        <span key={index} className={index < rating ? 'red' : 'black'}>
          <span className="star">&#9733;</span>
        </span>
      ))}
    </div>
  );
}


function ReviewForm({ movieId, addReview, userId }) {
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');

  const handleSubmit = async (event) => {
    console.log('movieId', movieId);
    console.log('userId', userId);
    
    event.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        pelicula: movieId,
        usuario_id: userId,
        calificacion,
        comentario
      })
    });

    if (response.ok) {
      const newReview = await response.json();
      addReview(newReview);
      setComentario(''); 
    } else {
      console.error('Failed to submit review', response.statusText);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='comment'> Comentario:</label>
        <textarea id="comment" value={comentario} onChange={e => setComentario(e.target.value)} />
      </div>
      <label htmlFor='grade'>Calificación:</label>
      <select id="grade" value={calificacion} onChange={e => setCalificacion(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
          ))}
      </select>
      <br />
      <div id="review-button">
        <button type="submit">Enviar Reseña</button>
      </div>
    </form>
  );
}

export default MovieReviews;
