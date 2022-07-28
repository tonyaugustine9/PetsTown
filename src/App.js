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
      {/* {ctx.signedIn ? <UserResponsiveAppBar /> : <HomeDrawerAppBar />} */}
      <UserResponsiveAppBar />

      <Box width="100%" marginTop="64px" /*marginLeft={1}*/>
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

export default App;
