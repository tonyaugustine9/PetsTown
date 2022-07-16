import "./App.css";
import HomeDrawerAppBar from "./components/ui/HomeDrawerAppBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";

import HorizontalLinearStepper from "./HorizontalLinearStepper";
const cities = [
  { city: "Akathiyoor", state: "Kerala" },
  { city: "Alappuzha", state: "Kerala" },
  { city: "Ancharakandy", state: "Kerala" },
  { city: "Aroor", state: "Kerala" },
  { city: "Ashtamichira", state: "Kerala" },
  { city: "Attingal", state: "Kerala" },
  { city: "Avinissery", state: "Kerala" },
  { city: "Chalakudy", state: "Kerala" },
  { city: "Changanassery", state: "Kerala" },
  { city: "Chendamangalam", state: "Kerala" },
  { city: "Chengannur", state: "Kerala" },
  { city: "Cherthala", state: "Kerala" },
  { city: "Cheruthazham", state: "Kerala" },
  { city: "Chittur-Thathamangalam", state: "Kerala" },
  { city: "Chockli", state: "Kerala" },
  { city: "Erattupetta", state: "Kerala" },
  { city: "Guruvayoor", state: "Kerala" },
  { city: "Irinjalakuda", state: "Kerala" },
  { city: "Kadirur", state: "Kerala" },
  { city: "Kalliasseri", state: "Kerala" },
  { city: "Kalpetta", state: "Kerala" },
  { city: "Kanhangad", state: "Kerala" },
  { city: "Kanjikkuzhi", state: "Kerala" },
  { city: "Kannur", state: "Kerala" },
  { city: "Kasaragod", state: "Kerala" },
  { city: "Kayamkulam", state: "Kerala" },
  { city: "Kochi", state: "Kerala" },
  { city: "Kodungallur", state: "Kerala" },
  { city: "Kollam", state: "Kerala" },
  { city: "Koothuparamba", state: "Kerala" },
  { city: "Kothamangalam", state: "Kerala" },
  { city: "Kottayam", state: "Kerala" },
  { city: "Kozhikode", state: "Kerala" },
  { city: "Kunnamkulam", state: "Kerala" },
  { city: "Malappuram", state: "Kerala" },
  { city: "Mattannur", state: "Kerala" },
  { city: "Mavelikkara", state: "Kerala" },
  { city: "Mavoor", state: "Kerala" },
  { city: "Muvattupuzha", state: "Kerala" },
  { city: "Nedumangad", state: "Kerala" },
  { city: "Neyyattinkara", state: "Kerala" },
  { city: "Ottappalam", state: "Kerala" },
  { city: "Palai", state: "Kerala" },
  { city: "Palakkad", state: "Kerala" },
  { city: "Panniyannur", state: "Kerala" },
  { city: "Pappinisseri", state: "Kerala" },
  { city: "Paravoor", state: "Kerala" },
  { city: "Pathanamthitta", state: "Kerala" },
  { city: "Payyannur", state: "Kerala" },
  { city: "Peringathur", state: "Kerala" },
  { city: "Perinthalmanna", state: "Kerala" },
  { city: "Perumbavoor", state: "Kerala" },
  { city: "Ponnani", state: "Kerala" },
  { city: "Punalur", state: "Kerala" },
  { city: "Quilandy", state: "Kerala" },
  { city: "Shoranur", state: "Kerala" },
  { city: "Taliparamba", state: "Kerala" },
  { city: "Thiruvalla", state: "Kerala" },
  { city: "Thiruvananthapuram", state: "Kerala" },
  { city: "Thodupuzha", state: "Kerala" },
  { city: "Thrissur", state: "Kerala" },
  { city: "Tirur", state: "Kerala" },
  { city: "Vadakara", state: "Kerala" },
  { city: "Vaikom", state: "Kerala" },
  { city: "Varkala", state: "Kerala" },
];
function App() {
  const sortedCity = cities.map((element) => {
    return element.city;
  });
  console.log(JSON.stringify(sortedCity));
  return (
    <React.Fragment>
      <HomeDrawerAppBar />
      <Box marginTop={10}>
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

export default App;
