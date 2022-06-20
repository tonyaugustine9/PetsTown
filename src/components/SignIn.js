import { Box, Container, Paper } from "@mui/material";
import useInput from "../hooks/use-input";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import React from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const Login = () => {
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

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstNameValue, lastNameValue, emailValue);

    resetFirstName();
    resetLastName();
    resetEmail();
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
                label="Password"
                type="password"
                id="password"
                variant="outlined"
              />
              {emailHasError && (
                <p className="error-text">Please enter a valid password</p>
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
