import React from 'react';

const MovieCard = ({ movie, onClick, onRemove, isWatchlist }) => {
  const imgUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  const handleRemoveClick = (e) => {
    e.stopPropagation(); // Prevent modal open when clicking remove
    onRemove(movie.id);
  };

  return (
    <div 
      className="bg-surface rounded-xl overflow-hidden shadow-netflix hover:shadow-netflix-light cursor-pointer h-full flex flex-col transform hover:scale-105 transition duration-300" 
      onClick={() => onClick(movie)}
    >
      <img 
        src={imgUrl} 
        alt={movie.title || movie.name} 
        className="w-full h-auto object-cover" 
      />

      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-lg font-bold text-text">
          {movie.title || movie.name}
        </h3>

        {isWatchlist && (
          <button 
            onClick={handleRemoveClick}
            className="mt-2 w-full bg-primary hover:bg-primary-hover text-text font-bold py-1 px-2 rounded text-sm"
          >
            Remove from Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
