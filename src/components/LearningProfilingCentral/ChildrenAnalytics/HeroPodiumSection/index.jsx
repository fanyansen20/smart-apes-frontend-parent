import React from "react";

// mui material
import { Grid } from "@mui/material";

// assets
import { ReactComponent as PodiumAnalytics } from "../../../../assets/images/ChildrenAnalytics/podium-analytics-icon.svg";
import classes from "./_HeroPodiumSection.module.scss";

/**
 * @param {{
 * firstPodium : string
 * secondPodium : string
 * thirdPodium : string
 * interestAreas : [string]
 * }} props
 * @returns
 */

const HeroPodiumSection = ({
  firstPodium,
  secondPodium,
  thirdPodium,
  interestAreas,
}) => {
  return (
    <Grid container justifyContent="center">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        wrap="nowrap"
        className={classes.heroSection}
        sx={{ gap: { xs: 2, md: 4 } }}
      >
        <Grid className={classes.podiumContainer}>
          <Grid container>
            <Grid
              xs={4}
              container
              justifyContent="center"
              className={classes.secondPodium}
            >
              {secondPodium}
            </Grid>
            <Grid
              xs={4}
              container
              justifyContent="center"
              className={classes.firstPodium}
            >
              {firstPodium}
            </Grid>
            <Grid
              xs={4}
              container
              justifyContent="center"
              className={classes.thirdPodium}
            >
              {thirdPodium}
            </Grid>
          </Grid>
          <PodiumAnalytics className={classes.podiumAnalytics} />
        </Grid>
        <Grid className={classes.titleContainer}>
          {interestAreas?.map((value, key) => (
            <p key={key}>
              <u>{value.substring(1, 0)}</u>
              {value.substring(1, value.length)}
            </p>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeroPodiumSection;
