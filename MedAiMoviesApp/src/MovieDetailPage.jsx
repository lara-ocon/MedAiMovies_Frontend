import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import MovieReviews from './MovieReviews';

function MovieDetailPage() {
  const movie = useLoaderData(); // Obtiene los datos de la película del loader
  const navigate = useNavigate();

  const reloadMovieDetails = () => {
    // Forzamos la recarga una vez se hace una review para mostar bien la nota
    navigate('/movie/' + movie.id);
  }

  return (
  <div id="movie-detail-container">
    {movie ? (
      <div id="movie-detail">
        <div id="movie-text">
          <h1>{movie.titulo}</h1>
          <br></br>
          <div id="movie-info">
            <p>{movie.director} · {movie.fecha_estreno} · {movie.pais}</p>
            <br></br>
            <div id="sinopsis">
              <p>{movie.sinopsis}</p>
            </div>
            <br></br>
            <p>{movie.genero} · {movie.duracion} min</p>
            <br></br>
            <p>
            {movie.nota}/5
              <span className="stars">
                {[...Array(5)].map((star, index) => (
                  <span key={index} className={index < Math.round(movie.nota) ? 'red' : 'black'}>
                    <span className="star">&#9733;</span>
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
        <div id="movie-image-container">
          <img id="movie-image" src={movie.poster} alt={movie.titulo} />
        </div>
      </div>
    ) : (
      <p>Cargando...</p>
    )}
    <MovieReviews movieId={movie.id} triggerReload={reloadMovieDetails} />
  </div>

  );
}

export default MovieDetailPage;
