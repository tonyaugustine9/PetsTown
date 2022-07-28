import React from "react";
const UserContext = React.createContext({
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  state: "",
  country: "",
  pin: "",
  phoneNo: "",
  gender: "",
  dob: "",
  landMark: "",
  uid:"",
  signInUser: (item) => {},
  signOutUser: () => {},
  setLoading: (item) => {},
  signedIn: false,
  isLoading: false,
  isError: false,
});
export default UserContext;
