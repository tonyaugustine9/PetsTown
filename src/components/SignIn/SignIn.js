import { Box, Grid, Paper, Typography } from "@mui/material";
import useInput from "../../hooks/use-input";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PetsTownLogo } from "../../assets/petstownlogo/petstownlogo100.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LinearProgress from "@mui/material/LinearProgress";

import UserContext from "../../store/UserContext/user-context";
 import { useContext } from "react";
// import HorizontalLinearStepper from "../../HorizontalLinearStepper";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.length >= 5;

const Login = () => {
   const ctx = useContext(UserContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    setIsError(false);

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...

        const fetchUserDoc = async () => {
          const docRef = doc(
            database,
            "userdata",
            user.uid,
            "personalinfo",
            "data"
          );

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setIsLoading(false);
            setIsError(false);
            ctx.signInUser(docSnap.data())
            // console.log(JSON.stringify(docSnap.data()));
          } else {
            // doc.data() will be undefined in this case
            setIsLoading(false);
            setIsError(true);
            console.log("No such document!");
          }
        };
        fetchUserDoc();
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log("error");
      });

    // resetEmail();
    // resetPassword();
    // ctx.signInUser({
    //   firstName: firstNameValue,
    //   lastName: lastNameValue,
    //   password: passwordValue,
    //   email: emailValue,
    // });
    // navigate("/userhome");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        spacing: "5px",
      }}
    >
      <Box sx={{ minWidth: "400px" }}>
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Paper
          elevation={7}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 2rem",
            borderRadius: "0.75rem",
            justifyContent: "center",
            rowGap: "15px",
          }}
        >
          <Box sx={{ margin: "auto" }}>
            <PetsTownLogo />
          </Box>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item lg={12} sm={12} xs={12}>
                <TextField
                  label="Email"
                  type="text"
                  id="email"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  variant="outlined"
                  error={emailHasError || isError}
                  fullWidth
                />
                {emailHasError && (
                  <p className="error-text">
                    Please enter a valid email address.
                  </p>
                )}
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  error={passwordHasError || isError}
                  fullWidth
                />
                {passwordHasError && (
                  <p className="error-text">Password field must not be empty</p>
                )}
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                {isError && (
                  <Box>
                    <Typography>Invalid Credentials</Typography>
                  </Box>
                )}
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    width: "100%",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    // disabled={!formIsValid}
                  >
                    SIGN IN
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
