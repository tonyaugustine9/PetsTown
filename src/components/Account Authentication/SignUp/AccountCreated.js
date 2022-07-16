import { Box, Grid, Typography } from "@mui/material";

const AccountCreated = () => {
  return (
    <Box>
      <Grid containter spacing={2}>
        <Grid item>
          <Typography>Account Created</Typography>
          <Typography>You can now login</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountCreated;
