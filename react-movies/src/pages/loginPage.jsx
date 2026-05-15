import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import Typography from "@mui/material/Typography";

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

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/movies/discover/1" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            <input id="username" placeholder="user name" onChange={e => {
                setUserName(e.target.value);
            }}></input><br />
            <input id="password" type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }}></input><br />
            {errorMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
            )}
            {/* Login web form  */}
            <button onClick={login}>Log in</button>
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;
