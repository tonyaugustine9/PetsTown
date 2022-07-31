import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import classes from "./Cart.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BasicDialog = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.onModalClose();
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        maxWidth="true"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // fullScreen
      >
        <DialogTitle id="scroll-dialog-title">Your Cart</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Click order to proceed to checkout. You can enter your shipping
            address in the page and have your product confirmed for home
            delivery
            {props.children}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default BasicDialog;
