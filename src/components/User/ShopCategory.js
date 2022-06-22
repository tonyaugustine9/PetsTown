import { Typography, Box, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopCategory = () => {
  const navigate = useNavigate();

  const buyProductClickHandler = () => {
    navigate("/userhome/buyproducts");
  };

  const buyPetsClickHandler = () => {
    console.log("buy pet");
    navigate("/userHome/buypets");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
        height: "80%",
        margin: "auto",
      }}
    >
      <Card onClick={buyProductClickHandler}>
        <Button
          variant="contained"
          backgroundColor="#03a9f4"
          sx={{ width: "14rem", height: "9rem", borderRadius: "5px" }}
        >
          <Typography>Buy products</Typography>
        </Button>
      </Card>
      <Card onClick={buyPetsClickHandler}>
        <Button
          variant="contained"
          backgroundColor="#03a9f4"
          sx={{ width: "14rem", height: "9rem", borderRadius: "5px" }}
        >
          <Typography>Get a pet</Typography>
        </Button>
      </Card>
    </Box>
  );
};

export default ShopCategory;
