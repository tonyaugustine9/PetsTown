import BasicDrawer from "../ui/BasicDrawer";
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import PetDataContext from "../../store/PetDataContext/petdata-context";
import AddPetDialog from "../Pets/AddPetDialog/AddPetDialog";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    dkblue: {
      main: "#02051b",
      contrastText: "#fff",
    },
  },
});

const BrowsePets = () => {
  const ctx = useContext(PetDataContext);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const collectionRef = collection(database, "petlist");
  const [modalOpen, setModalOpen] = useState(false);

  // const fetchPets = async () => {
  //   getDocs(collectionRef).then((data) => {
  //     const loadedPets = [];

  //     data.docs.forEach((item) => {
  //       loadedPets.push({ ...item.data(), id: item.id });
  //       console.log(item.id);
  //     });
  //     console.log(loadedPets);
  //     setPets(loadedPets);
  //   });

  //   console.log("in fetch pets");
  //   const response = await getDocs(collectionRef);
  //   // response.forEach((item) => {
  //   //   loadedPets.push({ ...item.data(), id: item.id });
  //   //   console.log(item.id);
  //   // });
  //   // if (response.exists()) {
  //   //   console.log("response exists");
  //   //   const loadedPets = [];

  //   //   response.docs.forEach((item) => {
  //   //     loadedPets.push({ ...item.data(), id: item.id });
  //   //     console.log(item.id);
  //   //   });
  //   //   setPets(loadedPets);
  //   // }
  //   console.log(response);
  // };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  console.log(modalOpen);
  const petList = ctx.petData.map((pet) => (
    <Grid item xs={4} md={2.6} key={pet.id} minWidth="240px" maxWidth="240px">
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
    <Box sx={{ display: "flex" /* marginTop: "10px" */ }}>
      {/* <AddPetDialog onModalClose={modalCloseHandler} isModelOpen={modalOpen} /> */}
      {/* <BasicDrawer /> */}
      {modalOpen && <AddPetDialog onModalClose={modalCloseHandler} />}
      <Box
        sx={{
          display: "flex",
          // marginTop: "10px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            rowGap: "10px",
            backgroundColor: "lightgray",
            paddingX: "20px",
            paddingY: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={modalOpenHandler}
            sx={{ backgroundColor: "black" }}
          >
            <Typography>Add Your Pet</Typography>
          </Button>
        </Box>
        <Container
          sx={{
            // display: "flex",
            // flexDirection: "column",
            // rowGap: "20px",
            // backgroundColor: "black",
            // marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          backgroundColor: "black",
        }}
      > */}

          <Grid container spacing={6}>
            {petList}
          </Grid>

          {/* </Box> */}
        </Container>
      </Box>
    </Box>
  );
};

export default BrowsePets;
