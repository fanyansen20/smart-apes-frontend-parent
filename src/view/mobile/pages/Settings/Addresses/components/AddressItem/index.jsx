import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_AddressItem.module.scss";

/**
 *
 * @param {{
 * data: any;
 * navigate: (id: string) => void;
 * }} param0
 */
const AddressItem = ({ data, navigate }) => {
  const {
    id,
    name,
    is_default,
    receiver_name,
    address_detail,
    receiver_phone,
    country_name,
    postal_code,
  } = data;

  return (
    <Grid
      container
      className={classes.addressContainer}
      gap={1}
      onClick={() => navigate(id)}
    >
      <Grid container gap={1}>
        <div className={classes.labelContainer}>{name}</div>
        {is_default && <div className={classes.primaryContainer}>Primary</div>}
      </Grid>
      <Grid container flexDirection="column" gap={1}>
        <Typography className={classes.title}>{receiver_name}</Typography>
        <Typography className={classes.subtitle}>{receiver_phone}</Typography>
        <div>
          <Typography className={classes.subtitle}>{address_detail}</Typography>
          <Typography className={classes.subtitle}>
            {postal_code}, {country_name}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddressItem;
