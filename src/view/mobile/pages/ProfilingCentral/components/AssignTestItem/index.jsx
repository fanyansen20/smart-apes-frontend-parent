import React, { memo } from "react";

// MUI
import { Grid, Radio, Typography } from "@mui/material";

// Styles
import classes from "./_AssignTestItem.module.scss";

/**
 *
 * @param {{
 * item: {package: string, qty: number};
 * itemSelected: boolean;
 * handleSelectPackage: (providerName: string, isRadioButton?: boolean) => void
 * }} param0
 * @returns
 */

const AssignTestItem = ({ item, itemSelected, handleSelectPackage }) => {
  return (
    <Grid
      container
      onClick={() => handleSelectPackage(item, true)}
      className={
        itemSelected ? classes.itemSelectedContainer : classes.itemContainer
      }
      xs={12}
      alignItems="center"
    >
      <Radio
        checked={itemSelected}
        className={itemSelected ? classes.radioActive : classes.radioInactive}
      />
      <div className={classes.itemContentContainer}>
        <Typography className={classes.title}>{item.package}</Typography>
        <Typography className={classes.subtitle}>
          {`Quantity: ${item.qty}`}
        </Typography>
      </div>
    </Grid>
  );
};

export default memo(AssignTestItem);
