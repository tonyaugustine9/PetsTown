import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useInput from "../../../hooks/use-input";
import { auth, database } from "../../../firebaseConfig";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import {
  Grid,
  Autocomplete,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import cities from "../../Account Authentication/SignUp/constants/cities";
import { width } from "@mui/system";
import dogBreeds from "../constants/dogbreeds";
import catBreeds from "../constants/catbreeds";
import UserContext from "../../../store/UserContext/user-context";
import { storage } from "../../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const isNotEmpty = (value) => value.trim() !== "";
const isPhoneNo = (value) => value.length === 10;

const AddPetDialog = (props) => {
  const ctx = React.useContext(UserContext);
  const [open, setOpen] = React.useState(true);
  const [cityValue, setCityValue] = React.useState(null);
  const [dogBreedValue, setDogBreedValue] = React.useState(null);
  const [petSizeValue, setPetSizeValue] = React.useState("");
  const [petTypeValue, setPetTypeValue] = React.useState("");
  const [petAgeValue, setPetAgeValue] = React.useState("");
  const [petGenderValue, setPetGenderValue] = React.useState("");
  const [petHealthValue, setPetHealthValue] = React.useState("");
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [inputImage, setInputImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [formSubmitted, setFormSubmited] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const cityChangeHandler = (event, value) => {
    setCityValue(value);
  };

  const petSizeChangeHandler = (event) => {
    setPetSizeValue(event.target.value);
  };
  const petAgeChangeHandler = (event) => {
    setPetAgeValue(event.target.value);
  };

  const petGenderChangeHandler = (event) => {
    setPetGenderValue(event.target.value);
  };

  const petHealthChangeHandler = (event) => {
    setPetHealthValue(event.target.value);
  };

  const petTypeChangeHandler = (event) => {
    setPetTypeValue(event.target.value);
  };

  const dogBreedChangeHandler = (event, value) => {
    setDogBreedValue(value);
  };

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: petNameValue,
    isValid: petNameIsValid,
    hasError: petNameHasError,
    valueChangeHandler: petNameChangeHandler,
    inputBlurHandler: petNameBlurHandler,
    reset: resetPetName,
  } = useInput(isNotEmpty);

  const {
    value: contactNameValue,
    isValid: contactNameIsValid,
    hasError: contactNameHasError,
    valueChangeHandler: contactNameChangeHandler,
    inputBlurHandler: contactNameBlurHandler,
    reset: resetContactName,
  } = useInput(isNotEmpty);

  const {
    value: phoneNoValue,
    isValid: phoneNoIsValid,
    hasError: phoneNoHasError,
    valueChangeHandler: phoneNoChangeHandler,
    inputBlurHandler: phoneNoBlurHandler,
    reset: resetPhoneNo,
  } = useInput(isPhoneNo);

  const handleClose = () => {
    //   props.onModalClose();
    setOpen(false);
  };
  React.useEffect(() => {
    setFormIsValid(
      cityValue !== null &&
        petNameIsValid &&
        addressIsValid &&
        phoneNoIsValid &&
        petHealthValue !== "" &&
        petGenderValue !== "" &&
        petAgeValue !== "" &&
        petTypeValue !== "" &&
        petSizeValue !== "" &&
        dogBreedValue !== null &&
        inputImage !== null
    );
  }, [
    cityValue,
    petNameIsValid,
    addressIsValid,
    phoneNoIsValid,
    petHealthValue,
    petGenderValue,
    petAgeValue,
    petTypeValue,
    petSizeValue,
    dogBreedValue,
    inputImage,
  ]);

  console.log(formIsValid);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const addPetFireBase = () => {
    setIsLoading(true);
    setIsError(false);
    setFormSubmited(false);
    const data = {
      userid: ctx.uid,
      size: petSizeValue,
      type: petTypeValue,
      age: petAgeValue,
      gender: petGenderValue,
      health: petHealthValue,
      breed: dogBreedValue,
      name: petNameValue,
      city: cityValue,
      contactdetails: {
        name: contactNameValue,
        phone: phoneNoValue,
        address: addressValue,
      },
    };
    console.log(JSON.stringify(data));
    var uniqueid = uuid();
    var suniqueid = uniqueid.slice(0, 13);
    var uimagename = `${suniqueid}${inputImage.name}`;
    console.log(uimagename);

    const storageRef = ref(storage, `petimages/${uimagename}`);
    const uploadTask = uploadBytesResumable(storageRef, inputImage);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setIsLoading(false);
        setIsError(true);
        setFormSubmited(true);
        console.log("some error occured when uploading image");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        console.log("image uploaded");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          addDoc(collection(database, "petlist"), {
            ...data,
            picture: downloadURL,
          })
            .then((docRef) => {
              // setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setFormSubmited(true);
              setIsLoading(false);
              setIsError(false);
              console.log("doc added");
              console.log(docRef.id);
            })
            .catch(() => {
              setIsLoading(false);
              setIsError(true);
              setFormSubmited(true);
              console.log("error adding doc");
            });
        });
      }
    );
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    addPetFireBase();
  };

  const inputImageChangeHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
    }
  };

  // console.log(open);
  console.log(ctx.firstName);
  console.log(ctx.lastName);
  return (
    <div>
      <Dialog
        open
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onModalClose}
        maxWidth="true"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // fullScreen
      >
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <DialogTitle id="scroll-dialog-title">
          {"Add your pet to the website"}
        </DialogTitle>
        <DialogContent dividers tabIndex={-1} ref={descriptionElementRef}>
          {ctx.signedIn && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
              }}
            >
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>

              {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(20)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText> */}
              {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "40px",
              // width: "100%",
            }}
          > */}
              {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                rowGap: "20px",
              }}
            > */}
              <Grid container spacing={2}>
                <Grid item lg={4} sm={4} xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="pettype">Type of animal</InputLabel>
                      <Select
                        labelId="pettype"
                        id="pettype"
                        value={petTypeValue}
                        label="Type of Animal"
                        onChange={petTypeChangeHandler}
                        size="small"
                      >
                        <MenuItem value={"Dog"}>Dog</MenuItem>
                        <MenuItem value={"Cat"}>Cat</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    type="text"
                    id="petname"
                    label="Pet Name"
                    value={petNameValue}
                    onChange={petNameChangeHandler}
                    onBlur={petNameBlurHandler}
                    variant="outlined"
                    error={petNameHasError}
                    size="small"
                    fullWidth
                  />
                  {petNameHasError && (
                    <p className="error-text">Please enter your pets name.</p>
                  )}
                </Grid>
                <Grid item lg={4} sm={4} xs={6}>
                  <Autocomplete
                    disablePortal
                    id="city"
                    // fullWidth
                    size="small"
                    value={cityValue}
                    onChange={cityChangeHandler}
                    options={cities}
                    renderInput={(params) => (
                      <TextField size="small" {...params} label="City" />
                    )}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        labelId="gender"
                        id="gender"
                        value={petGenderValue}
                        label="Gender"
                        onChange={petGenderChangeHandler}
                        size="small"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item lg={4} sm={4} xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="health">Pet Health</InputLabel>
                      <Select
                        labelId="health"
                        id="health"
                        value={petHealthValue}
                        label="Health"
                        onChange={petHealthChangeHandler}
                        size="small"
                      >
                        <MenuItem value={"Vaccinated"}>Vaccinated</MenuItem>
                        <MenuItem value={"Not Vaccinated"}>
                          Not Vaccinated
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item lg={4} sm={4} xs={6}>
                  <Autocomplete
                    disablePortal
                    id="dogbreed"
                    // fullWidth
                    size="small"
                    value={dogBreedValue}
                    onChange={dogBreedChangeHandler}
                    options={petTypeValue === "Dog" ? dogBreeds : catBreeds}
                    renderInput={(params) => (
                      <TextField size="small" {...params} label="Breed" />
                    )}
                  />
                </Grid>

                <Grid item lg={4} sm={4} xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="size">Pet Size</InputLabel>
                      <Select
                        labelId="size"
                        id="size"
                        value={petSizeValue}
                        label="Pet Size"
                        onChange={petSizeChangeHandler}
                        size="small"
                      >
                        <MenuItem value={"Tiny"}>Tiny</MenuItem>
                        <MenuItem value={"Short"}>Short</MenuItem>
                        <MenuItem value={"Average"}>Average</MenuItem>
                        <MenuItem value={"Tall"}>Tall</MenuItem>
                        <MenuItem value={"Very Tall"}>Very Tall</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item lg={4} sm={4} xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="size">Pet Age</InputLabel>
                      <Select
                        labelId="petage"
                        id="petage"
                        value={petAgeValue}
                        label="Pet Age"
                        onChange={petAgeChangeHandler}
                        size="small"
                      >
                        <MenuItem value={"Baby"}> Baby</MenuItem>
                        <MenuItem value={"Juvenile"}>Juvenile</MenuItem>
                        <MenuItem value={"Young"}>Young</MenuItem>
                        <MenuItem value={"Young Adult"}>Young Adult</MenuItem>
                        <MenuItem value={"Adult"}> Adult</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                {/* </Box> */}
                {/* </Box> */}
              </Grid>
              <Typography>Contact Details</Typography>
              <Grid container spacing={2}>
                {/* <Grid item lg={4} sm={4} xs={4}>
                  <TextField
                    type="text"
                    id="contactname"
                    label="Contact Name"
                    value={contactNameValue}
                    onChange={contactNameChangeHandler}
                    onBlur={contactNameBlurHandler}
                    variant="outlined"
                    error={contactNameHasError}
                    size="small"
                    fullWidth
                  />
                  {contactNameHasError && (
                    <p className="error-text">Please enter a contact name</p>
                  )}
                </Grid> */}
                <Grid item lg={4} sm={4} xs={6}>
                  <TextField
                    type="text"
                    id="contactname"
                    label="Name"
                    value={`${ctx.firstName} ${ctx.lastName}`}
                    // onChange={phoneNoChangeHandler}
                    // onBlur={phoneNoBlurHandler}
                    variant="outlined"
                    disabled
                    // error={phoneNoHasError}
                    size="small"
                    fullWidth
                  />
                  {/* {phoneNoHasError && (
                  <p className="error-text">Please enter a 10 digit Phone No</p>
                )}  */}
                </Grid>
                <Grid item lg={4} sm={4} xs={6}>
                  <TextField
                    type="text"
                    id="phoneno"
                    label="Phone Number"
                    value={phoneNoValue}
                    onChange={phoneNoChangeHandler}
                    onBlur={phoneNoBlurHandler}
                    variant="outlined"
                    error={phoneNoHasError}
                    size="small"
                    fullWidth
                  />
                  {phoneNoHasError && (
                    <p className="error-text">
                      Please enter a 10 digit Phone No
                    </p>
                  )}
                </Grid>
                <Grid item lg={4} sm={12} xs={6}>
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        onChange={inputImageChangeHandler}
                        accept="image/*"
                        type="file"
                      />
                      <PhotoCamera />
                    </IconButton>
                    {inputImage !== null && (
                      <Box sx={{ display: "flex" }}>
                        <Typography>{inputImage.name}</Typography>
                        <Box>
                          <img
                            src={URL.createObjectURL(inputImage)}
                            width="100%"
                            height="100px"
                            alt="pic"
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                  <TextField
                    id="address"
                    label="Address"
                    multiline
                    rows={4}
                    value={addressValue}
                    variant="outlined"
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                    type="text"
                    size="small"
                    fullWidth
                  />
                  {addressHasError && (
                    <p className="error-text">Please enter a valid address</p>
                  )}
                </Grid>
              </Grid>

              {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(20)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText> */}
              {/* <Box>
            <Autocomplete
              disablePortal
              id="dogbreed"
              // fullWidth
              size="small"
              value={dogBreedValue}
              onChange={dogBreedChangeHandler}
              options={dogBreeds}
              renderInput={(params) => (
                <TextField size="small" {...params} label="Dog Breed" />
              )}
            />
          </Box> */}
            </Box>
          )}
          {!ctx.signedIn && <Typography>Sign in first</Typography>}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
          <Button
            type="submit"
            disabled={!formIsValid}
            onClick={formSubmitHandler}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPetDialog;
