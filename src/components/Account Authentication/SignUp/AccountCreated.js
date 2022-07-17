import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

const AccountCreated = (props) => {
  useEffect(() => {
    props.onFormValidCheck(true);
  }, []);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Account Created</Typography>
          <Typography>You can now login</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountCreated;
