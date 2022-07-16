import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact", "Sign in", "Create Account"];

function HomeDrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const signInClickHandler = () => {
    navigate("/signin");
  };
  const homeClickHandler = () => {
    console.log("home clicked");
    navigate("/");
  };
  const signUpClickHandler = () => {
    console.log("Create Account clicked");
    navigate("/signup");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PETS TOWN
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PETS TOWN
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              key={"Home"}
              onClick={homeClickHandler}
              sx={{ color: "#fff" }}
            >
              Home
            </Button>
            <Button key={"About"} sx={{ color: "#fff" }}>
              About
            </Button>
            <Button key={"Contact"} sx={{ color: "#fff" }}>
              Contact
            </Button>
            <Button
              key={"Sign in"}
              onClick={signInClickHandler}
              sx={{ color: "#fff" }}
            >
              Sign in
            </Button>
            <Button
              key={"Create Account"}
              sx={{ color: "#fff" }}
              onClick={signUpClickHandler}
            >
              Create Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default HomeDrawerAppBar;
