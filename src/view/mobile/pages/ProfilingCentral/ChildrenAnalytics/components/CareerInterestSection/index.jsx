import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import HeroPodiumSection from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/HeroPodiumSection";
import SectionHeader from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";
import HorizontalBarChart from "../../../../../../../components/LearningProfilingCentral/HorizontalBarChart";

// Styles
import classes from "./_CareerInterestSection.module.scss";

/**
 * @typedef {{
 * header: string;
 * score: number;
 * }} Score
 *
 * @typedef {{
 * header: string;
 * description: string;
 * baseCode: string;
 * codes: string[]
 * }} Summary
 *
 * @typedef {{
 * interest: string;
 * interestAreas: string[];
 * summary: Summary;
 * }} Content
 */

/**
 *
 * @param {{
 * data: {score: Score; content: Content};
 * handleSelectDetail: (value: 'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest') => void
 * }} param0
 * @returns
 */

const CareerInterest = ({ data, handleSelectDetail }) => {
  if (!data) return;

  // #region function
  const seeDetails = () => {
    handleSelectDetail("careerInterest");
  };
  // #endregion

  // #region bar option
  const options = {
    barThickness: 16,
    ticks: {
      xPadding: 0,
      yPadding: 4,
    },
    datalabels: {
      fontSize: 8,
    },
  };
  // #endregion

  return (
    <Fragment>
      <SectionHeader
        title="Career Interest"
        number={5}
        color="purple"
        seeDetails={seeDetails}
      />
      <Grid container gap={1} mt={1} mb={2}>
        {data?.score && (
          <HorizontalBarChart dataScoreResult={data?.score} options={options} />
        )}
        <Typography className={classes.contentTitle} mt={1}>
          Career Type
        </Typography>
        <Typography mb={1} className={classes.contentSubtitle}>
          Your highest score was for the
          <b> {data?.content?.interest} </b>
          occupational interest. A persons top three interests areas are
          sometimes called their “GRIP Learning Type”. This would make your code
        </Typography>
        <HeroPodiumSection
          firstPodium={data?.content?.interestAreas[0]?.charAt(0)}
          secondPodium={data?.content?.interestAreas[1]?.charAt(0)}
          thirdPodium={data?.content?.interestAreas[2]?.charAt(0)}
          interestAreas={data?.content?.interestAreas}
        />
        <Typography mt={1.5} className={classes.contentTitle}>
          {data?.content?.summary?.header}
        </Typography>
        <Typography mb={2} className={classes.contentSubtitle}>
          {data?.content?.summary?.description}
        </Typography>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.summary?.baseCode}
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid xs={4}>
            <Typography className={classes.contentSubtitle}>
              {data?.content?.summary?.codes
                ?.slice(0, 3)
                ?.map((value, index) => (
                  <li
                    key={index}
                    className={index % 2 ? classes.rightCode : null}
                  >
                    {value}
                  </li>
                ))}
            </Typography>
          </Grid>
          <Grid />
          <Grid xs={4}>
            <Typography className={classes.contentSubtitle}>
              {data?.content?.summary?.codes
                ?.slice(3, 6)
                ?.map((value, index) => (
                  <li
                    key={index}
                    className={index % 2 ? classes.rightCode : null}
                  >
                    {value}
                  </li>
                ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CareerInterest;
