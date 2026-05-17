import React, { useState, useEffect, useContext } from "react";
import { addFavouriteMovie, getFavouriteMovies, deleteFavouriteMovies, addWatchlistMovie, getWatchlistMovies, deleteWatchlistMovies } from "../api/tmdb-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([])
  const [myReviews, setMyReviews] = useState({})
  const [watchlist, setWatchlist] = useState([])
  const authContext = useContext(AuthContext);


  useEffect(() => {
    getFavouriteMovies().then(favouriteMovies => {
      setFavorites(favouriteMovies.map((f) => f.movieId));
    });
  }, [authContext.isAuthenticated]);

  useEffect(() => {
    getWatchlistMovies().then(watchlistMovies => {
      setWatchlist(watchlistMovies.map((f) => f.movieId));
    });
  }, [authContext.isAuthenticated]);

  const addToFavorites = async (movie) => {
    if (!favorites.includes(movie.id)) {
      await addFavouriteMovie(movie);
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = async (movie) => {
    await deleteFavouriteMovies(movie.id);
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };
  //console.log(myReviews);

  /* const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)) {
      newWatchlist = [...watchlist, movie.id];
    }
    else {
      newWatchlist = [...watchlist];
    }
    setWatchlist(newWatchlist)
  };
  console.log(watchlist)

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter(
      (mId) => mId !== movie.id
    ))
  }; */

    const addToWatchlist = async (movie) => {
    if (!watchlist.includes(movie.id)) {
      await addWatchlistMovie(movie);
      setWatchlist([...watchlist, movie.id]);
    }
  };

  const removeFromWatchlist = async (movie) => {
    await deleteWatchlistMovies(movie.id);
    setWatchlist(watchlist.filter(
      (mId) => mId !== movie.id
    ))
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchlist,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToWatchlist,
        removeFromWatchlist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
