import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router";

export default function ActorCard({ actor }) {

  return (
    <Card sx={{
      backgroundColor: "secondary.main", transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 6,
      },
    }}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {actor.name}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" color="primary">
              {actor.known_for
                ?.map((item) => item.title || item.name)
                .join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>

        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>

      </CardActions>
    </Card>
  );
}
