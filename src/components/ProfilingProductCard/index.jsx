import React, { memo } from "react";

// mui materials
import { Grid } from "@mui/material";

// icon
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";

// components
import PrimaryButton from "../PrimaryButton";

// style
import handlerRedirectToMarketPlace from "../../helper/redirectToMarketplace";
import classes from "./_ProfilingProductCard.module.scss";

/**
 *
 * @param {{
 * idProduct : string
 * slug : string
 * benefitData : string
 * title : string
 * realPrice : string
 * totalPrice : string
 * discountPercentage : string
 * containerStyle?: string;
 * wrapperStyle?: string;
 * }} props
 * @returns
 */
const ProfilingProductCard = ({
  idProduct,
  slug,
  title,
  realPrice,
  totalPrice,
  discountPercentage,
  benefitData,
  containerStyle,
  wrapperStyle,
}) => {
  const benefitList = JSON.parse(benefitData) || [];

  return (
    <Grid m={2} className={[classes.wrapper, wrapperStyle]}>
      <Grid className={containerStyle ?? classes.containerCardPrice}>
        <span className={classes.discountLabel}>{discountPercentage}% OFF</span>
        <p className={classes.titlePProduct}>{title}</p>
        <Grid container justifyContent="center" alignItems="center" gap={1}>
          <p className={classes.realPrice}>{realPrice}</p>
          <p className={classes.totalPrice}>{totalPrice}</p>
        </Grid>

        <a
          style={{
            width: "100%",
          }}
          href={handlerRedirectToMarketPlace(
            `/profiling-test/checkout?type=${slug}&item_id=${idProduct}`
          )}
        >
          <PrimaryButton fullWidth>Purchase Test</PrimaryButton>
        </a>
        {benefitList?.benefit?.map((item, key) => (
          <Grid
            container
            gap={1}
            key={key}
            className={classes.benefitSection}
            alignItems="center"
          >
            <CheckIcon sx={{ color: "#7e54f1" }} />
            <p className={classes.textBenefit}>{item.text}</p>
            {item.isTooltip && (
              <InfoIcon fontSize="inherit" sx={{ color: "#D6D6D6" }} />
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default memo(ProfilingProductCard);
