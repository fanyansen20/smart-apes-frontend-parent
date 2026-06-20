import React from "react";

// assets
import { ReactComponent as PinRedIcon } from "../../assets/images/ChildrenDashboard/summary-test/pin-red-icon.svg";
import classes from "./_LeftRightBarChart.module.scss";

/**
 * @param {{
 * title : string
 * scoreTestResults : import('../../types/summaryType').ScoreRightLeftTestResults[]
 * removeCard: boolean;
 * removePin: boolean
 * }} param0
 * @returns {JSX.Element}
 */

const LeftRightBarChart = ({
  scoreTestResults,
  title,
  removeCard,
  removePin,
}) => {
  /**
   * @param {number} score
   */
  const percentageScore = (score) => {
    if (score === 0) {
      return {
        left: 50,
        right: 50,
      };
    }

    const right = score * 5 + 50;
    const left = 100 - right;

    return {
      left,
      right,
    };
  };

  return (
    <div
      className={
        removeCard ? classes.normalContainer : classes.containerChartCard
      }
    >
      {!removePin && <PinRedIcon className={classes.pinRedIcon} />}

      {title && (
        <h4 className={removeCard ? classes.normalTitle : classes.title}>
          {title}
        </h4>
      )}

      {scoreTestResults?.map((value, key) => (
        <div key={key} className={classes.containerChartHorizontal}>
          <p className={classes.textLeft}>{value.left}</p>
          <div className={classes.chartHorizontalSection}>
            <div
              className={classes.leftBar}
              style={{ width: `${percentageScore(value?.score).left}%` }}
            >
              {percentageScore(value?.score).left > 0 &&
                `${percentageScore(value?.score).left}%`}
            </div>
            <div
              className={classes.rightBar}
              style={{ width: `${percentageScore(value?.score).right}%` }}
            >
              {percentageScore(value?.score).right > 0 &&
                `${percentageScore(value?.score).right}%`}
            </div>
          </div>
          <p>{value.right}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftRightBarChart;
