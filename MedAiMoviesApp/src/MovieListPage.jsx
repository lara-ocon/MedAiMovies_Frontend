import React, { useEffect, useState } from 'react';

function Movie({ movie }) {
  return (
    <div style={{ flex: '1 1 30%', margin: '10px', textAlign: 'center' }}>
      <img src={movie.poster} alt={movie.titulo} style={{ width: '100%', height: 'auto' }} />
      <h3>{movie.titulo}</h3>
      <p>{movie.fecha_estreno.split('-')[0]}</p>
    </div>
  );
}

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual

  const totalMoviesPerPage = 12; // Número total de películas por página

  // Forma 1 (bucle con % 3)
  useEffect(() => {
    async function fetchMovies() {
      let loadedMovies = [];
      let currentId = (currentPage - 1) * totalMoviesPerPage + 1; // Calcular el ID inicial basado en la página actual
      currentId = ((currentId + 1) % 3) +1;
      while (loadedMovies.length < totalMoviesPerPage) {
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${currentId}/`);
        if (!response.ok) continue;
        const data = await response.json();
        console.log(data);
        loadedMovies.push(data);
        currentId = ((currentId + 1) % 3) +1; // Simular que solo hay 3 películas en la API
      }
      setMovies(loadedMovies);
    }

    fetchMovies();
  }, [currentPage, totalMoviesPerPage]);
  // Forma 2: (mostrar hasta que falle 1 respuesta)
  /*
  useEffect(() => {
    async function fetchMovies() {
        let loadedMovies = [];
        let currentId = (currentPage - 1) * totalMoviesPerPage + 1; // Calcular el ID inicial basado en la página actual

        while (true) {
            const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${currentId}/`);
            if (!response.ok) break; // Si la respuesta no es exitosa, salimos del bucle
            const data = await response.json();
            loadedMovies.push(data);
            currentId++; // Incrementamos el ID para la próxima llamada
        }
        setMovies(loadedMovies);
    }

    fetchMovies();
}, [currentPage, totalMoviesPerPage]);
*/

function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {movies.map((movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
