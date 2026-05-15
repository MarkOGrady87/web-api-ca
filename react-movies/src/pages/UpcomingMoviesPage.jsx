import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchclist";
const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const watchlists = movies.filter((m) => m.watchlist);
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  const addToWatchlist = (movieId) => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie-={movie}/>
          </>
        );
      }}
    />
  );
};
export default UpcomingMoviesPage;
