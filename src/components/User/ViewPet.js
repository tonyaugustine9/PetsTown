import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ViewPet = () => {
  const params = useParams();
  const petId = params.petId;
  return <Typography>In pet {petId} view page</Typography>;
};

export default ViewPet;
