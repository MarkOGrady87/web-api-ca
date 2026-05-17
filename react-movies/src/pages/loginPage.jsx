import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import { Grid, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const login = async () => {
        try {
            setErrorMessage("")
            await context.authenticate(userName, password);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    let location = useLocation();

    const from = "/movies/discover/1";

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    const styles = {
        textField: {

            "& .MuiInputLabel-root": {
                color: "#00ACC1",
            },

            "& .MuiInputBase-input": {
                color: "#00ACC1",
            },

            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#00ACC1",
                },
                "&:hover fieldset": {
                    borderColor: "#00ACC1",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#00ACC1",
                },
            },
        },
    }

    return (
        <>

            <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"}>
                <Typography variant={"h2"} textAlign={"center"} margin={5}>
                    Log In
                </Typography>

                <Typography textAlign={"center"}>
                    You must log in to gain access to awesome movies
                </Typography>

                <TextField
                    sx={{...styles.textField, margin: 2}}
                    label="Username"
                    variant="outlined"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    sx={{...styles.textField, margin: 2}}
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                )}
                <Button
                    variant="outlined"
                    onClick={login}
                    sx={{
                        mt: 2,
                        width: "200px",
                        borderRadius: 2,
                        fontSize: "1rem",
                    }}
                >
                    Log in
                </Button>
            </Grid>
        </>
    );
};

export default LoginPage;
