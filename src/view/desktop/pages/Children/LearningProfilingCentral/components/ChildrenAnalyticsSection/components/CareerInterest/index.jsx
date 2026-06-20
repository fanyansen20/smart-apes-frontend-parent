import React from "react";

// assets
import classes from "./_CareerInterest.module.scss";

// components
import HeroPodiumSection from "../../../../../../../../../components/LearningProfilingCentral/ChildrenAnalytics/HeroPodiumSection";
import HorizontalBarChart from "../../../../../../../../../components/LearningProfilingCentral/HorizontalBarChart";
import SummarySection from "../SummaryCardSection";

/**
 * @typedef {{
 * header : string
 * score : number
 * }} ScoreTestResults
 *
 * @typedef {{
 * header : string
 * description : string
 * baseCode : string
 * codes : [string]
 * }} SummaryType
 *
 * @typedef {{
 * interest : string
 * interestAreas : [string]
 * summary : SummaryType
 * }} ContentType
 *
 * @param {{
 * score : ScoreTestResults
 * content : ContentType
 * onClick : () => void
 * }} props
 * @returns
 */
const CareerInterest = ({ score, content, onClick }) => {
  return (
    <SummarySection
      color="purple"
      number={5}
      title="Career Interest"
      onClick={onClick}
    >
      <HorizontalBarChart
        dataScoreResult={score}
        options={{
          ticks: { yFontSize: 16, xFontSize: 16 },
          datalabels: {
            fontSize: 16,
          },
        }}
      />

      <h6>Career Type</h6>

      <p className={classes.textParagraph}>
        Your highest score was for the
        <b> {content.interest} </b>
        occupational interest. A persons top three interests areas are sometimes
        called their “GRIP Learning Type”. This would make your code
      </p>

      <HeroPodiumSection
        firstPodium={content.interestAreas[0].charAt(0)}
        secondPodium={content.interestAreas[1].charAt(0)}
        thirdPodium={content.interestAreas[2].charAt(0)}
        interestAreas={content.interestAreas}
      />

      <h6>{content.summary.header}</h6>
      <p className={classes.textParagraph}>{content.summary.description}</p>

      <p className={classes.textParagraph}>{content.summary.baseCode}</p>

      <div className={classes.containerCodesSummary}>
        {content.summary.codes.map((value, key) => (
          <li key={key}>{value}</li>
        ))}
      </div>
    </SummarySection>
  );
};

export default CareerInterest;
