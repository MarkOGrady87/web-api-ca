import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';
import Typography from "@mui/material/Typography";
import { Grid, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const register = async () => {
    let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);
    if (!validPassword) {
      setErrorMessage("Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (password !== passwordAgain) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setErrorMessage("");
      let result = await context.register(userName, password);
      setRegistered(result);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (registered === true) {
    return <Navigate to="/login" />;
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
      {/*       <h2>SignUp page</h2>
      <p>You must register a username and password to log in. Usernames must be unique and passwords must contain a minimum of 8 characters (with at least one uppercase letter, one lowercase letter, and one symbol). </p>
      <input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <button onClick={register}>Register</button> */}

      <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant={"h2"} textAlign={"center"} margin={5}>
          Sign Up
        </Typography>

        <Typography textAlign={"center"}>
          You must register a username and password to log in.
        </Typography>

        <Typography component={"div"} marginTop={5} textAlign={"center"} width={"350px"}>
          <div>Usernames</div>
          <ul style={{
            display: "inline-block",
            textAlign: "left",
            paddingLeft: "20px"
          }}>
            <li>Must be Unique</li>
            <li>Start with a capital letter</li>
            <li>At least 4 characters in length</li>
          </ul>
        </Typography>
        <TextField
          sx={styles.textField}
          label="Username"
          variant="outlined"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <Typography component={"div"} marginTop={3} textAlign={"center"} width={"350px"}>
          <div>Passwords:</div>
          <ul style={{
            display: "inline-block",
            textAlign: "left",
            paddingLeft: "20px"
          }}>
            <li>Must be Unique</li>
            <li>At least 8 characters</li>
            <li>One special charcater</li>
            <li>At least one upper case letter</li>
            <li>At least one number</li>

          </ul>
        </Typography>
        <TextField
          sx={styles.textField}
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          sx={{ ...styles.textField, mt: 2 }}
          label="Password Again"
          type="password"
          variant="outlined"
          required
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={register}
          sx={{
            mt: 2,
            width: "200px",
            borderRadius: 2,
            fontSize: "1rem",
          }}
        >
          Register
        </Button>
      </Grid>
    </>
  );
};

export default SignUpPage;
