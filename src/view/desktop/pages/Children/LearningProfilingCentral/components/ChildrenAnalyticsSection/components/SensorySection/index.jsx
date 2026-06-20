import { Grid } from "@mui/material";
import React from "react";

// assets
import classes from "./_SensorySection.module.scss";

// components
import DoughnutChart from "../../../../../../../../../components/DoughnutChart";
import SummarySection from "../SummaryCardSection";

/**
 * @typedef {{
 * header : string
 * score : number
 * }} ScoreTestResults
 *
 * @typedef {{
 * headerSummary : string
 * descriptionSummary : string
 * }} ContentType
 *
 * @param {{
 * score : ScoreTestResults
 * content : ContentType
 * onClick : () => void
 * }} props
 * @returns
 */
const SensorySection = ({ score, content, onClick }) => {
  const doughnutOptions = {
    datalabels: { fontSize: 14 },
    legend: { fontSize: 12 },
  };

  return (
    <SummarySection color="green" number={4} title="Sensory" onClick={onClick}>
      <Grid
        container
        direction="row"
        gap={8}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Grid item md={3}>
          <DoughnutChart
            className={classes.doughnutChart}
            options={doughnutOptions}
            dataScoreResult={score}
          />
        </Grid>
        <Grid item container gap={2} direction="column" mt={1}>
          <h6>{content?.headerSummary} Leaner</h6>
          <p className={classes.summaryDescription}>
            {content.descriptionSummary}
          </p>
        </Grid>
      </Grid>
    </SummarySection>
  );
};

export default SensorySection;
