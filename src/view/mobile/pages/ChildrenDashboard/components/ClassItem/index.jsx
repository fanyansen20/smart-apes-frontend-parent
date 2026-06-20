import React from "react";

// MUI
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Grid } from "@mui/material";

// Styles
import classes from "./_ClassItem.module.scss";

/**
 * @param {{
 * data: {date: string; title: string;};
 * }} param0
 */

const ClassItem = ({ data }) => {
  return (
    <Grid item xs={12} className={classes.classCardContainer}>
      <Grid xs={12} className={classes.classCard}>
        <div className={classes.classCardContent}>
          <Grid
            xs={12}
            container
            className={classes.classCardTextContainer}
            gap={1.5}
          >
            <Grid item>
              <h5>{data.date}</h5>
            </Grid>
            <Grid item className={classes.classCardContentLeft}>
              <h3>{data.title}</h3>
            </Grid>
          </Grid>
          <NavigateNextIcon />
        </div>
      </Grid>
    </Grid>
  );
};

export default ClassItem;
