import React from "react";

// assets
import { ReactComponent as TransparentPlanet } from "../../../../../../../assets/images/transparent-planet.svg";
import { ReactComponent as UfoOrange } from "../../../../../../../assets/images/ufo-orange.svg";
import classes from "./_KeyLearningDimensionSection.module.scss";

// components
import LeftRightBarChart from "../../../../../../../components/LeftRightBarChart";
import { HeaderContent } from "../../../../../../../components/TypographySummaryTest";
import CardKld from "./CardKld";

/**
 * @param {{
 * score : import("../../../../../../../types/summaryType").ScoreRightLeftTestResults
 * content : import("../../../../../../../types/summaryType").ContentTypeKLD
 * }} param0
 * @returns
 */

const KeyLearningDimensionSection = ({ content, score }) => {
  return (
    <div className={classes.containerKeyLearningDimension}>
      <TransparentPlanet className={classes.transparentPlanetBG} />
      <TransparentPlanet className={classes.transparentPlanetBG2} />
      <TransparentPlanet className={classes.transparentPlanetBG3} />

      <UfoOrange className={classes.ufoOrangeBG} />

      <HeaderContent title={content?.header} />

      <LeftRightBarChart scoreTestResults={score} />

      {content?.summary?.map((value, key) => (
        <CardKld key={key} summaryData={value} />
      ))}
    </div>
  );
};

export default KeyLearningDimensionSection;
