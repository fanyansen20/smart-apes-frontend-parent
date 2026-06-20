import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_PersonalTypologyContainer.module.scss";

/**
 *
 * @param {{
 * icon: string;
 * domain: string;
 * summary: string;
 * }} param0
 * @returns
 */

const PersonalTypologyContainer = ({ icon, domain, summary }) => {
  return (
    <Grid container className={classes.personalTypographyContainer}>
      <Grid item xs={4} container alignItems="center">
        <img src={icon} alt="Myers Briggs Type Indicator Icon" />
      </Grid>
      <Grid item xs={8} pl={1}>
        <Typography className={classes.title} mb={0.5}>
          {domain}
        </Typography>
        <Typography className={classes.subtitle}>{summary}</Typography>
      </Grid>
    </Grid>
  );
};

export default PersonalTypologyContainer;
