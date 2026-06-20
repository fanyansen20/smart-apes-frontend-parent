import React from "react";

// styles
import classes from "./_TypographySummaryTest.module.scss";

/**
 * @param {{
 * title : 'Personal Typology' | 'Key Learning Dimensions' | 'Multiple Intelligence' | 'Sensory'
 * }} props
 * @returns {JSX.Element}
 */
export const HeaderContent = ({ title = "Write Your Title Summary" }) => {
  return (
    <div className={classes.headerContent}>
      <p>{title}</p>
    </div>
  );
};

/**
 * @param {{
 * subTitle : string
 * }} props
 * @returns {JSX.Element}
 */

export const SubHeaderContent = ({ subTitle }) => {
  return (
    <div className={classes.subHeaderContent}>
      <p>{subTitle}</p>
    </div>
  );
};
