import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import SectionHeader from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/SectionHeader";
import VerticalChart from "../../../../../../../components/VerticalChart";

// Styles
import classes from "./_MultipleIntelligenceSection.module.scss";

/**
 * @typedef {{
 * header: string;
 * score: number;
 * }} Score
 *
 * @typedef {{
 * firstRow: string;
 * secondRow: string;
 * }} TableSummary
 *
 * @typedef {{
 * headerSummary: string;
 * briefSummary: string;
 * tableSummary: TableSummary[]
 * }} Content
 */

/**
 *
 * @param {{
 * data: {score: Score[]; content: Content};
 * handleSelectDetail: (value: 'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest') => void
 * }} param0
 * @returns
 */

const MultipleIntelligenceSection = ({ data, handleSelectDetail }) => {
  if (!data) return;

  // #region function
  const seeDetails = () => {
    handleSelectDetail("multipleIntelligence");
  };
  // #endregion

  // #region chart options
  const options = {
    maintainAspectRatio: true,
    barThickness: 16,
    tick: {
      maxRotation: 90,
      minRotation: 90,
      fontSize: 10,
    },
  };
  // #endregion

  return (
    <Fragment>
      <SectionHeader
        title="Multiple Intelligence"
        number={3}
        color="blue"
        seeDetails={seeDetails}
      />
      <VerticalChart
        dataScoreResult={data?.score}
        isBarOnly
        options={options}
      />
      <Grid container gap={1} mt={2} flexDirection="column">
        <Typography className={classes.contentTitle}>
          Rank #1 {data?.content?.headerSummary?.replace("Intelligence", "")}
        </Typography>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.briefSummary}
        </Typography>
      </Grid>
      <Grid container gap={1} mt={1} mb={2} flexDirection="column">
        <Grid className={classes.tableHeaderContainer}>
          <Typography>Key Characteristic</Typography>
        </Grid>
        {data?.content?.tableSummary?.map((data, index) => (
          <Grid container key={index} className={classes.tableContentContainer}>
            <Grid item xs={5} className={classes.tableLeftContent}>
              <Typography>{data?.firstRow}</Typography>
            </Grid>
            <Grid item xs={7} className={classes.tableRightContent}>
              <Typography>{data?.secondRow}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default MultipleIntelligenceSection;
