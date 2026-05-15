import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import { Grid, Typography } from "@mui/material";

const StartPage = () => {

    return (
        <>
            <Grid container>
                <Grid size={12} justifyContent={"center"} display={"flex"} mt={5}>
                    <Typography variant="h2">Welcome</Typography>
                </Grid>
                <Grid size={12} justifyContent={"center"} display={"flex"} mt={12}>
                    <Typography variant="h5">
                        Welcome to the TMDB Client application, your place to discover movies,
                        explore actor profiles, browse reviews and keep track of your favourite films.
                        Search through popular, top rated and upcoming movies while building your own personalised watchlist.
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default StartPage;