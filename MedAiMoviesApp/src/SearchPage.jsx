import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Movie from './Movie.jsx'; // Importa el componente reutilizable

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('q');
    const type = searchParams.get('t');

    useEffect(() => {
        async function fetchMovies() {
            let url = 'http://127.0.0.1:8000/api/peliculas/';
            //url += `search/?q=${encodeURIComponent(query)}&t=${encodeURIComponent(type)}`;
            url += `search/?${encodeURIComponent(type)}=${encodeURIComponent(query)}`;

            /* Se deberia hacer asi pero en el backend ya controlamos 
            // que si no hay query se devuelven todas las peliculas
            if (query) {
                url += `search/?q=${encodeURIComponent(query)}`;
            }
            */
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setMovies(data);
            }
        }
        fetchMovies();
    }, [query]);

    return (
        <div className="movies-container">
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
