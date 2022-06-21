import { Box, Container, Paper } from "@mui/material";
import useInput from "../hooks/use-input";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
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

  const firstNameClasses = firstNameHasError
    ? {
        error: "null",
      }
    : {};

  const lastNameClasses = lastNameHasError
    ? {
        error: "null",
      }
    : {};
  const passwordClasses = passwordHasError
    ? {
        error: "null",
      }
    : {};
  const emailClasses = emailHasError
    ? {
        error: "null",
      }
    : {};

  return (
    <Container>
      <Paper>
        <Box
          elevation={7}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form onSubmit={submitHandler}>
            <Box marginTop={5}>
              <TextField
                {...firstNameClasses}
                type="text"
                id="firstname"
                label="First Name"
                value={firstNameValue}
                onChange={firstNameChangeHandler}
                onBlur={firstNameBlurHandler}
                variant="outlined"
              />
              {firstNameHasError && (
                <p className="error-text">Please enter a first name.</p>
              )}
            </Box>
            <Box marginTop={2}>
              <TextField
                {...lastNameClasses}
                type="text"
                id="lastname"
                label="Last Name"
                value={lastNameValue}
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                variant="outlined"
              />
              {lastNameHasError && (
                <p className="error-text">Please enter a last name.</p>
              )}
            </Box>
            <Box marginY={2}>
              <TextField
                {...emailClasses}
                label="Email"
                type="text"
                id="email"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                variant="outlined"
              />
              {emailHasError && (
                <p className="error-text">
                  Please enter a valid email address.
                </p>
              )}
            </Box>
            <Box marginY={2}>
              <TextField
                {...passwordClasses}
                label="Password"
                type="password"
                id="password"
                variant="outlined"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              {passwordHasError && (
                <p className="error-text">
                  Password must be longer than five characters
                </p>
              )}
            </Box>

            <Box marginY={2}>
              <Button type="submit" variant="contained" disabled={!formIsValid}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
