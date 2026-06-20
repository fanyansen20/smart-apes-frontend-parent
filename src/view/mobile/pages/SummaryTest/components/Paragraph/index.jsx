import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import { SubHeaderContent } from "../../../../../../components/TypographySummaryTest";

// Styles
import classes from "./_Paragraph.module.scss";

/**
 *
 * @param {{
 * title: string;
 * body: string[];
 * }} param0
 * @returns
 */

const Paragraph = ({ title, body }) => {
  return (
    <Grid container gap={1} alignItems="center" justifyContent="center">
      <SubHeaderContent subTitle={title} />
      <Grid>
        {body?.map((text, index) => (
          <Typography key={index} className={classes.paragraph}>
            {text}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default Paragraph;
