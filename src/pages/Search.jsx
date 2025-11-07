import React, { useState } from 'react';
import { multiSearch } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import MovieDetailsModal from '../components/MovieDetailsModal';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    if (query) {
      setIsLoading(true);
      const data = await multiSearch(query);
      setSearchResults(data.results);
      setIsLoading(false);
    }
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div>
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <MovieGrid movies={searchResults} onMovieClick={handleMediaClick} />
      )}
      {selectedMedia && <MovieDetailsModal movie={selectedMedia} onClose={handleCloseModal} />}
    </div>
  );
};

export default Search;
