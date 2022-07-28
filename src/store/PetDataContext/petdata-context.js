import React from "react";
const PetDataContext = React.createContext({
  isLoading: "false",
  isError: "false",
  petData: [],
});
export default PetDataContext;
