import React, { Fragment } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Component
import BaseCodeContainer from "../../../../../../components/LearningProfilingCentral/BaseCodeContainer";
import HeroPodiumSection from "../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/HeroPodiumSection";
import HorizontalBarChart from "../../../../../../components/LearningProfilingCentral/HorizontalBarChart";
import SummaryTitleContainer from "../SummaryTitleContainer";

// Components
import { SubHeaderContent } from "../../../../../../components/TypographySummaryTest";

// Styles
import classes from "./_CareerInterestSection.module.scss";

/**
 *
 * @param {{
 * data: {
 * score: import("../../../../../../types/summaryType").ScoreTestResults[]
 * content: import("../../../../../../types/summaryType").ContentTypeCareer;
 * }
 * }} param0
 * @returns
 */

const CareerInterestSection = ({ data }) => {
  if (!data) return;

  // #region bar option
  const options = {
    barThickness: 16,
    ticks: {
      xPadding: 16,
      yPadding: 4,
    },
    datalabels: {
      fontSize: 8,
    },
  };
  // #endregion

  return (
    <Fragment>
      <SummaryTitleContainer title="Career Interest" />
      <Grid container gap={1} mt={1} mb={2}>
        <Typography className={[classes.contentSubtitle, classes.textCenter]}>
          These are the result from the Career Interest. Your scores for each of
          the 6 basic interest areas are below.
        </Typography>
        {data?.score && (
          <HorizontalBarChart dataScoreResult={data?.score} options={options} />
        )}
        <Grid container gap={1} mt={1.5} justifyContent="center">
          <SubHeaderContent subTitle="Career Interest Type" />
          <Typography
            mb={1}
            className={[classes.contentSubtitle, classes.textCenter]}
          >
            Your highest score was for the
            <b> {data?.content?.interest} </b>
            occupational interest. A persons top three interests areas are
            sometimes called their “GRIP Learning Type”. This would make your
            code
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Grid xs={10}>
            <HeroPodiumSection
              firstPodium={data?.content?.interestAreas[0]?.charAt(0)}
              secondPodium={data?.content?.interestAreas[1]?.charAt(0)}
              thirdPodium={data?.content?.interestAreas[2]?.charAt(0)}
              interestAreas={data?.content?.interestAreas}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mt={1}>
          <Typography className={classes.summaryHeader}>
            {data?.content?.summary?.header}
          </Typography>
        </Grid>
        <Typography className={classes.contentSubtitle}>
          {data?.content?.summary?.description}
        </Typography>
        <BaseCodeContainer
          codes={data?.content?.summary?.codes}
          baseCode={data?.content?.summary?.baseCode}
        />
      </Grid>
    </Fragment>
  );
};

export default CareerInterestSection;
