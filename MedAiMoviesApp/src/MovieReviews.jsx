import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

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
          <div key={review.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            <h4>{review.usuario_email} - {review.fecha_creacion.slice(0, 10)}</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StarRating rating={review.calificacion} />
              <p style={{ marginLeft: '10px' }}>{review.comentario}</p>
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
        <span key={index} className={index <= rating ? 'on' : 'off'}>
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
      <label>
        Calificación:
        <select value={calificacion} onChange={e => setCalificacion(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <label>
        Comentario:
        <textarea value={comentario} onChange={e => setComentario(e.target.value)} />
      </label>
      <button type="submit">Enviar Reseña</button>
    </form>
  );
}

export default MovieReviews;
