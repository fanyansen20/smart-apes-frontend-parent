import React, { Fragment } from "react";

// MUI
import { Grid } from "@mui/material";

// Components
import DoughnutChart from "../../../../../../components/DoughnutChart";
import Paragraph from "../Paragraph";
import SummaryTitleContainer from "../SummaryTitleContainer";

// Styles
import classes from "./_SensorySection.module.scss";

/**
 * @param {{
 * data: {
 * score: import("../../../../../../types/summaryType").ScoreTestResults[];
 * content: import("../../../../../../types/summaryType").ContentTypeSensory
 * }
 * }} param0
 * @returns
 */

const SensorySection = ({ data }) => {
  if (!data) return;

  const dataScoreResultToArray =
    data?.score && Object?.entries(data?.score ?? {});

  const doughnutOptions = {
    datalabels: { fontSize: 14 },
    legend: { fontSize: 12 },
  };

  return (
    <Fragment>
      <SummaryTitleContainer title={data?.content?.header} />
      <DoughnutChart
        dataScoreResult={dataScoreResultToArray}
        options={doughnutOptions}
        className={classes.doughnutChart}
      />
      <Grid container gap={2} alignItems="center" justifyContent="center">
        {data?.content?.summary?.map((summaryData, index) => {
          return (
            <Fragment key={index}>
              <Paragraph
                title={`Rank #${index + 1} ${summaryData?.headerSummary}`}
                body={summaryData?.descriptionSummary}
              />
            </Fragment>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default SensorySection;
