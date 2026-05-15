import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const StartPage = () => {
  
    return (
        <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
        </p>
    );
  };

export default StartPage;