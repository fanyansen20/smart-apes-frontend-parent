// React
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";

// Style
import classes from "./_ProductCard.module.scss";

// Components
import LinkText from "../../../../../components/link";

// Icon
import { ReactComponent as StoreIcon } from "../../../../../assets/icons/store.svg";

// Const
import { STATUS } from "../../OrderList/constants";

// Helper
import { checkValue } from "../../../../../helper/checkValue";

const renderProductItem = ({
  product: {
    qty,
    notes,
    product,
    title,
    image_url,
    price_string,
    total_price_string,
  },
  access_code,
  subOrderData,
}) => {
  const variantTitle = product?.active_variant_detail?.variant_combo
    ?.map((combo) => combo?.value)
    ?.join(", ");
  const productTitle =
    access_code?.title ||
    subOrderData?.title ||
    `${title}${variantTitle ? ` - ${variantTitle}` : ""}`;
  const imageUrl =
    image_url || access_code?.cover_image_url || subOrderData?.image_url;
  const priceProduct =
    price_string ||
    total_price_string ||
    access_code?.final_price_string ||
    subOrderData?.price_string;
  const productQty = qty || subOrderData?.qty;

  return (
    <Grid container className={classes.cardBody} justifyContent="space-between">
      <Grid item md={5} className={`${classes.productSection} `} gap={1}>
        <>
          <Paper variant="outlined" className={classes.imageThumbnail}>
            <img src={imageUrl} width={75} alt="image product" />
          </Paper>
          <Stack direction="column" mr={1.5}>
            <Typography className={classes.titleProduct}>
              {productTitle}
            </Typography>
            <Typography className={classes.priceProduct}>
              {productQty} x {priceProduct}
            </Typography>
            <Typography className={classes.noteProduct}>{notes}</Typography>
          </Stack>
        </>
      </Grid>
    </Grid>
  );
};

const DeliveryDetails = ({ productData }) => {
  const deliveryServiceFullName = `${productData?.delivery_service?.company_name} ${productData?.delivery_service?.name}`;

  return (
    <Grid container sx={12}>
      <Stack
        direction="column"
        columnGap={8}
        className={classes.deliveryDetailContainer}
      >
        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>
            Delivery Services
          </Typography>
          <Typography className={classes.deliveryDetailText}>
            {deliveryServiceFullName}
          </Typography>
        </div>

        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>Price</Typography>
          <Typography className={classes.deliveryDetailText}>
            {checkValue(productData?.total_base_price_string)}
          </Typography>
        </div>

        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>
            Delivery Cost
          </Typography>
          <Typography className={classes.deliveryDetailText}>
            {checkValue(productData?.total_delivery_fee_string)}
          </Typography>
        </div>

        <Divider
          sx={{ borderStyle: "dashed", marginY: "10px" }}
          variant="middle"
        />

        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>
            Sub Total
          </Typography>
          <Typography className={classes.deliveryDetailText}>
            {checkValue(productData?.sub_total_price_string)}
          </Typography>
        </div>

        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>
            Discount
          </Typography>
          <Typography className={classes.deliveryDetailText}>
            {checkValue(productData?.total_all_discount_price_string)}
          </Typography>
        </div>

        <Divider
          sx={{ borderStyle: "dashed", marginY: "10px" }}
          variant="middle"
        />

        <div className={classes.deliveryDetailContainer}>
          <Typography className={classes.deliveryDetailText}>
            Grand Total
          </Typography>
          <Typography className={classes.deliveryDetailText}>
            {checkValue(productData?.total_user_price_string)}
          </Typography>
        </div>
      </Stack>
    </Grid>
  );
};

const ProductCard = ({
  detailData,
  orderType,
  isSplitedOrder,
  isDigitalProduct,
  isSubOrder,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const priceSummary = detailData?.price_summary;
  const isCheckout = orderType === "CHECKOUT";

  const digitalProductData = isCheckout
    ? detailData?.types?.[0]?.shops?.[0]?.items?.[0]?.access_code
    : detailData?.items?.[0]?.access_code;

  const checkoutShopData = isCheckout && detailData?.types?.[0]?.shops;

  const isMultipleShopCheckout =
    isCheckout && detailData?.types?.[0]?.shops?.length > 1;

  return (
    <Grid container gap={0}>
      {/* Checkout With Multiple Shop */}
      {isMultipleShopCheckout && (
        <>
          <Stack direction="column" spacing={1.2}>
            {checkoutShopData?.map((dataShop) => {
              return (
                <>
                  <Typography
                    key={dataShop.id}
                    className={classes.orderDetailShopName}
                  >
                    <StoreIcon />
                    <span className={classes.shopName}>{dataShop.name}</span>
                  </Typography>

                  <Grid
                    container
                    sx={12}
                    className={classes.productCardContainer}
                  >
                    {dataShop?.items?.map((detailItem) =>
                      renderProductItem({ product: detailItem })
                    )}
                  </Grid>

                  {isMultipleShopCheckout &&
                    DeliveryDetails({ productData: dataShop })}
                </>
              );
            })}
          </Stack>
        </>
      )}

      {isDigitalProduct && (
        <Grid container sx={12} className={classes.productCardContainer}>
          {renderProductItem({ product: {}, access_code: digitalProductData })}
        </Grid>
      )}

      {isSubOrder &&
        detailData &&
        detailData.map((product) =>
          renderProductItem({ product: {}, subOrderData: product })
        )}

      {!isDigitalProduct &&
        detailData?.sub_orders?.map((item) => {
          const orderStatus = item.status;

          return (
            <Grid
              key={item.id}
              container
              className={classes.productCardContainer}
            >
              {isSplitedOrder && (
                <Grid
                  container
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  className={classes.productCard}
                >
                  <Grid item sx={6}>
                    {STATUS.find((statusItem) =>
                      statusItem.status.includes(item.status)
                    )?.renderColoredLabel({
                      orderStatus,
                      orderType,
                      coloredLabelProps: {
                        typographyStyles: { margin: "-3px 10px" },
                      },
                    })}
                  </Grid>

                  <Grid item sx={12}>
                    <LinkText
                      sx={classes.seeProofText}
                      underline="none"
                      onClick={() =>
                        navigate(`${pathname}/sub-order/${item.sub_order_id}`)
                      }
                    >
                      See Detail
                    </LinkText>
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12}>
                {item?.delivery_order?.items?.map((detailItem) =>
                  renderProductItem({ product: detailItem })
                )}
              </Grid>
            </Grid>
          );
        })}

      {!isDigitalProduct && detailData?.items?.length === 0 && (
        <Grid item md={2.2} className={classes.grandTotalSection}>
          <Typography className={classes.titleContent}>Grand Total</Typography>
          <Typography className={classes.contentGrandTotal}>
            {priceSummary?.total_amount_string}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductCard;
