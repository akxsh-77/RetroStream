
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { WatchlistContext } from '../auth/WatchlistProvider';
import MovieGrid from '../components/MovieGrid';
import MovieDetailsModal from '../components/MovieDetailsModal';

const Watchlist = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { watchlist, loadingWatchlist, removeMovieFromWatchlist } = useContext(WatchlistContext);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    if (!currentUser) {
      // This case should ideally be handled by the UI not rendering the button if not logged in,
      // but as a fallback, we can alert the user.
      alert("Please log in to remove movies from your watchlist.");
      return;
    }
    await removeMovieFromWatchlist(movieId);
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-white text-center text-lg">Please sign in to use Watchlist</p>
      </div>
    );
  }

  if (loadingWatchlist) {
    return <div className="flex justify-center items-center h-screen text-white">Loading Watchlist...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-white text-center text-lg">Your watchlist is empty. Add some movies!</p>
      ) : (
        <MovieGrid movies={watchlist} onRemove={handleRemoveFromWatchlist} isWatchlist={true} onMovieClick={handleMovieClick} />
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default Watchlist;
