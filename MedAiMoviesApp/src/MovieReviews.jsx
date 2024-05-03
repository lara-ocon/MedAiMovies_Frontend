import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const { isLoggedIn } = useAuth(); // Para poder hacer reviews o no

  useEffect(() => {
    /* //Forma 1
    async function fetchReviews() {
      const response = await fetch(`http://127.0.0.1:8000/api/reviews/?pelicula=${movieId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(movieId);
        console.log(data);
        setReviews(data);
      }
    }
    */
    //Forma 2
    async function fetchReviews() {
        const token = localStorage.getItem('token');  // Asegúrate de que el token está siendo guardado en localStorage cuando el usuario inicia sesión
        console.log("Token:", token);
        const headers = {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        };
        const response = await fetch(`http://127.0.0.1:8000/api/reviews/?pelicula=${movieId}`, { headers });
        console.log("Response:", response);
        if (response.ok) {
          const data = await response.json();
          console.log("Reviews fetched for movie ID:", movieId, data);  // Agregar logs puede ayudar a depurar
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews', response);
        }
    }
    fetchReviews();
  }, [movieId]);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

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
      {isLoggedIn && <ReviewForm movieId={movieId} addReview={addReview} />}
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

function ReviewForm({ movieId, addReview }) {
    const [calificacion, setCalificacion] = useState(5);
    const [comentario, setComentario] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          pelicula: movieId,
          calificacion,
          comentario
        })
      });
  
      if (response.ok) {
        const newReview = await response.json();
        addReview(newReview);  // Función para actualizar la lista de reseñas
      } else {
        console.log(response);
        console.log('cookies en review form:', document.cookie);
        console.error('Failed to submit review');
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
