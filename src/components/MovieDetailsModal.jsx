import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { WatchlistContext } from '../auth/WatchlistProvider';
import { getMovieTrailer } from '../api/tmdb';

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const { currentUser } = useContext(AuthContext);
  const { isMovieInWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(WatchlistContext);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const isAdded = isMovieInWatchlist(movie.id);

  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        const videos = await getMovieTrailer(movie.id);
        const trailer = videos.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
        setShowTrailer(false); // Reset trailer visibility when movie changes
      }
    };
    fetchTrailer();
  }, [movie?.id]);

  const handleAddToWatchlist = async () => {
    if (!currentUser) {
      setShowSignInPopup(true);
      return;
    }

    if (isAdded) {
      await removeMovieFromWatchlist(movie.id);
    } else {
      await addMovieToWatchlist(movie);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-surface rounded-xl shadow-netflix max-w-3xl w-full mx-4 my-8 overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div className="relative">
                      <button 
                      onClick={onClose} 
                      className="absolute top-4 right-4 text-text text-3xl font-bold hover:text-text-secondary transition-colors duration-300"
                    >            &times;
          </button>
          <div className="md:flex">
            <img src={imgUrl} alt={movie.title || movie.name} className="w-full md:w-1/3 h-auto object-cover rounded-l-lg" />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-text">{movie.title || movie.name}</h2>
              <p className="text-text-secondary mb-4">{movie.release_date || movie.first_air_date}</p>
              <p className="text-lg mb-4 text-text">{movie.overview}</p>
              <p className="text-text"><span className="font-bold">Rating:</span> {movie.vote_average} / 10</p>
              {trailerKey && (
                <button 
                  onClick={() => setShowTrailer(!showTrailer)}
                  className="mt-4 mr-2 font-bold py-2 px-4 rounded bg-primary hover:bg-primary-hover text-text flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                  Watch Trailer
                </button>
              )}
              {isAdded ? (
                <button 
                  onClick={handleAddToWatchlist}
                  className="mt-4 font-bold py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 text-white text-sm"
                >
                  Added to Watchlist ✅
                </button>
              ) : (
                <button 
                  onClick={handleAddToWatchlist}
                  className="mt-4 font-bold py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Add to Watchlist
                </button>
              )}
              {showTrailer && trailerKey && (
                <iframe 
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  className="w-full h-64 md:h-80 rounded-lg mt-4"
                  allowFullScreen
                  title="Movie Trailer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showSignInPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-xl shadow-netflix text-center">
            <p className="text-text text-xl mb-4">Please Sign in to add movies to your watchlist.</p>
            <button 
              onClick={() => setShowSignInPopup(false)} 
              className="bg-primary hover:bg-primary-hover text-text font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsModal;
