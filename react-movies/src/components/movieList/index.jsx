import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const MovieList = (props) => {
  if (props.movies.length === 0) {
    return (
      <Grid
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "grey" }}>
          No movies found
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {props.movies.map((m) => (
        <Grid
          key={m.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ margin: 1 }}
        >
          <Movie movie={m} action={props.action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
