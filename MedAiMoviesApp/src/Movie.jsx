import React from 'react';
import { Link } from 'react-router-dom';
import './templates/movie.css';

function Movie({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="movie">
            <img src={movie.poster} alt={movie.titulo} />
            <h3>{movie.titulo}</h3>
            <h4>{movie.fecha_estreno.split('-')[0]}</h4>
            {/* Ponemos parte de la sinopsis para que no ocupe tanto espacio en la lista de películas */}
            {/*<p>{movie.sinopsis.slice(0, 110)}...</p>*/}
        </Link>
    );
}

export default Movie;
