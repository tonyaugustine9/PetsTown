import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import catBreeds from "../Pets/constants/catbreeds";
import dogBreeds from "../Pets/constants/dogbreeds";

const drawerWidth = 225;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const animals = ["Dog", "Cat", "Other"];
const BasicDrawer = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [personName, setPersonName] = React.useState(["Dog", "Cat", "Other"]);
  const [selectedBreeds, setSelectedBreeds] = React.useState([]);
  const handleChange = (event) => {
    // console.log(event.target.value);
    const {
      target: { value },
    } = event;
    props.onAnimalTypeChange(event.target.value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleBreedChange = (event) => {
    // console.log(event.target.value);
    const {
      target: { value },
    } = event;
    props.onAnimalBreedChange(event.target.value);
    setSelectedBreeds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // console.log(personName);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // backgroundColor: "blue",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List
          sx={{
            paddingX: "5px",
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Filter Items
            </ListSubheader>
          }
        >
          <Box>
            <Box sx={{ display: "flex", columnGap: "3px" }}>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary="Animal Type" />
            </Box>
            <FormControl sx={{ m: 1, width: "100%", paddingRight: "10px" }}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Choose" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {animals.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box marginTop={5}>
            <Box sx={{ display: "flex", columnGap: "3px" }}>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary="Animal Breed" />
            </Box>
            <FormControl sx={{ m: 1, width: "100%", paddingRight: "10px" }}>
              <InputLabel id="input-breed">Choose</InputLabel>
              <Select
                labelId="breed-demo-multiple-checkbox-label"
                id="breed-demo-multiple-checkbox"
                multiple
                value={selectedBreeds}
                onChange={handleBreedChange}
                input={<OutlinedInput label="Choose" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {personName.indexOf("Cat") > -1 &&
                  catBreeds.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedBreeds.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                {personName.indexOf("Dog") > -1 &&
                  dogBreeds.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedBreeds.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Animal" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse> */}
        </List>
      </Box>
    </Drawer>
  );
};

export default BasicDrawer;
