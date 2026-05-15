import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";

const ActorList = (props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {props.actors.map((a) => (
        <Grid
          key={a.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ margin: 1 }}
        >
          <Actor actor={a} action={props.action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;
