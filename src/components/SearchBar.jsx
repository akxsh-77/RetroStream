import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto">
      <input 
        type="text" 
        placeholder="Search for a movie or TV show..." 
        value={query}
        onChange={handleInputChange}
        className="bg-surface text-text px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary w-full transition-all duration-300"
      />
      <button type="submit" className="bg-primary text-text px-6 py-2 rounded-r-full hover:bg-primary-hover transition-colors duration-300">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
