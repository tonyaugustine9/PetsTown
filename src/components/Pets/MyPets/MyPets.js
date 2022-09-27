import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../store/UserContext/user-context";
import { database } from "../../../firebaseConfig";
import PetDataContext from "../../../store/PetDataContext/petdata-context";
import AddPetDialog from "../AddPetDialog/AddPetDialog";
import { useNavigate } from "react-router-dom";

const MyPets = () => {
  const navigate = useNavigate();
  const myPetsListID = [];
  // const [myPetsID, setMyPetsID] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const ctx = useContext(UserContext);
  const petCtx = useContext(PetDataContext);
  // console.log(ctx.uid);

  const fetchMyPets = async () => {
    const myPetsList = [];
    console.log("My id ", ctx.uid);
    const collectionRef = collection(database, "petlist");
    getDocs(collectionRef).then((data) => {
      data.docs.forEach((item) => {
        console.log(item.data().uid);
        if (ctx.uid == item.data().userid)
          myPetsList.push({ ...item.data(), id: item.id });
      });
      // console.log("My Pets List ", myPetsList);
      // const myPetsListID = myPetsList.map((item) => item.petid);
      // console.log("My pets Id", myPetsListID);
      // const myPetData = [];
      // myPetsListID.forEach((item) => {
      //   const fetchPetDoc = async () => {
      //     const docRef = doc(database, "petlist", item);

      //     const docSnap = await getDoc(docRef);
      //     if (docSnap.exists()) {
      //       myPetData.push({ ...docSnap.data(), id: docSnap.id });
      //     } else {
      //       console.log("No such document!");
      //     }
      //   };
      //   fetchPetDoc();
      // });
      console.log("My pet data", myPetsList);
      setMyPets(myPetsList);
    });

    console.log("in fetch pets");
    const response = await getDocs(collectionRef);
  };

  useEffect(() => {
    console.log("in mypets useeffect");

    ctx.signedIn && fetchMyPets();
  }, [ctx.signedIn]);

  const petList = myPets.map((pet) => (
    // if (myPetsListID.includes(pet))
    // myPetsListID.includes(pet.id) && (
    <Grid
      item
      xs={4}
      md={2.8}
      key={pet.id} /*minWidth="240px" maxWidth="240px"*/
    >
      <Paper
        key={pet.id}
        elevation={5}
        sx={{
          borderRadius: "25px",
          overflow: "hidden",
          backgroundColor: "lightgray",
        }}
        onClick={() => navigate(`/userhome/buypets/${pet.id}`)}
      >
        <img src={pet.picture} alt="petdog" width="100%" height="200rem" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingX: 1,
            paddingBottom: 1,
          }}
        >
          <Typography variant="h3" component="h6">
            {pet.name}
          </Typography>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography>{pet.gender}</Typography>
            <Typography> . </Typography>
            <Typography>{pet.breed}</Typography>
          </Box>
          <Typography>{pet.city}</Typography>
        </Box>
      </Paper>
    </Grid>
  ));

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}> */}
      <Container
        sx={{
          marginTop: "10px",
        }}
      >
        {myPets && ctx.signedIn && (
          <Grid container spacing={6}>
            {petList}
          </Grid>
        )}
        {!ctx.signedIn && <Box>Sign in first</Box>}
      </Container>
      {/* </Box> */}
    </Box>
  );
};

export default MyPets;
