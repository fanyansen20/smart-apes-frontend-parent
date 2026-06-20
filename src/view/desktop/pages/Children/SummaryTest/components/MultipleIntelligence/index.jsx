import React from "react";

// assets
import { ReactComponent as TransparentPlanet } from "../../../../../../../assets/images/transparent-planet.svg";
import { ReactComponent as UfoOrange } from "../../../../../../../assets/images/ufo-orange.svg";
import classes from "./_MultipleIntelligence.module.scss";

// components
import { HeaderContent } from "../../../../../../../components/TypographySummaryTest";
import VerticalChart from "../../../../../../../components/VerticalChart";
import DetailMiSummary from "./DetailMiSummary";

/**
 * @param {{
 * score : import("../../../../../../../types/summaryType").ScoreTestResults
 * content : import("../../../../../../../types/summaryType").ContentTypeMI
 * }} props
 * @returns
 */

const MultipleIntelligence = ({ score, content }) => {
  return (
    <div className={classes.containerMultipleIntelligence}>
      <TransparentPlanet className={classes.transparentPlanetBG} />
      <TransparentPlanet className={classes.transparentPlanetBG2} />
      <TransparentPlanet className={classes.transparentPlanetBG3} />

      <UfoOrange className={classes.ufoOrangeBG} />

      <HeaderContent title={content?.header} />

      <VerticalChart dataScoreResult={score} />

      {content?.summary?.map((value, key) => (
        <div key={key}>
          <DetailMiSummary
            title={`RANK #${key + 1} ${value?.headerSummary}`}
            briefSummary={value?.briefSummary}
            tableSummary={value?.tableSummary}
          />
        </div>
      ))}
    </div>
  );
};

export default MultipleIntelligence;
