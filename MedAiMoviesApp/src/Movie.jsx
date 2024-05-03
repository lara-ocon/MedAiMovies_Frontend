import React from 'react';
import { Link } from 'react-router-dom';
import './templates/movie.css';

function Movie({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="movie">
            <img src={movie.poster} alt={movie.titulo} />
            <h3>{movie.titulo}<br />{movie.fecha_estreno.split('-')[0]}</h3>
        </Link>
    );
}

export default Movie;
