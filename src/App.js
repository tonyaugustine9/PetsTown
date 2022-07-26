import "./App.css";
import HomeDrawerAppBar from "./components/ui/HomeDrawerAppBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import UserResponsiveAppBar from "./components/ui/UserResponsiveAppBar";

import UserContext from "./store/UserContext/user-context";

function App() {
  const ctx = useContext(UserContext);
  return (
    <React.Fragment>
      {ctx.signedIn ? <UserResponsiveAppBar /> : <HomeDrawerAppBar />}
      <Box marginTop={10}>
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

export default App;
