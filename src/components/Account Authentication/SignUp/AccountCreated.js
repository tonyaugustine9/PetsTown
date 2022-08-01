import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

const AccountCreated = (props) => {
  useEffect(() => {
    props.onFormValidCheck(true);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "400px",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Account Created</Typography>
      <Typography>You can now continue browsing</Typography>
    </Box>
  );
};

export default AccountCreated;
