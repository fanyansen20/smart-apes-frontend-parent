import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import SectionHeader from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";
import LeftRightBarChart from "../../../../../../../components/LeftRightBarChart";

// Styles
import classes from "./_TypologySection.module.scss";

/**
 * @typedef {{
 * left : string
 * right : string
 * score : number
 * }} ScoreTestResults
 *
 * @typedef {{
 * header: string;
 * description: string;
 * }} Summary
 *
 * @typedef {{
 * icon : string;
 * personality: string;
 * summary: Summary;
 * }} Content
 */

/**
 * @param {{
 * data: {score: ScoreTestResults, content: Content}
 * handleSelectDetail: (value: 'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest') => void
 * }} param0
 */

const TypologySection = ({ data, handleSelectDetail }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.values(data?.score ?? {});

  // #region function
  const seeDetails = () => {
    handleSelectDetail("typology");
  };
  // #endregion

  return (
    <Fragment>
      <SectionHeader
        title="Typology"
        number={1}
        color="orange"
        seeDetails={seeDetails}
      />
      <Grid container className={classes.typologyContainer}>
        <Grid item xs={12} className={classes.typologyIconContainer}>
          <img src={data?.content?.icon} alt="typology icon" />
        </Grid>
        <Typography className={classes.contentTitle}>
          About your personality
        </Typography>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.personality}
        </Typography>
      </Grid>
      <Grid>
        <LeftRightBarChart
          scoreTestResults={dataScoreResult}
          title="Typology Chart"
          removeCard
          removePin
        />
      </Grid>
      <Grid container gap={1} mt={1} mb={2}>
        <Typography className={classes.contentTitle}>How They Learn</Typography>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.summary?.description}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default TypologySection;
