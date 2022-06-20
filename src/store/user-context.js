import React from "react";
const UserContext = React.createContext({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  signInUser: (item) => {},
  signOutUser: () => {},
});
export default UserContext;
