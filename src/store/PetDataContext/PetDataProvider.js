import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useReducer, useMemo } from "react";
import PetDataContext from "./petdata-context";
import { database } from "../../firebaseConfig";

const defaultPetDataState = {
  isLoading: "false",
  isError: "false",
  petData: [],
};

const petDataReducer = (state, action) => {
  // if (action.type === "ADD") {
  //   console.log(action.item);
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isError: false,
  //   };
  // }

  if (action.type === "REFRESH") {
    console.log(action.item);
    return {
      petData: action.item,
      isLoading: false,
      isError: false,
    };
  }
  if (action.type === "LOADING") {
    console.log(action.item);
    return { ...state, isLoading: action.item, isError: false };
  }

  if (action.type === "ERROR") {
    console.log(action.item);
    return { ...state, isLoading: false, isError: true };
  }
};

const PetDataProvider = (props) => {
  const [petDataState, dispatchPetDataAction] = useReducer(
    petDataReducer,
    defaultPetDataState
  );

  const fetchPets = async () => {
    console.log("in fetch pets");
    const collectionRef = collection(database, "petlist");
    const loadedPets = [];
    getDocs(collectionRef).then((data) => {
      // var x = 1;
      // while (x < 15) {
      //   data.docs.forEach((item) => {
      //     loadedPets.push({ ...item.data(), id: item.id });
      //     x = x + 1;
      //     // console.log(item.id);
      //   });
      // }

      data.docs.forEach((item) => {
        loadedPets.push({ ...item.data(), id: item.id });

        // console.log(item.id);
      });
      console.log(loadedPets);
      // setPets(loadedPets);
      dispatchPetDataAction({ type: "REFRESH", item: loadedPets });
    });
    const response = await getDocs(collectionRef);

    // setPets(loadedPets);
  };

  useEffect(() => {
    console.log("in pet provider useeffect");
    fetchPets();
  }, []);

  const setLoadingHandler = (item) => {
    dispatchPetDataAction({ type: "LOADING", item: item });
  };

  const setErrorHandler = (item) => {
    dispatchPetDataAction({ type: "ERROR", item: item });
  };

  //   const setErrorHandler = () => {
  //     dispatchUserAction({ type: "ERROR" });
  //   };

  const petDataContext = useMemo(
    () => ({
      // petData: [1, 2, 3, 4, 5, 6],
      petData: petDataState.petData,
      isLoading: petDataState.isLoading,
      isError: petDataState.isError,
      // setLoading: setLoadingHandler,
      // setError: setErrorHandler,
    }),
    [petDataState]
  );

  return (
    <PetDataContext.Provider value={petDataContext}>
      {props.children}
    </PetDataContext.Provider>
  );
};

export default PetDataProvider;
