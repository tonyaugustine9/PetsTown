import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import useInput from "../../../hooks/use-input";
import React, { useEffect, useMemo } from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isPhoneNo = (value) => value.length === 10;

const UserInfo = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const [genderValue, setGenderValue] = React.useState("");
  const [dobValue, setDOBValue] = React.useState("2000-01-01");

  const genderChangeHandler = (event) => {
    setGenderValue(event.target.value);
  };

  const dobChangeHandler = (event) => {
    setDOBValue(event.target.value);
  };

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: phoneNoValue,
    isValid: phoneNoIsValid,
    hasError: phoneNoHasError,
    valueChangeHandler: phoneNoChangeHandler,
    inputBlurHandler: phoneNoBlurHandler,
    reset: resetPhoneNo,
  } = useInput(isPhoneNo);

  const userInfoData = useMemo(
    () => ({
      firstNameValue,
      lastNameValue,
      phoneNoValue,
      genderValue,
      dobValue,
    }),
    [firstNameValue, lastNameValue, phoneNoValue, genderValue, dobValue]
  );

  let formIsValid = false;
  useEffect(() => {
    props.onFormValidCheck(
      firstNameIsValid &&
        lastNameIsValid &&
        phoneNoIsValid &&
        genderValue !== ""
    );
  }, [firstNameIsValid, lastNameIsValid, phoneNoIsValid, genderValue]);

  useEffect(() => {
    props.onDataChange(userInfoData);
  }, [userInfoData]);
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
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              type="text"
              id="firstname"
              label="First Name"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              variant="outlined"
              error={firstNameHasError}
              size="small"
              fullWidth
            />
            {firstNameHasError && (
              <p className="error-text">Please enter a first name.</p>
            )}
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              type="text"
              id="lastname"
              label="Last Name"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              variant="outlined"
              error={lastNameHasError}
              size="small"
              fullWidth
            />
            {lastNameHasError && (
              <p className="error-text">Please enter a last name.</p>
            )}
          </Grid>
          <Grid item lg={4} sm={4} xs={6}>
            <TextField
              type="text"
              id="phoneno"
              label="Phone Number"
              value={phoneNoValue}
              onChange={phoneNoChangeHandler}
              onBlur={phoneNoBlurHandler}
              variant="outlined"
              error={phoneNoHasError}
              size="small"
              fullWidth
            />
            {phoneNoHasError && (
              <p className="error-text">Please enter a 10 digit Phone No</p>
            )}
          </Grid>

          <Grid item lg={4} sm={4} xs={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={genderValue}
                  label="Gender"
                  onChange={genderChangeHandler}
                  size="small"
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} xs={6}>
            <TextField
              id="dob"
              label="Date Of Birth"
              value={dobValue}
              onChange={dobChangeHandler}
              type="date"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserInfo;
