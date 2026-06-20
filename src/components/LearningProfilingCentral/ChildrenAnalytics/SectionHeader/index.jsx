import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_SectionHeader.module.scss";

// Assets
import { ReactComponent as HelpIcon } from "../../../../assets/icons/help-circle.svg";

/**
 * @param {{
 * title: string;
 * number: number | string;
 * color: "orange" | "pink" | "green" | "blue" | "purple"
 * seeDetails: () => void;
 * isDesktop: boolean;
 * }} param0
 * @returns
 */

const SectionHeader = ({ title, number, color, seeDetails, isDesktop }) => {
  const desktopClasses = isDesktop
    ? classes.desktopView
    : classes.sectionHeaderContainer;

  return (
    <Grid container className={[classes[`bg__${color}`], desktopClasses]}>
      <Grid className={[classes.numberContainer, classes[`__${color}`]]}>
        <Typography>{number}</Typography>
      </Grid>
      <Typography className={classes.sectionTitle}>{title}</Typography>

      {seeDetails && <HelpIcon onClick={seeDetails} />}
    </Grid>
  );
};

export default SectionHeader;
