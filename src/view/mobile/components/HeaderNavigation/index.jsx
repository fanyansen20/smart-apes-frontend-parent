import React from "react";

// MUI
import { ArrowBackIos } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

// Style
import classes from "./_HeaderNavigation.module.scss";

/**
 * @param {{
 * title: string
 * goBack?: () => void
 * }} param
 * @returns
 */

const HeaderNavigation = ({ title, goBack }) => {
  const hasGoBack = goBack !== undefined;
  return (
    <Grid
      xs={12}
      className={
        hasGoBack
          ? classes.headerNavigationContainer
          : classes.headerNavigationCenterContainer
      }
    >
      {hasGoBack && <ArrowBackIos onClick={goBack} />}
      <Typography className={classes.titleCenter}>{title}</Typography>
    </Grid>
  );
};

export default HeaderNavigation;
