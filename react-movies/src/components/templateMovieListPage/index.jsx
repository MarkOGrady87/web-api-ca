import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterBlock from "../filterMovieBlock";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, page, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [sortOption, setSortOption] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");

  let displayedMovies = [...movies]
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return dateFromFilter ? m.release_date >= dateFromFilter : true;
    })
    .filter((m) => {
      return dateToFilter ? m.release_date <= dateToFilter : true;
    })
    .sort((a, b) => {
      if (sortOption === "release_asc") {
        return new Date(a.release_date) - new Date(b.release_date);
      }

      if (sortOption === "release_desc") {
        return new Date(b.release_date) - new Date(a.release_date);
      }

      if (sortOption === "popularity_asc") {
        return a.vote_average - b.vote_average;
      }

      if (sortOption === "popularity_desc") {
        return b.vote_average - a.vote_average;
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "dateFrom") setDateFromFilter(value);
    else if (type === "dateTo") setDateToFilter(value);
  };

  return (
    <>
      <Grid container >
        <Grid size={12}>
          <Header title={title} />
        </Grid>
        <Grid size={12}>
          <Grid container justifyContent={"center"}>
            <Grid
              key="find"
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 10 }}
              sx={{ mt: 1 }}
            >
              <FilterBlock
                onUserInput={handleChange}
                titleFilter={nameFilter}
                genreFilter={genreFilter}
                sortOption={sortOption}
                dateFromFilter={dateFromFilter}
                dateToFilter={dateToFilter}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={10}
          page={page}
          onChange={onPageChange}
          showFirstButton
          showLastButton
        />
      </Grid>
    </>
  );
}
export default MovieListPageTemplate;
