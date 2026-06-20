import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import classes from "../_OrderList.module.scss";

function SubOrderItem({ productIdx, productItem }) {
  const { image_url, qty, notes, product, total_price_string } = productItem;
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
    <Grid container className={classes.cardBodyBundle}>
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
          <Typography
            className={`${classes.titleProduct} ${classes.titleSplittedProduct}`}
          >
            {productTitle}
          </Typography>
          <Typography
            className={`${classes.priceProduct} ${classes.priceSplittedProduct}`}
          >
            {qty} x {total_price_string}
          </Typography>
          <Typography className={classes.noteProduct}>{notes}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SubOrderItem;
