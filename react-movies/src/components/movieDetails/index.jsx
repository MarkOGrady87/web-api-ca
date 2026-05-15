import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieCredits from "../movieCredits";
import SimilarMovies from "../similarMovies";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  boxShadow: "none",
  margin: 0,
  backgroundColor: "#010b19",
  color: "white",
};
const chip = {
  margin: 0.5,
  color: "white",
  backgroundColor: "#010b19",
  "& .MuiChip-icon": {
    color: "white",
  },
};

const MovieDetails = ({ movie }) => {
  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={{ ...chip }} />
        <Chip icon={<FormatQuoteIcon />} label={`${movie.tagline}`} sx={{ ...chip }} />
        <Chip icon={<ThumbUpAltIcon />} label={`${Math.round(movie.popularity * 10) / 10}`} sx={{ ...chip }} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={{ ...chip }}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={{ ...chip }}
        />
        <Chip label={`Released: ${movie.release_date}`} sx={{ ...chip }} />
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Companies" color="primary" />
        </li>
        {movie.production_companies.map((p) => (
          <li key={p.name}>
            <Chip label={p.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" color="primary" />
        </li>
        {movie.production_countries.map((p) => (
          <li key={p.name}>
            <Chip label={p.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
      <MovieCredits movie={movie} />
      <SimilarMovies movie={movie} />
    </>
  );
};
export default MovieDetails;
