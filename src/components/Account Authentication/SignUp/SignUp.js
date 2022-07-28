import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Container,
  formGroupClasses,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { ReactComponent as PetsTownLogo } from "../../../assets/petstownlogo/petstownlogo100.svg";
import { minWidth } from "@mui/system";
import AuthCredentials from "./AuthCredentials";
import UserInfo from "./UserInfo";
import AddressInfo from "./AddressInfo";
import AccountCreated from "./AccountCreated";
import { doc, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../../firebaseConfig";

const steps = [
  "Authentication Credentials",
  "User Info",
  "Address Info",
  "Finished",
];

const SignUp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValid, setFormValid] = React.useState(false);
  const [nextClicked, setNextClicked] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const navigate = useNavigate();
  const handleFinished = () => {
    navigate("/signin");
  };

  const submissionHandler = () => {
    setIsError(false);
    setIsLoading(true);
    console.log(userData);
    console.log(" data ");
    // ctx.addData(userData);
    console.log("sending data to firebase");

    // const timer = setTimeout(() => {
    //   console.log("in timeout");
    //   // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setFormValid(true);
    // setIsLoading(false);
    //   // setIsError(false);
    // }, 5000);
    // console.log("out timeout");
    // clearTimeout(timer);
    createUserWithEmailAndPassword(
      auth,
      userData.emailValue,
      userData.passwordValue
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        console.log(userCredential.user);
        updateProfile(user, {
          displayName: `${userData.firstNameValue} ${userData.lastNameValue}`,
        })
          .then(() => {
            setDoc(doc(database, "userdata", uid), {
              data: "data",
            });
            setDoc(doc(database, "userdata", uid, "personalinfo", "data"), {
              phoneno: userData.phoneNoValue,
              city: userData.cityValue,
              state: userData.stateValue,
              pin: userData.pinValue,
              landmark: userData.landMarkValue,
              gender: userData.genderValue,
              dob: userData.dobValue,
              country: userData.countryValue,
              lastname: userData.lastNameValue,
              firstname: userData.firstNameValue,
              email: userData.emailValue,
              uid:uid
            })
              .then(() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setFormValid(true);
                setIsLoading(false);
                setIsError(false);
                console.log("doc added");
              })
              .catch(() => {
                setIsLoading(false);
                setIsError(true);
                console.log("error adding doc");
              });
          })
          .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error");
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setFormValid(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormValid(false);
  };

  const formValidCheckHandler = React.useCallback((item) => {
    setFormValid(item);
  }, []);

  const dataChangeHandler = React.useCallback((data) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...data }));
  }, []);

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

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <AuthCredentials
              onFormValidCheck={formValidCheckHandler}
              onDataChange={dataChangeHandler}
            />
          )}
          {activeStep === 1 && (
            <UserInfo
              onFormValidCheck={formValidCheckHandler}
              onDataChange={dataChangeHandler}
            />
          )}
          {activeStep === 2 && (
            <AddressInfo
              onFormValidCheck={formValidCheckHandler}
              onDataChange={dataChangeHandler}
            />
          )}
          {activeStep === 3 && (
            <AccountCreated onFormValidCheck={formValidCheckHandler} />
          )}

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {!(activeStep === steps.length - 1) && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0 || isLoading}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />

                {activeStep <= 1 && (
                  <Button onClick={handleNext} disabled={!formValid}>
                    Next
                  </Button>
                )}
                {activeStep === 3 && (
                  <Button onClick={handleFinished}>Continue to Login</Button>
                )}
                {activeStep === 2 && (
                  <Button
                    onClick={submissionHandler}
                    disabled={!formValid || isLoading}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
