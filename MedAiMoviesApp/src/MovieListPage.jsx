import React, { useEffect, useState } from 'react';
import Movie from './Movie.jsx'; // Importar el componente Movie

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual

  const totalMoviesPerPage = 12; // Número total de películas por página

  useEffect(() => {
    async function fetchMovies() {
      let loadedMovies = [];
      let currentId = (currentPage - 1) * totalMoviesPerPage;
      console.log("Fetching currentpage" + currentPage + "...")
      currentId = ((currentId) % 20);

      while (loadedMovies.length < totalMoviesPerPage) {
        console.log("Fetching " + currentId + "...")
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${currentId+1}/`);
        if (!response.ok) continue;
        const data = await response.json();
        loadedMovies.push(data);
        currentId = ((currentId + 1) % 20); // Simular que solo hay 3 películas en la API
      }
      setMovies(loadedMovies);
    }

    fetchMovies();
  }, [currentPage, totalMoviesPerPage]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div className="movies-container">
      {movies.map((movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
      <div className="page-filter">
        <PageFilter currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

function PageFilter({ currentPage, onPageChange }) {
  function handlePrevPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    onPageChange(currentPage + 1);
  }

  return (
    <div className="page-filter">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage}>&gt;</button>
    </div>
  );
}

export default MovieListPage;
