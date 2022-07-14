import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Grid } from "@mui/material";

import { database } from "../../firebaseConfig";
import ProductItemCard from "./ProductItem/ProductItemCard";
import BasicDrawer from "../ui/BasicDrawer";

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const collectionRef = collection(database, "productlist");
    const fetchProducts = async () => {
      getDocs(collectionRef).then((data) => {
        const loadedProducts = [];

        data.docs.forEach((item) => {
          loadedProducts.push({ ...item.data(), id: item.id });
        });

        setProducts(loadedProducts);
      });

      //   if (!response.ok) {
      //     throw new Error("Something went wrong!");
      //   }

      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }
  console.log(JSON.stringify(products));
  const productsList = products.map((product) => (
    <ProductItemCard key={product.id} data={product} />
  ));

  return (
    <Box sx={{ display: "flex", marginTop: "10px" }}>
      {/* <MealsSummary /> */}
      <BasicDrawer />
      <Grid container spacing={6}>
        {productsList}
      </Grid>
    </Box>
  );
};

export default BrowseProducts;
