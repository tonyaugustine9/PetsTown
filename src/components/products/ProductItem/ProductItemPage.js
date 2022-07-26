import { Box, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { database } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const ProductItemPage = () => {
  const params = useParams();
  const productId = params.productId;
  const [productData, setProductData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(database, "productlist", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setProductData({ ...docSnap.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  }, [productId]);
  console.log(productData, "PRODUCT DATA");
  return (
    <Grid container spacing={6}>
      {productData && (
        <>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                height: "27rem",
              }}
            >
              <Paper
                elevation={5}
                sx={{ borderRadius: "25px", overflow: "hidden" }}
              >
                <img width="100%" src={productData.picture} alt="petdog" />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ paddingX: 1, paddingBottom: 1 }}>
              <Typography variant="h2" component="h3">
                {productData.name}
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"column"}
                flexWrap={"wrap"}
                justifyContent="space-between"
              >
                <Typography>BRAND: {productData.brand}</Typography>
                <Typography>PRICE: RS {productData.price}</Typography>
              </Box>
              <Typography variant="h5" component="h3" marginTop={3}>
                PRODUCT DESCRIPTION
              </Typography>
              <Typography>{productData.description}</Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductItemPage;
