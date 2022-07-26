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
  phoneNo: "",
  gender: "",
  dob: "",
  landMark: "",
  signInUser: (item) => {},
  signOutUser: () => {},
  signedIn: false,
  isLoading: false
});
export default UserContext;
