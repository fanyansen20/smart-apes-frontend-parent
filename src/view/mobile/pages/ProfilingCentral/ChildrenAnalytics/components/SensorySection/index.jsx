import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import DoughnutChart from "../../../../../../../components/DoughnutChart";
import SectionHeader from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";

// Styles
import classes from "./_SensorySection.module.scss";

/**
 * @typedef {{
 * header: string;
 * score: number;
 * }} Score
 *
 * @typedef {{
 * headerSummary: string;
 * descriptionSummary: string;
 * }} Content
 */

/**
 * @param {{
 * data: {score: Score[]; content: Content}
 * handleSelectDetail: (value: 'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest') => void
 * }} param0
 */

const SensorySection = ({ data, handleSelectDetail }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.entries(data?.score ?? {});

  const doughnutOptions = {
    datalabels: { fontSize: 12 },
    legend: { fontSize: 10 },
  };

  // #region function
  const seeDetails = () => {
    handleSelectDetail("sensory");
  };
  // #endregion

  return (
    <Fragment>
      <SectionHeader
        title="Sensory"
        number={4}
        color="green"
        seeDetails={seeDetails}
      />
      {dataScoreResult && (
        <DoughnutChart
          dataScoreResult={dataScoreResult}
          options={doughnutOptions}
        />
      )}
      <Grid container gap={1} mt={1} mb={2}>
        <Typography className={classes.contentTitle}>
          {data?.content?.headerSummary} Learner
        </Typography>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.descriptionSummary}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default SensorySection;
