import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import SectionHeader from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";

// Styles
import LeftRightBarChart from "../../../../../../../components/LeftRightBarChart";
import classes from "./_KeyLearningDimensionSection.module.scss";

/**
 * @typedef {{
 * left: string;
 * right: string;
 * score: number
 * }} Score
 *
 * @typedef {{
 * summary: string;
 * }} Content
 */

/**
 * @param {{
 * data: {score: Score[], content: Content};
 * handleSelectDetail: (value: 'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest') => void
 * }} param0
 * @returns
 */

const KeyLearningDimensionSection = ({ data, handleSelectDetail }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.values(data?.score ?? {});

  // #region function
  const seeDetails = () => {
    handleSelectDetail("keyLearningDimension");
  };
  // #endregion

  return (
    <Fragment>
      <SectionHeader
        title="Key Learning Dimension"
        number={2}
        color="pink"
        seeDetails={seeDetails}
      />
      <LeftRightBarChart
        scoreTestResults={dataScoreResult}
        removeCard
        removePin
      />
      <Grid mt={1} mb={2}>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.summary}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default KeyLearningDimensionSection;
