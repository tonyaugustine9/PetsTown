import { Box, Grid, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import useInput from "../../../hooks/use-input";
import SignUpContext from "./store/signUp-context";

const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.length >= 6;

const AuthCredentials = (props) => {
  const ctx = useContext(SignUpContext);
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

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPassword,
  } = useInput((value) => value === passwordValue);

  const authData = useMemo(
    () => ({ passwordValue, emailValue }),
    [passwordValue, emailValue]
  );
  useEffect(() => {
    props.onFormValidCheck(
      emailIsValid && passwordIsValid && confirmPasswordIsValid
    );
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  useEffect(() => {
    props.onDataChange(authData);
  }, [authData]);

  //   const submitHandler = (event) => {
  //     event.preventDefault();

  //     if (!formIsValid) {
  //       return;
  //     }

  //     console.log("Submitted!");
  //     console.log(firstNameValue, lastNameValue, emailValue, passwordValue);

  //     resetFirstName();
  //     resetLastName();
  //     resetEmail();
  //     resetPassword();
  //     ctx.signInUser({
  //       firstName: firstNameValue,
  //       lastName: lastNameValue,
  //       password: passwordValue,
  //       email: emailValue,
  //     });
  //     navigate("/userhome");
  //   };

  return (
    <Box>
      <form /*onSubmit={submitHandler}*/>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} xs={12}>
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
              size="small"
            />
            {emailHasError && (
              <p className="error-text">Please enter a valid email address.</p>
            )}
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
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
              size="small"
            />
            {passwordHasError && (
              <p className="error-text">
                Password must be longer than six characters
              </p>
            )}
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              variant="outlined"
              value={confirmPasswordValue}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              error={confirmPasswordHasError}
              fullWidth
              size="small"
            />
            {confirmPasswordHasError && (
              <p className="error-text">Passwords dont match. Try again</p>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AuthCredentials;
