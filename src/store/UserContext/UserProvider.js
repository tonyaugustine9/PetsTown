import UserContext from "./user-context";
import { useReducer } from "react";
import { defaultUserState } from "../constants";

const userReducer = (state, action) => {
  if (action.type === "LOGIN") {
    console.log("in reducer", action.item.firstName, action.item.password);
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("name", action.item.firstName);
    return {
      firstName: action.item.firstName,
      lastName: action.item.lastName,
      email: action.item.email,
      password: action.item.password,
    };
  }
  if (action.type === "LOGOUT") {
    console.log(" logged out");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    return defaultUserState;
  }
  return defaultUserState;
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  const signInUserHandler = (item) => {
    dispatchUserAction({ type: "LOGIN", item: item });
  };
  const signOutUserHandler = () => {
    dispatchUserAction({ type: "LOGOUT" });
  };
  const userContext = {
    firstName: userState.firstName,
    lastName: userState.lastName,
    email: userState.email,
    password: userState.password,
    signInUser: signInUserHandler,
    signOutUser: signOutUserHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
