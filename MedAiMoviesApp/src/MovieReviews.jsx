import React, { useEffect, useState } from 'react';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch(`http://127.0.0.1:8000/api/reviews/?pelicula=${movieId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(movieId);
        console.log(data);
        setReviews(data);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reseñas</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            <h4>{review.usuario.nombre} - {review.fecha_creacion.slice(0, 10)}</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StarRating rating={review.calificacion} />
              <p style={{ marginLeft: '10px' }}>{review.comentario}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay reseñas para esta película.</p>
      )}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index} className={index <= rating ? 'on' : 'off'}>
            <span className="star">&#9733;</span>
          </span>
        );
      })}
    </div>
  );
}

export default MovieReviews;
