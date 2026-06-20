import { Grid, Typography } from "@mui/material";
import React from "react";

// assets
import classes from "./_MultipleIntelligenceSection.module.scss";

// components
import VerticalChart from "../../../../../../../../../components/VerticalChart";
import SummarySection from "../SummaryCardSection";

/**
 * @typedef {{
 * header : string
 * score : number
 * }} ScoreTestResults
 *
 * @typedef {{
 * firstRow : string
 * secondRow : number
 * }} TableSummaryType
 *
 * @typedef {{
 * headerSummary : string
 * briefSummary : string
 * tableSummary : [TableSummaryType]
 * }} ContentType
 *
 * @param {{
 * score : ScoreTestResults
 * content : ContentType
 * onClick : () => void
 * }} props
 * @returns
 */
const MultipleIntelligenceSection = ({ score, content, onClick }) => {
  return (
    <SummarySection
      color="blue"
      number={3}
      title="Multiple Intelligence"
      onClick={onClick}
    >
      <div
        style={{
          height: "400px",
        }}
      >
        <VerticalChart dataScoreResult={score} isBarOnly />
      </div>
      <h6>Rank #1 {content?.headerSummary}</h6>

      <p className={classes.textDescription}>{content?.briefSummary}</p>

      <Grid container gap={1} mt={1} mb={2} flexDirection="column">
        <Grid className={classes.tableHeaderContainer}>
          <Typography>Key Characteristic</Typography>
        </Grid>

        {content?.tableSummary?.map((table, key) => (
          <Grid
            key={key}
            container
            direction="row"
            className={classes.tableContentContainer}
            gap={6}
          >
            <Grid item md={2} className={classes.tableLeftContent}>
              <Typography>{table.firstRow}</Typography>
            </Grid>
            <Grid item className={classes.tableRightContent}>
              <Typography>{table.secondRow}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </SummarySection>
  );
};

export default MultipleIntelligenceSection;
