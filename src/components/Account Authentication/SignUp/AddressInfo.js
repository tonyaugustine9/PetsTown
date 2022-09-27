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
import Autocomplete from "@mui/material/Autocomplete";
import cities from "./constants/cities";
import countries from "./constants/countries";
import states from "./constants/states";

const isNotEmpty = (value) => value.trim() !== "";
const isPin = (value) => value.length === 6;
const isLandMark = (value) => true;

const AddressInfo = (props) => {
  const {
    value: landMarkValue,
    isValid: landMarkIsValid,
    hasError: landMarkHasError,
    valueChangeHandler: landMarkChangeHandler,
    inputBlurHandler: landMarkBlurHandler,
    reset: resetlandMark,
  } = useInput(isLandMark);

  const [countryValue, setCountryValue] = React.useState(countries[103]);

  const [cityValue, setCityValue] = React.useState(null);
  const [stateValue, setStateValue] = React.useState(states[12]);

  const cityChangeHandler = (event, value) => {
    setCityValue(value);
  };

  const countryChangeHandler = (event, value) => {
    setCountryValue(value);
  };
  const stateChangeHandler = (event, value) => {
    setStateValue(value);
  };

  const {
    value: pinValue,
    isValid: pinIsValid,
    hasError: pinHasError,
    valueChangeHandler: pinChangeHandler,
    inputBlurHandler: pinBlurHandler,
    reset: resetPIN,
  } = useInput(isPin);

  const addressData = useMemo(
    () => ({ pinValue, cityValue, stateValue, countryValue, landMarkValue }),
    [pinValue, cityValue, stateValue, countryValue, landMarkValue]
  );

  useEffect(() => {
    props.onFormValidCheck(pinIsValid && landMarkIsValid && cityValue !== null);
  }, [pinIsValid, landMarkIsValid, cityValue]);

  useEffect(() => {
    props.onDataChange(addressData);
  }, [addressData]);

  //   if (firstNameIsValid && lastNameIsValid && phoneNoIsValid) {
  //     formIsValid = true;
  //   }
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
          <Grid item lg={4} sm={4} xs={6}>
            <Autocomplete
              id="country"
              size="small"
              fullWidth
              onChange={countryChangeHandler}
              options={countries}
              value={countryValue}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="Country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          <Grid item lg={4} sm={4} xs={6}>
            <Autocomplete
              disablePortal
              id="state"
              fullWidth
              size="small"
              value={stateValue}
              onChange={stateChangeHandler}
              options={states}
              renderInput={(params) => (
                <TextField size="small" {...params} label="State" />
              )}
            />
          </Grid>
          <Grid item lg={4} sm={4} xs={6}>
            <Autocomplete
              disablePortal
              id="city"
              fullWidth
              size="small"
              value={cityValue}
              onChange={cityChangeHandler}
              options={cities}
              renderInput={(params) => (
                <TextField size="small" {...params} label="City" />
              )}
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              id="landmark"
              label="Landmark"
              multiline
              rows={4}
              value={landMarkValue}
              variant="outlined"
              onChange={landMarkChangeHandler}
              onBlur={landMarkBlurHandler}
              type="text"
              size="small"
              fullWidth
            />
            {landMarkHasError && (
              <p className="error-text">Please enter a valid address</p>
            )}
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              type="number"
              id="pin"
              label="PIN Code"
              value={pinValue}
              onChange={pinChangeHandler}
              onBlur={pinBlurHandler}
              variant="outlined"
              error={pinHasError}
              size="small"
              fullWidth
            />
            {pinHasError && <p className="error-text">Not a valid pincode</p>}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressInfo;
