import React from "react";
const PetDataContext = React.createContext({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  signInUser: (item) => {},
  signOutUser: () => {},
});
export default UserContext;