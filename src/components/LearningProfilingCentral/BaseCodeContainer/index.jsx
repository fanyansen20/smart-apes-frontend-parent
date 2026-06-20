import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_BaseCodeContainer.module.scss";

// Assets
import { ReactComponent as BaseCodeHeader } from "../../../assets/images/base-code-header.svg";
import { ReactComponent as CheckIcon } from "../../../assets/images/ChildrenDashboard/summary-test/check-circle-filled.svg";

/**
 *
 * @param {{
 * baseCode: string;
 * codes: string[]
 * }} param0
 */

const BaseCodeContainer = ({ baseCode, codes }) => {
  if (!codes) return;

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid container xs={12} md={8} className={classes.container}>
        <BaseCodeHeader className={classes.img} />
        <Typography className={classes.baseCodeTitle}>{baseCode}</Typography>
        <Grid xs={12} className={classes.codeList}>
          {codes?.map((el, index) => (
            <Typography key={index}>
              <CheckIcon className={classes.checkedIcon} />
              {el}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BaseCodeContainer;
