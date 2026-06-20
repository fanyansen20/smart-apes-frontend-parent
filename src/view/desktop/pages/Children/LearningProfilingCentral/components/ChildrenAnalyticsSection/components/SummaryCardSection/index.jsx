import React from "react";

// mui
import { Grid } from "@mui/material";

// assets
import classes from "./_SummaryCardSection.module.scss";

// components
import SectionHeader from "../../../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";
import TextButton from "../../../../../../../../../components/button/TextButton";

/**
 * @param {{
 * title: string;
 * number: number | string;
 * color: "orange" | "pink" | "green" | "blue" | "purple"
 * onClick : () => void
 * }} props
 * @returns
 */

const SummarySection = ({ title, color, number, children, onClick }) => {
  return (
    <div className={classes.cardAnalytics}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={5}>
          <SectionHeader
            title={title}
            number={number}
            color={color}
            isDesktop
          />
        </Grid>
        <TextButton onClick={onClick}>See Details</TextButton>
      </Grid>

      {children}
    </div>
  );
};

export default SummarySection;
