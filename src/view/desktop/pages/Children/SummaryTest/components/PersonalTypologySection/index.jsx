import React from "react";

// component
import LeftRightBarChart from "../../../../../../../components/LeftRightBarChart";
import {
  HeaderContent,
  SubHeaderContent,
} from "../../../../../../../components/TypographySummaryTest";

// assets
import { ReactComponent as TransparentPlanet } from "../../../../../../../assets/images/transparent-planet.svg";
import classes from "./_PersonalTypologySection.module.scss";

/**
 * @param {{
 * score : import("../../../../../../../types/summaryType").ScoreRightLeftTestResults
 * content : import("../../../../../../../types/summaryType").ContentTypePersonality
 * }} param0
 * @returns
 */
const PersonalTypologySection = ({ score, content }) => {
  return (
    <div className={classes.containerTypology}>
      <TransparentPlanet className={classes.transparentPlanetBG} />

      <HeaderContent title={content?.header} />

      <div className={classes.contentSummary}>
        {content?.icon && (
          <img src={content?.icon} alt="illustration summary" />
        )}

        <div className={classes.textContent}>
          <h6>{content?.domain}</h6>
          <p>{content?.personality}</p>
        </div>
      </div>

      <LeftRightBarChart title="Typology Chart" scoreTestResults={score} />

      <SubHeaderContent subTitle={content?.summary?.header} />

      <div className={classes.textSummaryContent}>
        {content?.summary?.description?.map((value, key) => (
          <p key={key} className={classes.titleHowTheyLearn}>
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PersonalTypologySection;
