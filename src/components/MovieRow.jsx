import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 p-4">
        {movies.map(movie => (
          <div key={movie.id} className="flex-shrink-0 w-48">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
