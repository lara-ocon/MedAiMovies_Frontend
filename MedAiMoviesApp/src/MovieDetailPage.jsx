import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieReviews from './MovieReviews';

function MovieDetailPage() {
  const { movieId } = useParams(); // Obtenemos el parámetro de la URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${movieId}/`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {movie ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 20px 0' }}>{movie.titulo}</h1>
            <p>Director: {movie.director}</p>
            <p>Fecha de estreno: {movie.fecha_estreno}</p>
            <p>Género: {movie.genero}</p>
            <p>País: {movie.pais}</p>
            <p>Duración: {movie.duracion} minutos</p>
            <p>Sinopsis: {movie.sinopsis}</p>
          </div>
          <div style={{ flex: '0 1 300px', minHeight: '100%' }}>
            <img src={movie.poster} alt={movie.titulo} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <MovieReviews movieId={movieId} />
    </div>
  );
}

export default MovieDetailPage;
