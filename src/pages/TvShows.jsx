import React, { useState, useEffect } from 'react';
import { getPopularTvShows } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import MovieDetailsModal from '../components/MovieDetailsModal';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [selectedTvShow, setSelectedTvShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTvShows = async () => {
      setIsLoading(true);
      const data = await getPopularTvShows(page);
      setTvShows(data.results);
      setIsLoading(false);
    };

    fetchTvShows();
  }, [page]);

  const handleTvShowClick = (tvShow) => {
    setSelectedTvShow(tvShow);
  };

  const handleCloseModal = () => {
    setSelectedTvShow(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white p-4">Popular TV Shows</h1>
      <MovieGrid movies={tvShows} onMovieClick={handleTvShowClick} />
      {selectedTvShow && <MovieDetailsModal movie={selectedTvShow} onClose={handleCloseModal} />}

      <div className="flex justify-center items-center space-x-4 mt-6 mb-8">
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded text-text"
        >
          Previous
        </button>

        <span className="text-text-secondary">Page {page}</span>

        <button 
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-primary hover:bg-primary-hover rounded text-text"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TvShows;
