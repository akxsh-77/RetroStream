import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Search from './pages/Search';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import GenrePage from './pages/GenrePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv-shows" element={<TvShows />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="genre/:genreId" element={<GenrePage />} />
        <Route path="watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
