import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, TextField } from "@mui/material";
import { ReactComponent as PetsTownLogo } from "../../../assets/petstownlogo/petstownlogo100.svg";
import { minWidth } from "@mui/system";
import AuthCredentials from "./AuthCredentials";
import UserInfo from "./UserInfo";
import AddressInfo from "./AddressInfo";
import AccountCreated from "./AccountCreated";

const steps = [
  "Authentication Credentials",
  "User Info",
  "Address Info",
  "Finished",
];

const SignUp = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            <PetsTownLogo next />
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
          {activeStep === 0 && <AuthCredentials />}
          {activeStep === 1 && <UserInfo />}
          {activeStep === 2 && <AddressInfo />}
          {activeStep === 3 && <AccountCreated />}

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
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1
                    ? "Continue to Login"
                    : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
