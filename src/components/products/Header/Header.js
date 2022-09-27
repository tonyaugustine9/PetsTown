import { Fragment } from "react";

import HeaderCartButton from "../Layout/HeaderCartButton/HeaderCartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
