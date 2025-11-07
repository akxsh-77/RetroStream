import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from './AuthProvider';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { currentUser, loading, isInitialAuthCheckComplete } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);

  useEffect(() => {
    let unsubscribe;

    // Only proceed if AuthProvider has finished loading the auth state
    if (isInitialAuthCheckComplete) {
      if (currentUser) {
        setLoadingWatchlist(true);
        const userWatchlistRef = collection(db, "users", currentUser.uid, "watchlist");

        unsubscribe = onSnapshot(userWatchlistRef, (querySnapshot) => {
          const movies = querySnapshot.docs.map((docSnap) => ({
            id: Number(docSnap.id),
            ...docSnap.data()
          }));
          setWatchlist(movies);
          setLoadingWatchlist(false);
        });
      } else {
        // User is logged out, clear watchlist
        setWatchlist([]);
        setLoadingWatchlist(false);
      }
    } else {
      // If initial auth check is not complete, ensure watchlist is empty and loading
      setWatchlist([]);
      setLoadingWatchlist(true); // Keep loading until auth check is complete
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser, isInitialAuthCheckComplete]);

  const isMovieInWatchlist = (movieId) =>
    watchlist.some(movie => Number(movie.id) === Number(movieId));

  const addMovieToWatchlist = async (movie) => {
    if (!currentUser) return;
    const movieRef = doc(db, "users", currentUser.uid, "watchlist", String(movie.id));
    await setDoc(movieRef, {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      release_date: movie.release_date || movie.first_air_date,
      vote_average: movie.vote_average,
      media_type: movie.media_type || (movie.title ? "movie" : "tv"),
    });
  };

  const removeMovieFromWatchlist = async (movieId) => {
    if (!currentUser) return;
    const movieRef = doc(db, "users", currentUser.uid, "watchlist", String(movieId));
    await deleteDoc(movieRef);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      loadingWatchlist,
      isMovieInWatchlist,
      addMovieToWatchlist,
      removeMovieFromWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};
