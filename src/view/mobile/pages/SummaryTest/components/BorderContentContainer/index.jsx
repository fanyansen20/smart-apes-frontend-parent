import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_BorderContentContainer.module.scss";

// Assets
import { ReactComponent as CheckedCircle } from "../../../../../../assets/images/ChildrenDashboard/summary-test/check-circle-filled.svg";

// Constants
import { IconImage } from "../../../../../desktop/pages/Children/SummaryTest/components/KeyLearningDimensionSection/CardKld/IconHeaderConstant";

/**
 *
 * @param {{
 * title: string;
 * description?: string;
 * data: string[];
 * type: "list" | "paragraph";
 * iconType: string;
 * }} param0
 * @returns
 */

const BorderContentContainer = ({
  title,
  description,
  data,
  type,
  iconType,
}) => {
  return (
    <Grid container className={classes.container}>
      <Grid item gap={1} xs={8} className={classes.fixedContainer}>
        {IconImage[iconType]}
        <Typography className={classes.fixedContainerTitle}>{title}</Typography>
      </Grid>
      <Grid
        container
        className={classes.contentContainer}
        justifyContent="center"
        alignItems="center"
      >
        {description && (
          <Grid item xs={10} mb={1}>
            <Typography className={classes.contentTitle}>
              {description}
            </Typography>
          </Grid>
        )}
        <Grid container gap={1}>
          {data?.map((text, index) => (
            <div key={index} className={classes.row}>
              {type === "list" && (
                <CheckedCircle className={classes.checkedIcon} />
              )}
              <Typography className={classes.contentText}>{text}</Typography>
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BorderContentContainer;
