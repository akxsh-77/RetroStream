const API_KEY = '9744f3a751083623003c4487c571f763';
const API_BASE = 'https://api.themoviedb.org/3';

const fetchFromAPI = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  const res = await fetch(url);
  return res.json();
};

export const getPopularMovies = (page = 1) => fetchFromAPI('/movie/popular', { page });
export const getLatestMovies = () => fetchFromAPI('/movie/now_playing');
export const getPopularTvShows = (page = 1) => fetchFromAPI('/tv/popular', { page });
export const getLatestTvShows = () => fetchFromAPI('/tv/on_the_air');
export const searchMovies = (query) => fetchFromAPI('/search/movie', { query });
export const multiSearch = (query) => fetchFromAPI('/search/multi', { query });

export const getMovieDetails = (id) => fetchFromAPI(`/movie/${id}`);
export const getTvShowDetails = (id) => fetchFromAPI(`/tv/${id}`);

export const getMovieGenres = () => fetchFromAPI('/genre/movie/list');
export const getMoviesByGenre = (genreId, page = 1) => fetchFromAPI('/discover/movie', { with_genres: genreId, page });

export const getMovieTrailer = async (id) => {
  const data = await fetchFromAPI(`/movie/${id}/videos`);
  return data.results;
};
