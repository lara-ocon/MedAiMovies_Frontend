import React from 'react';
import { Link } from 'react-router-dom';
import './movie.css';

function Movie({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="movie">
            <img src={movie.poster} alt={movie.titulo} />
            <h3>{movie.titulo}</h3>
            <p>{movie.fecha_estreno.split('-')[0]}</p>
        </Link>
    );
}

export default Movie;
