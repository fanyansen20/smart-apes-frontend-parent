import React from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import { Grid, Typography } from "@mui/material";

// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../../Dashboard/components/ModalQuickTips/quickTipsConstant";

// Components
import ProfilingProductCard from "../../../../../../components/ProfilingProductCard";

// Styles
import classes from "./_PackageList.module.scss";

const PackageList = () => {
  // #region redux state
  const { dataProduct: dataTestProduct } = useSelector(
    (store) => store.productProfilingTest
  );
  // #endregion

  const CustomDot = ({ onClick, active }) => {
    return (
      <div
        className={active ? classes.activeDot : classes.inactiveDot}
        onClick={() => onClick()}
      />
    );
  };

  return (
    <Grid xs={12} className={classes.container}>
      <Grid className={classes.titleContainer} xs={12}>
        {/* Section Title */}
        <Grid className={classes.title}>
          <Typography>Buy Another Package</Typography>
        </Grid>
      </Grid>
      <Carousel
        arrows={false}
        showDots
        customDot={<CustomDot />}
        containerClass={classes.carouselContainer}
        responsive={responsive}
      >
        {dataTestProduct?.map((item, index) => (
          <ProfilingProductCard
            key={index}
            idProduct={item.id}
            slug={item.slug}
            title={item?.title}
            benefitData={item?.desc}
            realPrice={item?.main_variant?.base_price_string}
            totalPrice={item?.main_variant?.price_string}
            discountPercentage={item?.main_variant?.discount?.percent}
            containerStyle={classes.itemContainer}
            wrapperStyle={classes.wrapperContainer}
          />
        ))}
      </Carousel>
    </Grid>
  );
};

export default PackageList;
