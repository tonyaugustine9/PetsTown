import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Container, Grid, Paper, Skeleton } from "@mui/material";

import { database } from "../../firebaseConfig";
import ProductItemCard from "./ProductItem/ProductItemCard";
import BasicDrawer from "../ui/BasicDrawer";

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHttpError(false);
    const collectionRef = collection(database, "productlist");
    const fetchProducts = async () => {
      getDocs(collectionRef).then((data) => {
        const loadedProducts = [];

        data.docs.forEach((item) => {
          loadedProducts.push({ ...item.data(), id: item.id });
        });

        setProducts(loadedProducts);
        setIsLoading(false);
        setHttpError(false);
      });

      //   if (!response.ok) {
      //     throw new Error("Something went wrong!");
      //   }

      // setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(true);
    });
  }, []);

  console.log(JSON.stringify(products));
  const productsList = products.map((product) => (
    <ProductItemCard key={product.id} data={product} />
  ));

  return (
    <Box sx={{ display: "flex" }}>
      {/* <MealsSummary /> */}
      {/* <BasicDrawer /> */}
      <Container
        sx={{
          marginTop: "30px",
        }}
      >
        <Grid container spacing={6}>
          {isLoading &&
            !httpError &&
            Array.from(new Array(8)).map((item, index) => (
              <Grid item xs={6} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "25px",
                    overflow: "hidden",
                    minWidth: "236px",
                    maxWidth: "236px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingBottom: "5px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={260}
                      height={200}
                      sx={{ bgcolor: "grey" }}
                    />

                    <Skeleton variant="text" width={210} height={64} />
                    <Skeleton variant="text" width={210} height={30} />
                  </Box>
                </Paper>
              </Grid>
            ))}
          {!isLoading && httpError && <Box>Error</Box>}
          {!isLoading && !httpError && productsList}
          {/* <Grid item xs={6} md={3} minWidth="240px" maxWidth="240px">
            <Skeleton variant="rectangular" width={220} height={200} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width={200} height={64} />
              <Skeleton variant="text" width={200} />
              <Skeleton variant="text" width={200} />
              <Skeleton variant="text" width={200} />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default BrowseProducts;
