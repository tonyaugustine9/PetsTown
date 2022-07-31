import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/UserContext/user-context";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { CircularProgress, makeStyles } from "@mui/material";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import HeaderCartButton from "../products/Layout/HeaderCartButton/HeaderCartButton";
import Cart from "../products/Cart/Cart/Cart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const pages = ["Home", "Products", "Pets"];
const settings = ["Profile", "Sign Out"];
const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    dkblue: {
      main: "#02051b",
      contrastText: "#fff",
    },
  },
});

const UserResponsiveAppBar = () => {
  const ctx = React.useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartIsShown, setCartIsShown] = React.useState(false);

  const navLinkClickHandler = (event) => {
    handleCloseNavMenu();
    if (event.target.textContent === "Products") {
      navigate("/userhome/buyproducts");
    }
    if (event.target.textContent === "Home") {
      navigate("/");
    }
    if (event.target.textContent === "Pets") {
      navigate("/userhome/buypets");
    }
    console.log(event.target.textContent);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const signInClickHandler = () => {
    navigate("/signin");
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserMenuSignOut = () => {
    ctx.setLoading(true);
    ctx.signOutUser();

    // setAnchorElUser(null);
    // navigate("/");
  };

  const userMenuLinkClickHandler = (event) => {
    if (event.target.textContent === "Sign Out") {
      handleUserMenuSignOut();
    }
    if (event.target.textContent === "Profile") {
      console.log("profile link clicked");
    }
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="dkblue"
      >
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PETS TOWN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                color="blue"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={
                      navLinkClickHandler
                    } /*onClick={handleCloseNavMenu}*/
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PETS TOWN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  // onClick={handleCloseNavMenu}
                  onClick={navLinkClickHandler}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {ctx.signedIn && !ctx.isLoading && (
              <Box sx={{ display: "flex", columnGap: "30px" }}>
                <Box sx={{ flexGrow: 0 }}>
                  <HeaderCartButton onClick={showCartHandler} />
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src="/broken-image.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    color="blue"
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box key="namefield" marginLeft={2}>
                      <Typography textAlign="left">
                        Name: {ctx.firstName}
                      </Typography>
                    </Box>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={userMenuLinkClickHandler}
                        // onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                    {/* <MenuItem key="logout" onClick={handleUserMenuSignOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem> */}
                    <MenuItem
                      component={RouterLink}
                      to="/userhome/buypets/mylistedpets"
                      // component={<RouterLink to="/userhome/mylistedpets" />}
                      // containerElement={<RouterLink to="/userhome/mylistedpets" />}
                    >
                      <Typography textAlign="center">My Listed Pets</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
            {!ctx.signedIn && !ctx.isLoading && (
              <Button
                key={"signin"}
                onClick={signInClickHandler}
                sx={{ color: "#fff" }}
              >
                Sign In
              </Button>
            )}

            {ctx.isLoading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="warning" />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default UserResponsiveAppBar;
