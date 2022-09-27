import { Box } from "@mui/material";
import React, { Fragment } from "react";
import Footer from "./Footer/Footer";
import ImportSiteHome from "./ImportSiteHome/ImportSiteHome";

function SiteHome() {
  return (
    <Fragment>
      <ImportSiteHome />
      {/* <Box height="100%" sx={{ backgroundColor: "black" }}></Box> */}
      <Footer />
    </Fragment>
  );
}

export default SiteHome;
