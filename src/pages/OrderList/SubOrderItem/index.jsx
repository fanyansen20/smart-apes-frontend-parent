// React
import React from "react";

// MUI Components
import { Box, Grid, Paper, Typography } from "@mui/material";

// Helper
import { intToSGD } from "../../../helper/currency";

// Styles
import classes from "../OrderList.module.scss";

function SubOrderItem({
  productIdx,
  productItem,
  packageType,
  trackingCode,
  deliveryFee,
}) {
  const { image_url, qty, notes, product } = productItem;
  const productImageUrl =
    product?.active_variant_detail?.image_url ||
    image_url ||
    product?.cover_image_url;
  const variantTitle = product?.active_variant_detail?.variant_combo
    ?.map((combo) => combo?.value)
    ?.join(", ");
  const productTitle = `${product?.title}${
    variantTitle ? ` - ${variantTitle}` : ""
  }`;
  return (
    <Grid container className={classes.cardBody}>
      <Grid item md={1.3} className={classes.productSection}>
        <Paper
          variant="outlined"
          className={`${classes.imageThumbnail} ${classes.imageThumbnailSubOrder}`}
        >
          <img src={productImageUrl} width={75} alt="foto" />
        </Paper>
      </Grid>
      <Grid
        item
        pr={2.4}
        md={3.5}
        className={`${classes.productSection} ${
          productIdx === 0 && classes.productSectionDivider
        }`}
      >
        <Box>
          {/* {PRODUCT_TYPES.find((item) => item?.type === type)?.renderLabel()} */}
          <Typography
            className={`${classes.titleProduct} ${classes.titleSplittedProduct}`}
          >
            {productTitle}
          </Typography>
          <Typography
            className={`${classes.priceProduct} ${classes.priceSplittedProduct}`}
          >
            Quantity: {qty}
          </Typography>
          <Typography className={classes.noteProduct}>{notes}</Typography>
        </Box>
      </Grid>
      {productIdx === 0 && (
        <>
          <Grid item md={1.5} className={classes.addressSection}>
            <Typography className={classes.titleContent}>
              Package Type
            </Typography>
            <Typography className={classes.bodyContent}>
              {packageType?.toUpperCase() || "-"}
            </Typography>
          </Grid>
          <Grid item md={trackingCode ? 2.1 : 1.8}>
            <Typography className={classes.titleContent}>
              Tracking Code
            </Typography>
            <Typography className={classes.bodyContent} maxWidth={140}>
              {/* {shipment.tracking_number} */}
              {trackingCode || "-"}
            </Typography>
          </Grid>
          <Grid item md={1.6}>
            <Typography className={classes.titleContent}>
              Delivery Fee
            </Typography>
            <Typography className={classes.contentGrandTotal}>
              {intToSGD(deliveryFee)}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default SubOrderItem;
