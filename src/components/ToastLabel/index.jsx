import { Grid, Typography } from "@mui/material";

import { ReactComponent as AlertIcon } from "../../assets/icons/alert.svg";

import classes from "./_ToastLabel.module.scss";

import React from "react";

const ToastLabel = ({ textLabel }) => {
  return (
    <Grid
      container
      className={classes.noteInfo}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={2} md={1}>
        <AlertIcon style={{ width: "50%", height: "100%" }} />
      </Grid>
      <Grid item xs={10} md={11}>
        <Typography className={classes.noteMsg}>{textLabel}</Typography>
      </Grid>
    </Grid>
  );
};

export default ToastLabel;
