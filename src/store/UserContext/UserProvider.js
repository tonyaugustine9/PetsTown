import UserContext from "./user-context";
import { useEffect, useMemo, useReducer, useState } from "react";
import { defaultUserState } from "../constants";
import { auth } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const userReducer = (state, action) => {
  // if (action.type === "REFRESH") {
  //   console.log("in refresh reducer");
  //   var userData = { name: "test" };
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log("logged into firebase");

  //       const fetchUserDoc = async () => {
  //         const docRef = doc(
  //           database,
  //           "userdata",
  //           user.uid,
  //           "personalinfo",
  //           "data"
  //         );

  //         const docSnap = await getDoc(docRef);
  //         if (docSnap.exists()) {
  //           // setIsLoading(false);
  //           // setIsError(false);
  //           // ctx.signInUser(docSnap.data());
  //           // const x = docSnap.data().dob;
  //           // console.log(x);
  //           console.log(JSON.stringify(docSnap.data().dob));
  //           return {
  //             name: "test2",
  //             // firsNname: docSnap.data().firstname,
  //             // lastName: docSnap.data().lastname,
  //             // email: docSnap.data().email,
  //             // password: docSnap.data().password,
  //             // dob: docSnap.data().dob,
  //             // state: docSnap.data().state,
  //             // gender: docSnap.data().gender,
  //             // country: docSnap.data().label,
  //             // pin: docSnap.data().pin,
  //             // city: docSnap.data().city,
  //             // landMark: docSnap.data().landmark,
  //             // phoneNo: docSnap.data().phoneNo,
  //             // signedIn: true,
  //           };
  //         } else {
  //           // doc.data() will be undefined in this case
  //           // setIsLoading(false);
  //           // setIsError(true);
  //           console.log("No such document!");
  //           userData = {
  //             ...defaultUserState,
  //             signedIn: false,
  //           };
  //         }
  //       };
  //       const x = fetchUserDoc();
  //       console.log(JSON.stringify(x));

  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //       console.log("not logged in firebase");
  //     }
  //   });
  //   // console.log(JSON.stringify(userData));
  //   return userData;
  // }

  if (action.type === "LOGIN") {
    console.log("in reducer login");
    console.log(action.item.firstname);
    console.log(action.item.lastname);
    return {
      firstName: action.item.firstname,
      lastName: action.item.lastname,
      email: action.item.email,
      password: action.item.password,
      dob: action.item.dob,
      state: action.item.state,
      gender: action.item.gender,
      country: action.item.country.label,
      pin: action.item.pin,
      city: action.item.city,
      landMark: action.item.landmark,
      phoneNo: action.item.phoneNo,
      signedIn: true,
      isLoading: false,
      isError: false,
      uid: action.item.uid,
    };
  }
  if (action.type === "LOADING") {
    console.log(action.item);
    return { ...state, isLoading: action.item };
  }

  if (action.type === "LOGOUT") {
    console.log(" logged out");
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("error");
        // An error happened.
      });
    return {
      ...defaultUserState,
      signedIn: false,
      isLoading: false,
      isError: false,
    };
  }

  if (action.type === "NOTLOGGEDIN") {
    return {
      ...defaultUserState,
      signedIn: false,
      isLoading: false,
      isError: false,
    };
  }
  return defaultUserState;
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [userDataa, setUserDataa] = useState({});

  useEffect(() => {
    // setIsLoading(true);
    setLoadingHandler(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log("logged into firebase");

        const fetchUserDoc = async () => {
          const docRef = doc(
            database,
            "userdata",
            user.uid,
            "personalinfo",
            "data"
          );

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log(JSON.stringify(docSnap.data().uid));
            dispatchUserAction({ type: "LOGIN", item: docSnap.data() });
          } else {
            // setIsLoading(false);
            dispatchUserAction({ type: "NOTLOGGEDIN" });
            // setLoadingHandler(false);
            setIsError(true);

            console.log("No such document!");
          }
        };
        fetchUserDoc();
        // console.log(JSON.stringify(x));
        // setIsLoading(false);
        setIsError(false);

        // ...
      } else {
        // User is signed out
        // ...
        dispatchUserAction({ type: "NOTLOGGEDIN" });
        // setLoadingHandler(false);
        // // setIsLoading(false);
        // setIsError(false);

        console.log("not logged in firebase");
      }
    });
  }, []);

  const signInUserHandler = (item) => {
    dispatchUserAction({ type: "LOGIN", item: item });
  };
  const signOutUserHandler = () => {
    dispatchUserAction({ type: "LOGOUT" });
  };

  const setLoadingHandler = (item) => {
    dispatchUserAction({ type: "LOADING", item: item });
  };

  const userContext = useMemo(
    () => ({
      firstName: userState.firstName,
      lastName: userState.lastName,
      email: userState.email,
      city: userState.city,
      state: userState.state,
      country: userState.country,
      pin: userState.pin,
      phoneNo: userState.phoneNo,
      gender: userState.gender,
      dob: userState.dob,
      landMark: userState.landMark,
      signInUser: signInUserHandler,
      signOutUser: signOutUserHandler,
      signedIn: userState.signedIn,
      isLoading: userState.isLoading,
      isError: isError,
      setLoading: setLoadingHandler,
      uid: userState.uid,
    }),
    [userState, isError]
  );

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
