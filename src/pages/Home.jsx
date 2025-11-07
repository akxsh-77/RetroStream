import React, { useState, useEffect, useContext } from 'react';
import { getPopularMovies, getLatestMovies, getPopularTvShows, getLatestTvShows } from '../api/tmdb';
import MovieRow from '../components/MovieRow';
import MovieDetailsModal from '../components/MovieDetailsModal';
import HeroCarousel from '../components/HeroCarousel';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const [popularMoviesData, latestMoviesData, popularTvShowsData, latestTvShowsData] = await Promise.all([
        getPopularMovies(),
        getLatestMovies(),
        getPopularTvShows(),
        getLatestTvShows(),
      ]);
      setPopularMovies(popularMoviesData.results);
      setLatestMovies(latestMoviesData.results);
      setPopularTvShows(popularTvShowsData.results);
      setLatestTvShows(latestTvShowsData.results);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
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
      <HeroCarousel onMovieClick={handleMovieClick} />
      <MovieRow title="Popular Movies" movies={popularMovies} onMovieClick={handleMovieClick} />
      <MovieRow title="Latest Movies" movies={latestMovies} onMovieClick={handleMovieClick} />
      <MovieRow title="Popular TV Shows" movies={popularTvShows} onMovieClick={handleMovieClick} />
      <MovieRow title="Latest TV Shows" movies={latestTvShows} onMovieClick={handleMovieClick} />
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />}
      <footer className="bg-surface text-text-secondary text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} RetroStream. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
