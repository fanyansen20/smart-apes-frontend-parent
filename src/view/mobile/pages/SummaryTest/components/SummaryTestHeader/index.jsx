import React, { Fragment } from "react";

// MUI
import { Divider, Grid } from "@mui/material";

// Assets
import { ReactComponent as SmartApesLogo } from "../../../../../../assets/images/brand.svg";
import { ReactComponent as GripLearningLogo } from "../../../../../../assets/images/grip-learning-brand.svg";

const TestSummaryHeader = () => {
  return (
    <Fragment>
      <Grid container alignItems="center" gap={3} justifyContent="center">
        <Grid>
          <GripLearningLogo />
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid>
          <SmartApesLogo />
        </Grid>
      </Grid>
      <Divider orientation="horizontal" flexItem />
    </Fragment>
  );
};

export default TestSummaryHeader;
