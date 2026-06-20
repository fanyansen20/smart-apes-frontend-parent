import React from "react";

// mui material
import { Grid } from "@mui/material";

// assets
import classes from "./_CareerInterestSection.module.scss";

// component
import BaseCodeContainer from "../../../../../../../components/LearningProfilingCentral/BaseCodeContainer";
import HeroPodiumSection from "../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/HeroPodiumSection";
import HorizontalBarChart from "../../../../../../../components/LearningProfilingCentral/HorizontalBarChart";
import {
  HeaderContent,
  SubHeaderContent,
} from "../../../../../../../components/TypographySummaryTest";

/**
 * @param {{
 * score : import("../../../../../../../types/summaryType").ScoreTestResults
 * content : import("../../../../../../../types/summaryType").ContentTypeCareer
 * }} param0
 * @returns
 */

const CareerInterestSection = ({ score, content }) => {
  if (!score || !content) return;

  return (
    <>
      <HeaderContent title={content?.header} />

      <Grid
        container
        direction="column"
        gap={4}
        alignItems="center"
        wrap="nowrap"
      >
        <p className={classes.textContent}>
          These are the result from the Career Interest. Your scores for each of
          the 6 basic interest areas are below.
        </p>

        <Grid sx={{ width: "100%" }}>
          <HorizontalBarChart
            dataScoreResult={score}
            options={{
              barThickness: 60,
              ticks: { yFontSize: 16, xFontSize: 16 },
              datalabels: {
                fontSize: 16,
              },
            }}
          />
        </Grid>

        <SubHeaderContent subTitle="Career Interest Type" />

        <Grid className={classes.careerInterestType}>
          <p>
            Your highest score was for the <b>{content.interest}</b>{" "}
            occupational interest. A persons top three interest areas are
            sometimes called
          </p>
          <p>their “GRIP Career Interest Type”. This would make your code</p>
        </Grid>

        <HeroPodiumSection
          firstPodium={content?.interestAreas[0]?.charAt(0)}
          secondPodium={content?.interestAreas[1]?.charAt(0)}
          thirdPodium={content?.interestAreas[2]?.charAt(0)}
          interestAreas={content.interestAreas}
        />

        <h6 className={classes.headerSummary}>{content.summary.header}</h6>

        <p className={classes.descriptionSummary}>
          {content.summary.description}
        </p>

        <BaseCodeContainer
          baseCode={content.summary.baseCode}
          codes={content.summary.codes}
        />
      </Grid>
    </>
  );
};

export default CareerInterestSection;
