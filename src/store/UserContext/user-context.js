import React from "react";
const UserContext = React.createContext({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  city: "",
  state: "",
  country: "",
  pin: "",
  phoneno: "",
  gender: "",
  dob: "",
  landmark: "",
  signInUser: (item) => {},
  signOutUser: () => {},
});
export default UserContext;
