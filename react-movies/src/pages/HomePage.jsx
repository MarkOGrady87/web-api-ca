import React from "react";
import { useParams, useNavigate } from "react-router";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchclist";

const HomePage = (props) => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const currentPage = pageId || 1;
  console.log("currentPage:", currentPage);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", { pageId: currentPage }],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handlePageChange = (event, value) => {
    navigate(`/${value}`);
  };

  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie={movie} />
          </>
        );
      }}
      page={currentPage}
      onPageChange={handlePageChange}
    />
  );
};
export default HomePage;
