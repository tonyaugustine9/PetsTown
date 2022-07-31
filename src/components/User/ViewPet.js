import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const ViewPet = () => {
  const params = useParams();
  const petId = params.petId;
  const [petData, setPetData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(database, "petlist", petId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setPetData({ ...docSnap.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  }, [petId]);
  console.log(petData, "PET DATA");
  return (
    <Grid container spacing={6} sx={{ marginTop: "30px" }}>
      {petData && (
        <>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                maxHeight: "27rem",
              }}
            >
              <Paper
                elevation={5}
                sx={{ borderRadius: "25px", overflow: "hidden" }}
              >
                <img
                  src={petData.picture}
                  alt="pet"
                  width="100%"
                  height="400px"
                />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  borderRadius: "25px",
                  minWidth: "600px",
                  overflow: "hidden",
                  // backgroundColor: "lightgray",
                }}
              >
                <Typography variant="h2" component="h3">
                  {petData.name}
                </Typography>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  flexWrap={"wrap"}
                  justifyContent="space-between"
                >
                  <Typography>Gender: {petData.gender}</Typography>
                  <Typography>Breed: {petData.breed}</Typography>
                  <Typography>Age: {petData.age}</Typography>
                  <Typography>Health Status: {petData.health}</Typography>
                  <Typography>size: {petData.size}</Typography>
                </Box>
                <Typography>City: {petData.city}</Typography>
              </Paper>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              margin="auto"
              marginTop="20px"
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  borderRadius: "25px",
                  overflow: "hidden",
                  // backgroundColor: "lightgray",
                  minWidth: "600px",
                }}
              >
                <Typography variant="h2" component="h3">
                  CONTACT DETAILS
                </Typography>
                <Typography>
                  Contact Name: {petData.contactdetails.name}
                </Typography>
                <Typography>
                  Phone no: {petData.contactdetails.phone}
                </Typography>
                <Typography>
                  Address: {petData.contactdetails.address}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ViewPet;
