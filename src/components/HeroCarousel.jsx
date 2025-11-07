import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/tmdb';

const HeroCarousel = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRandomPopularMovies = async () => {
      const randomPage = Math.floor(Math.random() * 10) + 1; // Fetch from page 1 to 10
      const data = await getPopularMovies(randomPage);
      setMovies(data.results.slice(0, 5)); // Limit to 5 popular movies for the carousel
    };

    fetchRandomPopularMovies();

    const refreshInterval = setInterval(fetchRandomPopularMovies, 600000); // Refresh every 10 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, [movies]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  if (movies.length === 0) {
    return null; // Or a loading spinner
  }

  const currentMovie = movies[currentIndex];
  const backdropUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="w-full flex-shrink-0 relative bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            onClick={() => onMovieClick(movie)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white w-full md:w-2/3 lg:w-1/2">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg mb-8 line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white text-2xl z-10 hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white text-2xl z-10 hover:bg-opacity-75"
      >
        &#10095;
      </button>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
