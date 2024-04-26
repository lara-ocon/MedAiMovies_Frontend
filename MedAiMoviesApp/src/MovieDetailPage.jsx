import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Fecha de estreno:</strong> {movie.fecha_estreno}</p>
            <p><strong>Género:</strong> {movie.genero}</p>
            <p><strong>País:</strong> {movie.pais}</p>
            <p><strong>Duración:</strong> {movie.duracion} minutos</p>
            <h3>Sinopsis</h3>
            <p>{movie.sinopsis}</p>
          </div>
          <div style={{ flex: '0 1 300px', minHeight: '100%' }}>
            <img src={movie.poster} alt={movie.titulo} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default MovieDetailPage;
