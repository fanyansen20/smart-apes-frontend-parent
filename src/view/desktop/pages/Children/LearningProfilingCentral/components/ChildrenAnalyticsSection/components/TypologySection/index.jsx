import React from "react";

// mui material
import { Grid } from "@mui/material";

// styles
import classes from "./_TypologySection.module.scss";

// component
import LeftRightBarChart from "../../../../../../../../../components/LeftRightBarChart";
import SummarySection from "../SummaryCardSection";

/**
 *
 * @typedef {{
 * left : string
 * right : string
 * score : number
 * }} ScoreTestResults
 *
 * @param {{
 * icon : string
 * score : ScoreTestResults
 * personalityText : string
 * header : string
 * body : [string]
 * onClick : () => void
 * }} param0
 * @returns
 */

const TypologySection = ({
  icon,
  personalityText,
  score,
  header,
  body,
  onClick,
}) => {
  if (!icon && !personalityText && !score && !header && !body && !onClick)
    return;

  return (
    <SummarySection
      title="Typology"
      number={1}
      color="orange"
      onClick={onClick}
    >
      <Grid container direction="row" className={classes.personalityCard}>
        <Grid item md={2}>
          {icon && <img src={icon} alt="image analytics" />}
        </Grid>

        <Grid
          item
          md={10}
          container
          justifyContent="center"
          direction="column"
          gap={1}
        >
          <h6>About your personality</h6>
          <p>{personalityText}</p>
        </Grid>
      </Grid>

      <Grid container gap={3} direction="column" px={2}>
        <h6>Typology Chart</h6>

        <LeftRightBarChart removeCard removePin scoreTestResults={score} />

        <div className={classes.personalityText}>
          <h6>{header}</h6>
          <p>{body}</p>
        </div>
      </Grid>
    </SummarySection>
  );
};

export default TypologySection;
