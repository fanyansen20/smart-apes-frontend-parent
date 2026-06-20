import React from "react";

// assets
import { ReactComponent as TransparentPlanet } from "../../../../../../../assets/images/transparent-planet.svg";
import { ReactComponent as UfoOrange } from "../../../../../../../assets/images/ufo-orange.svg";
import classes from "./_SensorySection.module.scss";

// component
import DoughnutChart from "../../../../../../../components/DoughnutChart";
import {
  HeaderContent,
  SubHeaderContent,
} from "../../../../../../../components/TypographySummaryTest";

/**
 * @param {{
 * score : import("../../../../../../../types/summaryType").ScoreTestResults
 * content : import("../../../../../../../types/summaryType").ContentTypeSensory
 * }} props
 * @returns
 */

const SensorySection = ({ score, content }) => {
  const doughnutOptions = {
    datalabels: { fontSize: 25 },
    legend: { fontSize: 18 },
  };

  return (
    <div className={classes.sensoryContainer}>
      <TransparentPlanet className={classes.transparentPlanetBG} />
      <TransparentPlanet className={classes.transparentPlanetBG3} />

      <UfoOrange className={classes.ufoOrangeBG} />

      <HeaderContent title={content?.header} />

      <DoughnutChart dataScoreResult={score} options={doughnutOptions} />

      {content.summary?.map((value, key) => (
        <div key={key} className={classes.contentSummaryResult}>
          <SubHeaderContent
            subTitle={`RANK #${key + 1} ${value.headerSummary}`}
          />

          {value.descriptionSummary?.map((value, key) => (
            <p key={key} className={classes.textContent}>
              {value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SensorySection;
