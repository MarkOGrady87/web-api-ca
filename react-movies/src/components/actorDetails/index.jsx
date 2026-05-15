import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ActorCredits from "../actorCredits";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  boxShadow: "none",
  margin: 0,
  backgroundColor: "#010b19",
};
const chip = { margin: 0.5, color: "white" };

const ActorDetails = ({ actor }) => {

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ backgroundColor: "#010b19", color: "white" }}>
        Overview
      </Typography>
      <Typography variant="h6" component="p" sx={{ backgroundColor: "#010b19", color: "white" }}>
        {actor.biography}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Birthday" sx={{ ...chip }} color="primary" />
        </li>
        <li key={actor.name}>
          <Chip label={actor.birthday} sx={{ ...chip }} />
        </li>
        <li>
          <Chip label="Place of Birth" sx={{ ...chip }} color="primary" />
        </li>
        <li key={actor.name}>
          <Chip label={actor.place_of_birth} sx={{ ...chip }} />
        </li>
      </Paper>

      <ActorCredits actor={actor} />
    </>
  );
};
export default ActorDetails;
