import BasicDrawer from "../ui/BasicDrawer";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { petData } from "./petdata";
import { useNavigate } from "react-router-dom";
const BrowsePets = () => {
  const navigate = useNavigate();

  const petList = petData.map((pet) => (
    <Grid item xs={8} md={4}>
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
