import React, { Fragment } from "react";

// Components
import LeftRightBarChart from "../../../../../../components/LeftRightBarChart";
import SummaryParagraph from "../Paragraph";
import PersonalTypologyContainer from "../PersonalTypologyContainer";
import SummaryTitleContainer from "../SummaryTitleContainer";

/**
 * @param {{
 * data: {
 * score: import("../../../../../../types/summaryType").ScoreRightLeftTestResults[];
 * content: import("../../../../../../types/summaryType").ContentTypePersonality
 * }
 * }} param0
 * @returns
 */
const PersonalTypologySection = ({ data }) => {
  if (!data) return;

  const dataScoreResult = data?.score && Object?.values(data?.score ?? {});

  return (
    <Fragment>
      <SummaryTitleContainer title={data?.content?.header} />
      <PersonalTypologyContainer
        icon={data?.content?.icon}
        domain={data?.content?.domain}
        summary={data?.content?.personality}
      />
      <LeftRightBarChart
        title="Typology Chart"
        scoreTestResults={dataScoreResult}
      />
      <SummaryParagraph
        title={data?.content?.summary?.header}
        body={data?.content?.summary?.description}
      />
    </Fragment>
  );
};

export default PersonalTypologySection;
