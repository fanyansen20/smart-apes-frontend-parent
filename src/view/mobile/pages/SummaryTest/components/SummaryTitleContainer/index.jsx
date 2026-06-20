import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_SummaryTitleContainer.module.scss";

/**
 *
 * @param {{
 * title: string;
 * }} param0
 * @returns
 */

const SummaryTitleContainer = ({ title }) => {
  return (
    <Grid container className={classes.summaryTitleSection}>
      <Grid className={classes.backgroundContainer}>
        <Typography className={classes.sectionTitle}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default SummaryTitleContainer;
