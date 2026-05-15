import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getActorCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: 2,
  boxShadow: "none",
  margin: 1.5,
  backgroundColor: "#010b19",
};

export default function ActorCredits({ actor }) {
  const navigate = useNavigate();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: actor.id }],
    queryFn: getActorCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const credits = data.cast;
  return (
    <>
      <Typography variant="h5" component="h3" sx={{ backgroundColor: "#010b19", color: "white" }}>
        Filmography
      </Typography>

      <Paper sx={root}>
        {credits.map((c) => (
          <Card key={c.credit_id} sx={{
            width: 220, margin: 1, transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            }
          }
          } onClick={() => navigate(`/movies/${c.id}`)}>
            <CardMedia
              component="img"
              height="320"
              image={`https://image.tmdb.org/t/p/w500${c.poster_path}`}
              alt={c.title}
            />

            <CardContent>
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {c.character}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </>
  );
}
