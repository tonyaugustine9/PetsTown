import { Box, Grid, Paper } from "@mui/material";
import useInput from "../../hooks/use-input";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/user-context";
import { useContext } from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.length >= 5;

const Login = () => {
  const ctx = useContext(UserContext);

  const navigate = useNavigate();
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
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
  } = useInput(isPassword);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstNameValue, lastNameValue, emailValue, passwordValue);

    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    ctx.signInUser({
      firstName: firstNameValue,
      lastName: lastNameValue,
      password: passwordValue,
      email: emailValue,
    });
    navigate("/userhome");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        elevation={7}
        sx={{
          width: "750px",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 2rem",
          borderRadius: "0.75rem",
        }}
      >
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={12} xs={12}>
              <TextField
                type="text"
                id="firstname"
                label="First Name"
                value={firstNameValue}
                onChange={firstNameChangeHandler}
                onBlur={firstNameBlurHandler}
                variant="outlined"
                error={firstNameHasError}
                fullWidth
              />
              {firstNameHasError && (
                <p className="error-text">Please enter a first name.</p>
              )}
            </Grid>
            <Grid item lg={6} sm={12} xs={12}>
              <TextField
                type="text"
                id="lastname"
                label="Last Name"
                value={lastNameValue}
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                variant="outlined"
                error={lastNameHasError}
                fullWidth
              />
              {lastNameHasError && (
                <p className="error-text">Please enter a last name.</p>
              )}
            </Grid>
            <Grid item lg={12} sm={6} xs={12}>
              <TextField
                label="Email"
                type="text"
                id="email"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                variant="outlined"
                error={emailHasError}
                fullWidth
              />
              {emailHasError && (
                <p className="error-text">
                  Please enter a valid email address.
                </p>
              )}
            </Grid>
            <Grid item lg={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                id="password"
                variant="outlined"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError}
                fullWidth
              />
              {passwordHasError && (
                <p className="error-text">
                  Password must be longer than five characters
                </p>
              )}
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
              <Button type="submit" variant="contained" disabled={!formIsValid}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
