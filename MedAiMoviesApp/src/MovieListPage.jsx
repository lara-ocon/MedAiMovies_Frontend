import React, { useEffect, useState } from 'react';
import Movie from './Movie.jsx';
import { useLoaderData } from 'react-router-dom';

function MovieListPage() {
  const movies = useLoaderData();
  const numberMovies = movies.length;
  const maxPage = Math.ceil(numberMovies / 12);
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const selectedMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    setDisplayedMovies(selectedMovies);
  }
  , [movies, currentPage]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > maxPage) {
      return;
    }
    setCurrentPage(newPage);
  }

  return (
    <div className="movies-container">
      {displayedMovies.map((movie, index) => (
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
