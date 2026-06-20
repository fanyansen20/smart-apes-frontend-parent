// React
import React from "react";

// MUI Components
import { Paper, Stack, Typography } from "@mui/material";

// Components
import LinkText from "../../../../../components/link";

// Icons
import { ReactComponent as BundleIcon } from "../../../../../assets/icons/bundle.svg";

// Helper
import { intToSGD } from "../../../../../helper/currency";

// Styles
import classes from "./_BundleCard.module.scss";

const BundleCard = ({
  bundleTitle,
  bundleItems,
  singleBundle,
  onClickBundleDetails,
}) => {
  const bundleItemsLength = bundleItems?.length;
  const singleBundleProductsClass =
    singleBundle && classes.singleBundleProductTitle;

  return (
    <Paper variant="outlined" className={classes.bundleCard}>
      <Stack direction="column" spacing={2}>
        {/* Bundle Title */}
        <Stack direction="row" spacing={1} alignItems="center">
          <BundleIcon />
          <Typography className={classes.titleBundle}>{bundleTitle}</Typography>
        </Stack>

        {/* Bundle Item */}
        <Stack direction="row" spacing={1}>
          <Paper variant="outlined" className={classes.imageThumbnail}>
            <img src={bundleItems?.[0]?.image_url_500} />
          </Paper>

          <Stack
            className={singleBundle && classes.singleBundleContent}
            direction="column"
            justifyContent={singleBundle && "space-between"}
            spacing={1}
          >
            <Stack direction="column" spacing={0.5}>
              <Typography
                className={`${classes.titleProduct} ${singleBundleProductsClass}`}
              >
                {`${bundleItems?.[0]?.title}${
                  !singleBundle ? ` (+${bundleItemsLength - 1} More)` : ""
                }`}
              </Typography>

              {singleBundle && (
                <Typography className={classes.priceProduct}>
                  {bundleItems?.[0]?.qty} x {intToSGD(bundleItems?.[0]?.price)}
                </Typography>
              )}
            </Stack>

            {singleBundle && bundleItemsLength > 1 && (
              <LinkText underline="none" onClick={onClickBundleDetails}>
                See {bundleItemsLength - 1} More Products
              </LinkText>
            )}

            {!singleBundle && (
              <LinkText underline="none" onClick={onClickBundleDetails}>
                See Details
              </LinkText>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default BundleCard;
