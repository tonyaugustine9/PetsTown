import React from "react";
const SignUpContext = React.createContext({
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
  addData: (item) => {},
  signUp:()=>{}
  //   signInUser: (item) => {},
  //   signOutUser: () => {},
});
export default SignUpContext;
