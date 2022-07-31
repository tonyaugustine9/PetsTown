import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import SignIn from "./components/SignIn/SignIn";
import SiteHome from "./components/SiteHome/SiteHome";
import UserHome from "./components/User/UserHome";
import UserProvider from "./store/UserContext/UserProvider";
import ShopCategory from "./components/User/ShopCategory";
// import BuyProducts from "./components/User/BuyProducts";
import BuyPets from "./components/User/BuyPets";
import BrowsePets from "./components/User/BrowsePets";
import ViewPet from "./components/User/ViewPet";
import Products from "./components/products/Products";
import ProductItemPage from "./components/products/ProductItem/ProductItemPage";
import BrowseProducts from "./components/products/BrowseProducts";
// import SignUp from "./components/Account Authentication/SignUp/SignUp";
import SignUpWrapper from "./components/Account Authentication/SignUp/SignUpWraper";
import BrowsePetsWrapper from "./components/Pets/BrowsePets/BrowsePetsWrapper";
import MyPets from "./components/Pets/MyPets/MyPets";
import MyPetsWrapper from "./components/Pets/MyPets/MyPetsWrapper/MyPetsWrapper";
import CartProvider from "./store/CartContext/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="userhome" element={<UserHome />}>
                <Route index element={<ShopCategory />} />
                <Route path="buyproducts" element={<Products />}>
                  <Route index element={<BrowseProducts />} />
                  <Route path=":productId" element={<ProductItemPage />} />
                </Route>
                <Route path="buypets" element={<BuyPets />}>
                  <Route index element={<BrowsePets />} />
                  <Route path=":petId" element={<ViewPet />} />
                  <Route path="mylistedpets" element={<MyPets />} />
                </Route>
              </Route>
              <Route path="signin" element={<SignIn />} />
              <Route index element={<SiteHome />} />

              <Route path="signup" element={<SignUpWrapper />} />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
