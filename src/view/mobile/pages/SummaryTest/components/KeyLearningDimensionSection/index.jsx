import React, { Fragment } from "react";

// MUI
import { Grid } from "@mui/material";

// Components
import LeftRightBarChart from "../../../../../../components/LeftRightBarChart";
import { SubHeaderContent } from "../../../../../../components/TypographySummaryTest";
import BorderContentContainer from "../BorderContentContainer";
import SummaryTitleContainer from "../SummaryTitleContainer";

/**
 * @param {{
 * data: {
 * score: import("../../../../../../types/summaryType").ScoreRightLeftTestResults[];
 * content: import("../../../../../../types/summaryType").ContentTypeKLD
 * };
 * }} param0
 * @returns
 */

const KeyLearningDimensionSection = ({ data }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.values(data?.score ?? {});

  return (
    <Fragment>
      <SummaryTitleContainer title={data?.content?.header} />
      <LeftRightBarChart scoreTestResults={dataScoreResult} />
      {data?.content?.summary?.map((summaryData, index) => (
        <Grid
          key={index}
          container
          gap={1}
          alignItems="center"
          justifyContent="center"
        >
          <SubHeaderContent subTitle={summaryData?.header} />
          <BorderContentContainer
            title={summaryData?.subheader}
            description={
              index === 0
                ? `Let's dive into the world of learning styles and personalities, but with a fun twist!`
                : undefined
            }
            data={summaryData?.body}
            type={summaryData?.type}
            iconType={summaryData?.header}
          />
        </Grid>
      ))}
    </Fragment>
  );
};

export default KeyLearningDimensionSection;
