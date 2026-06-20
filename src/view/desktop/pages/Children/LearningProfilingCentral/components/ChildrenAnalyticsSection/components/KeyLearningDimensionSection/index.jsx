import React from "react";

// assets
import classes from "./_KeyLearningDimensionSection.module.scss";

// components
import LeftRightBarChart from "../../../../../../../../../components/LeftRightBarChart";
import SummarySection from "../SummaryCardSection";

/**
 *
 *
 * @typedef {{
 * left : string
 * right : string
 * score : number
 * }} ScoreTestResults
 *
 * @param {{
 * summaryText : string
 * score : ScoreTestResults
 * onClick : () => void
 * }} props
 * @returns
 */
const KeyLearningDimensionSection = ({ score, summaryText, onClick }) => {
  return (
    <SummarySection
      color="pink"
      number={2}
      title="Key Learning Dimension"
      onClick={onClick}
    >
      <LeftRightBarChart removeCard removePin scoreTestResults={score} />
      <p className={classes.text}>{summaryText}</p>
    </SummarySection>
  );
};

export default KeyLearningDimensionSection;
