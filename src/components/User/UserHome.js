import React from "react";
import UserResponsiveAppBar from "../ui/UserResponsiveAppBar";
import { Box, Container } from "@mui/material";
// import BasicDrawer from "../ui/BasicDrawer";
import { Outlet } from "react-router-dom";

const UserHome = () => {
  return (
    // // <Box sx={{ display: "flex" }}>
    //   {/* <UserResponsiveAppBar /> */}
    //   {/* <Container
    //     sx={{
    //       marginTop: "70px",
    //       width: "100%",
    //       height: "80vh",
    //     }}
    //   > */}
    <Outlet />
    // {/* </Container> */}
    // </Box>
  );
};

export default UserHome;
