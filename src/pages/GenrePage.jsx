import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre, getMovieGenres } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import MovieDetailsModal from '../components/MovieDetailsModal';

const GenrePage = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreName, setGenreName] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const data = await getMovieGenres();
        const genre = data.genres.find(g => g.id === parseInt(genreId));
        if (genre) {
          setGenreName(genre.name);
        } else {
          setGenreName('Unknown Genre');
        }
      } catch (err) {
        console.error("Error fetching genre name:", err);
        setGenreName('Unknown Genre');
      }
    };
    fetchGenreName();
  }, [genreId]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMoviesByGenre(genreId, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch movies for this genre.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [genreId, page]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{genreName} Movies</h1>
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg">Page {page} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-8">No movies found for this genre.</div>
      )}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default GenrePage;