import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Grid } from "@mui/material";

// Components
import PrimaryButton from "../../../../../../components/PrimaryButton";

// Styles
import classes from "./_SummaryTestFooter.module.scss";

// Assets
import { ReactComponent as Footer } from "../../../../../../assets/images/footer-summary-test.svg";

/**
 * @param {{
 * buttonOnly?: boolean;
 * }} param0
 * @returns
 */

const SummaryTestFooter = ({ buttonOnly }) => {
  const navigate = useNavigate();
  const { childrenId } = useParams();

  // #region function
  const navigateToLearningProfileCentral = () => {
    navigate(`/children/${childrenId}/learning-profiling-central?tab=history`);
  };
  // #endregion

  return (
    <Grid item xs={12} className={classes.containerFooterSummaryTest}>
      {!buttonOnly && <Footer className={classes.imageFooterSummaryTest} />}
      <PrimaryButton fullWidth onClick={navigateToLearningProfileCentral}>
        Go to Learning Profile Central
      </PrimaryButton>
    </Grid>
  );
};

export default SummaryTestFooter;
