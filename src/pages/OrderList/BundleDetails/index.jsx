// React
import React, { memo } from "react";

// MUI Components
import { Paper, Stack, Typography } from "@mui/material";

// Components
import SmartapesDialog from "../../../components/Dialog";

// Styles
import classes from "./BundleDetails.module.scss";

const BundleDetails = ({
  selectedBundle,
  openBundleDetails,
  setOpenBundleDetails,
}) => {
  const { name, items } = selectedBundle;

  const onClose = () => {
    setOpenBundleDetails(false);
  };

  return (
    <SmartapesDialog
      fullWidth
      maxWidth="sm"
      open={openBundleDetails}
      title={`${name} Details`}
      subTitle="This is all the product inside this bundle"
      onClose={onClose}
    >
      <Stack direction="column" spacing={2}>
        {items?.map((item, itemIdx) => (
          <Paper
            key={itemIdx}
            className={classes.productItemCard}
            variant="outlined"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Paper className={classes.imageThumbnail} variant="outlined">
                <img src={item?.image_url_500} alt={item?.title} />
              </Paper>

              <Stack direction="column" spacing={1}>
                <Typography className={classes.productTitle}>
                  {item?.title}
                </Typography>
                <Typography className={classes.productQty}>
                  Qty: {item?.qty}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </SmartapesDialog>
  );
};

export default memo(BundleDetails);
