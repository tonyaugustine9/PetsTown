import "./App.css";
import React from "react";
import HomeDrawerAppBar from "./components/ui/HomeDrawerAppBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function App() {
  return (
    <React.Fragment>
      <HomeDrawerAppBar />
      <Box marginTop={10}>
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

export default App;
