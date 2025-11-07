import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onMovieClick, onRemove, isWatchlist }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
      {movies.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No movies found. Try another search!
        </div>
      ) : (
        movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={onMovieClick} 
            onRemove={onRemove} 
            isWatchlist={isWatchlist} 
          />
        ))
      )}
    </div>
  );
};

export default MovieGrid;
