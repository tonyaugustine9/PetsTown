import { useCallback, useMemo, useReducer } from "react";
import SignUpContext from "./signUp-context";
import { auth } from "../../../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const defaultSignUpState = {
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
};

const signUpReducer = (state, action) => {
  //   if (action.type === "LOGIN") {
  //     console.log("in reducer", action.item.firstName, action.item.password);
  //     localStorage.setItem("isLoggedIn", "1");
  //     localStorage.setItem("name", action.item.firstName);
  //     return {
  //       firstName: action.item.firstName,
  //       lastName: action.item.lastName,
  //       email: action.item.email,
  //       password: action.item.password,
  //     };
  //   }
  //   if (action.type === "LOGOUT") {
  //     console.log(" logged out");
  //     localStorage.removeItem("isLoggedIn");
  //     localStorage.removeItem("name");
  //     return defaultUserState;
  //   }

  if (action.type === "ADDDATA") {
    console.log("added data to context", action.item);
    return action.item;
  }
  if (action.type === "SIGNUP") {
    console.log("sending data to firebase");
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  }

  return defaultSignUpState;
};

const SignUpProvider = (props) => {
  const [signUpState, dispatchSignUpAction] = useReducer(
    signUpReducer,
    defaultSignUpState
  );
  //   const signInUserHandler = (item) => {
  //     dispatchUserAction({ type: "LOGIN", item: item });
  //   };
  //   const signOutUserHandler = () => {
  //     dispatchUserAction({ type: "LOGOUT" });
  //   };

  const addDataHandler = useCallback((item) => {
    dispatchSignUpAction({ type: "ADDDATA", item: item });
  }, []);
  const signUpHandler = useCallback(() => {
    dispatchSignUpAction({ type: "SIGNUP" });
  }, []);

  const signUpContext = useMemo(
    () => ({
      // firstName: userState.firstName,
      // lastName: userState.lastName,
      // email: userState.email,
      // password: userState.password,
      firstName: signUpState.firstName,
      lastName: signUpState.lastName,
      password: signUpState.password,
      email: signUpState.email,
      city: signUpState.city,
      state: signUpState.state,
      country: signUpState.country,
      pin: signUpState.pin,
      phoneno: signUpState.phoneno,
      gender: signUpState.gender,
      dob: signUpState.dob,
      landmark: signUpState.landmark,
      addData: addDataHandler,
      signUp: signUpHandler,
      // signInUser: signInUserHandler,
      // signOutUser: signOutUserHandler,
    }),
    [signUpState, addDataHandler]
  );

  return (
    <SignUpContext.Provider value={signUpContext}>
      {props.children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
