// import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CartProvider from "../../store/CartContext/CartProvider";
import Cart from "./Cart/Cart/Cart";
import Header from "./Header/Header";
import React, { useState } from "react";
import { Box } from "@mui/material";

// import MealsSummary from './MealsSummary';
// import AvailableMeals from './AvailableMeals';
// import BrowseProducts from "./BrowseProducts";

const Products = () => {
  // const [cartIsShown, setCartIsShown] = useState(false);

  // const showCartHandler = () => {
  //   setCartIsShown(true);
  // };

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };
  return (
    <Box marginTop="10px">
      {/* <CartProvider> */}
      {/* {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} /> */}
      <Outlet />
      {/* </CartProvider> */}
    </Box>
  );
};

export default Products;
