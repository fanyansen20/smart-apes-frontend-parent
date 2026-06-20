import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import VerticalChart from "../../../../../../components/VerticalChart";
import Paragraph from "../Paragraph";
import SummaryTitleContainer from "../SummaryTitleContainer";

// Styles
import classes from "./_MultipleIntelligenceSection.module.scss";

/**
 * @param {{
 * data: {
 * score: import("../../../../../../types/summaryType").ScoreTestResults;
 * content: import("../../../../../../types/summaryType").ContentTypeMI;
 * }
 * }} param0
 * @returns
 */

const MultipleIntelligenceSection = ({ data }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.values(data?.score ?? {});

  const options = {
    tick: {
      fontSize: 12,
    },
  };

  return (
    <Fragment>
      <SummaryTitleContainer title={data?.content?.header} />
      <VerticalChart dataScoreResult={dataScoreResult} options={options} />
      <Grid container gap={2} alignItems="center" justifyContent="center">
        {data?.content?.summary?.map((summaryData, index) => {
          return (
            <Fragment key={index}>
              <Paragraph
                title={`Rank #${index + 1} ${summaryData?.headerSummary}`}
                body={[summaryData?.briefSummary]}
              />
              <Grid container className={classes.tableContainer}>
                <Grid item xs={1} className={classes.leftContainer}>
                  <Typography className={classes.leftTitle}>
                    Key Characteristics
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  {summaryData?.tableSummary?.map((tableSummaryData, index) => {
                    return (
                      <Grid key={index} container>
                        <Grid
                          item
                          xs={4}
                          className={classes.contentTitleContainer}
                        >
                          <Typography className={classes.contentTitle}>
                            {tableSummaryData.firstRow}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          className={classes.contentValueContainer}
                        >
                          <Typography className={classes.contentValue}>
                            {tableSummaryData.secondRow}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default MultipleIntelligenceSection;
