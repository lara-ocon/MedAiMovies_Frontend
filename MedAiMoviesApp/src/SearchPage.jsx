import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Movie from './Movie.jsx'; // Importa el componente reutilizable

export default function SearchPage() {
    
    const movies = useLoaderData();

    return (
        <div className="movies-container">
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
