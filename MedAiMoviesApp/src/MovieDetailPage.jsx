import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieReviews from './MovieReviews';

function MovieDetailPage() {
  const { movieId } = useParams(); // Obtenemos el parámetro de la URL
  const [movie, setMovie] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false); // Agregar estado para recargar la página

  const triggerReload = () => setReloadTrigger(!reloadTrigger); // Se debe cambiar el estado para que se ejecute el useEffect

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${movieId}/`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    }
    fetchMovie();
  }, [movieId, reloadTrigger]); // si cambia movieId o reloadTrigger, se ejecuta el efecto

  return (
    <div id="movie-detail-container">
      {movie ? (
        <div id="movie-detail" >
          <div id="movie-text">
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 20px 0' }}>{movie.titulo}</h1>
            <p id="director">Director: {movie.director}</p>
            <p id="fecha">Fecha de estreno: {movie.fecha_estreno}</p>
            <p id="genero">Género: {movie.genero}</p>
            <p id="pais">País: {movie.pais}</p>
            <p id="duracion">Duración: {movie.duracion} minutos</p>
            <p id="nota">Nota: {movie.nota}/5</p>
            <p id="sinopsis">Sinopsis: {movie.sinopsis}</p>
          </div>
          <div id="movie-image-container">
            <img id="movie-image" src={movie.poster} alt={movie.titulo}/>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <MovieReviews movieId={movieId} triggerReload={triggerReload} />
    </div>
  );
}

export default MovieDetailPage;
