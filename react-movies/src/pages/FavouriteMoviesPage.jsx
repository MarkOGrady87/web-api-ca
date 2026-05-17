import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getMovie, getFavouriteMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
const FavoriteMoviesPage = () => {
  const { data: favourites = [], isPending, } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavouriteMovies,
    refetchOnMount: true,
    staleTime: 0,
  });

  const movieIds = favourites.map((f) => f.movieId);

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  const moviesPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending || moviesPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default FavoriteMoviesPage;
