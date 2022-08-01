import { Grid, Paper, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductItemCard = (props) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={4} md={3}>
      <Paper
        elevation={5}
        sx={{
          borderRadius: "25px",
          overflow: "hidden",
        }}
        onClick={() => navigate(`/userhome/buyproducts/${props.data.id}`)}
      >
        <img
          src={props.data.picture}
          alt={props.data.category}
          width="100%"
          height="200rem"
        />
        <Box
          sx={{
            paddingX: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 1,
          }}
        >
          <Box minHeight="64px">
            <Typography align="center" variant="h5" component="h3">
              {`${props.data.name.slice(0, 34)} ..`}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent="space-between"
            flexDirection={"column"}
          >
            <Typography>Brand: {props.data.brand}</Typography>

            <Typography variant="h6">RS: {props.data.price}</Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProductItemCard;
