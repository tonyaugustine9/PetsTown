// import { Box } from "@mui/material";
import PetDataProvider from "../../store/PetDataContext/PetDataProvider";
import React from "react";
import { Outlet } from "react-router-dom";
import BrowsePets from "./BrowsePets";

const BuyPets = () => {
  return (
    <PetDataProvider>
      <Outlet />
      {/* <BrowsePets /> */}
    </PetDataProvider>
  );
};

export default BuyPets;
