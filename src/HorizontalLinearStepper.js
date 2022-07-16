import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, TextField } from "@mui/material";
import { ReactComponent as PetsTownLogo } from "./assets/petstownlogo/petstownlogo100.svg";
import { minWidth } from "@mui/system";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const HorizontalLinearStepper = () => {
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
        height: "88vh",
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

          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12}>
              <TextField type="text" label="First Name" fullWidth />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
              <TextField type="text" label="Last Name" fullWidth />
            </Grid>
          </Grid>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default HorizontalLinearStepper;
