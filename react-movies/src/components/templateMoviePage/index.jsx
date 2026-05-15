import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { Box } from "@mui/material";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["images", { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const image = data.backdrops[0];

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#010b19",
          color: "white",
          pb: 4,
        }}
      >
        <MovieHeader movie={movie} />

        <Grid container spacing={2} style={{ padding: "10px" }}>
          <Grid size={{ xs: 12 }}>
            {image && (
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 220, sm: 300, md: 420 },
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${image.file_path})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center ",
                  backgroundRepeat: "no-repeat",
                  mb: 2,
                }}
              />
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>{children}</Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TemplateMoviePage;
