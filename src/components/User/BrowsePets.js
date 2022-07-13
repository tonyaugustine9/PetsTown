import BasicDrawer from "../ui/BasicDrawer";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const BrowsePets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "petlist");
    getDocs(collectionRef).then((data) => {
      const loadedPets = [];

      data.docs.forEach((item) => {
        loadedPets.push({ ...item.data(), id: item.id });
      });

      console.log(JSON.stringify(loadedPets));
      setPets(loadedPets);
    });
  }, []);

  const petList = pets.map((pet) => (
    <Grid item xs={8} md={4} key={pet.id}>
      <Paper
        key={pet.id}
        elevation={5}
        sx={{ borderRadius: "25px", overflow: "hidden" }}
        onClick={() => navigate(`/userhome/buypets/${pet.id}`)}
      >
        <img src={pet.picture} alt="petdog" width="100%" height="200rem" />
        <Box sx={{ paddingX: 1, paddingBottom: 1 }}>
          <Typography variant="h2" component="h3">
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
          <Typography>{pet.location}</Typography>
        </Box>
      </Paper>
    </Grid>
  ));
  return (
    <Box sx={{ display: "flex", marginTop: "10px" }}>
      <BasicDrawer />
      <Grid container spacing={6}>
        {petList}
      </Grid>
    </Box>
  );
};

export default BrowsePets;
