import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getMovieGenres } from '../api/tmdb';

const Navbar = () => {
  const activeLinkStyle = { color: '#E50914' };
  const { currentUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false); // Close dropdown after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="flex items-center space-x-8">
      <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">Home</NavLink>
      <NavLink to="/movies" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">Movies</NavLink>
      <NavLink to="/tv-shows" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">TV Shows</NavLink>
      <NavLink to="/search" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">Search</NavLink>
      <div className="relative">
        <button 
          onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none hover:text-primary transition-colors duration-300"
        >
          <span>Genres</span>
          <svg 
            className={`w-4 h-4 transform ${genreDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {genreDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-surface rounded-xl shadow-netflix py-1 z-20 max-h-60 overflow-y-auto">
            {genres.map(genre => (
              <NavLink 
                key={genre.id} 
                to={`/genre/${genre.id}`} 
                onClick={() => setGenreDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-text hover:bg-primary-hover"
              >
                {genre.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      {currentUser && (
        <NavLink to="/watchlist" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">Watchlist</NavLink>
      )}
      {currentUser ? (
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none hover:text-primary transition-colors duration-300"
          >
            <img 
              src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || currentUser.email}&background=random`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden md:inline-block">{currentUser.displayName || currentUser.email}</span>
            <svg 
              className={`w-4 h-4 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-netflix py-1 z-20">
              <div className="block px-4 py-2 text-sm text-text-secondary border-b border-text-dark">
                {currentUser.displayName || currentUser.email}
              </div>
              <NavLink 
                to="/profile" 
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-text hover:bg-primary-hover"
              >
                Profile
              </NavLink>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-hover"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="hover:text-primary transition-colors duration-300">Login</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
