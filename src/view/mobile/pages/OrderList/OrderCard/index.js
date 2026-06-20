// React
import React, { memo, useState } from "react";
// React Router
import { useNavigate } from "react-router-dom";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../../store/orders/orderSlice";
import {
  postCompleteOrder,
  resetStatus,
} from "../../../../../store/postCompleteOrder/postCompleteOrderSlice";

// MUI Components
import {
  Card,
  CardContent,
  Collapse,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useNotification from "../../../../../hooks/useNotification";

// scss
import classes from "../_OrderList.module.scss";

// libs
import { format, isAfter, parseISO } from "date-fns";
import { SubStatusLabel } from "../lib";

// Components
import LinkText from "../../../../../components/link";
import BundleCard from "../BundleCard";
import MultipleBundlesOrder from "../MultipleBundlesOrder";
import SplittedOrder from "../SplittedOrder";
import MultipleShopOrderCard from "./MultipleShopOrderCard";

// Styles
import { styles } from "../styles";

// Constants
import { CANCELLED_ORDER_STATUS, STATUS } from "../constants";

// Icons
import ErrorIcon from "@mui/icons-material/Error";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as AlertIcon } from "../../../../../assets/icons/alert.svg";
import { ReactComponent as StoreIcon } from "../../../../../assets/icons/store.svg";

const renderItem = (
  { qty, notes, product, bundle, access_code },
  { price_summary },
  idx,
  { onClickBundleDetails },
  {
    id,
    status,
    order_type,
    category,
    user_payment,
    cancellation,
    shops,
    isSplitedOrder,
  }
) => {
  const variantTitle = product?.active_variant_detail?.variant_combo
    ?.map((combo) => combo?.value)
    ?.join(", ");
  const productTitle =
    access_code?.title ||
    `${product?.title}${variantTitle ? ` - ${variantTitle}` : ""}`;
  const imageUrl =
    product?.active_variant_detail?.image_url ||
    product?.cover_image_url ||
    access_code?.cover_image_url;
  const priceProduct =
    product?.final_price_string || access_code?.final_price_string;

  const navigate = useNavigate();

  const orderTypeRoute = order_type === "CHECKOUT" ? "checkout" : "order";

  const isMultipleShopCheckout = shops?.length > 1;

  return (
    <Grid
      container
      className={classes.cardBody}
      justifyContent="space-between"
      onClick={() => {
        navigate(`/order-detail/${orderTypeRoute}/${id}`);
      }}
    >
      {!isMultipleShopCheckout &&
        status === "PENDING" &&
        (order_type === "CHECKOUT" || category === "PENDING") &&
        idx === 0 && (
          <>
            <Grid container className={classes.cardNotification}>
              <ErrorIcon sx={{ color: "#EA580C" }} />
              <Typography
                sx={{
                  color: "#333333",
                  fontWeight: "200",
                  fontSize: "11px",
                  lineHeight: "21px",
                }}
              >
                {(order_type === "CHECKOUT" || category === "PENDING") &&
                  (isAfter(new Date(), parseISO(user_payment?.deadline_date))
                    ? ""
                    : "Please pay before")}
              </Typography>

              {(order_type === "CHECKOUT" || category === "PENDING") && (
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "bold",
                    fontSize: "11px",
                    lineHeight: "21px",
                  }}
                >
                  {user_payment?.deadline_date &&
                    (isAfter(new Date(), parseISO(user_payment?.deadline_date))
                      ? "Expired"
                      : format(
                          parseISO(user_payment?.deadline_date),
                          "dd MMMM yyyy. HH:mm"
                        ))}
                </Typography>
              )}
            </Grid>
          </>
        )}

      {CANCELLED_ORDER_STATUS.includes(status) && cancellation && (
        <SubStatusLabel
          cancelledBy={[cancellation?.created_by, cancellation?.approved_by]}
        />
      )}

      <Grid
        item
        md={5}
        className={`${classes.productSection} ${
          idx === 0 && classes.productSectionDivider
        }`}
        gap={1}
      >
        {bundle ? (
          <BundleCard
            singleBundle
            bundleTitle={bundle?.name}
            bundleItems={bundle?.items}
            onClickBundleDetails={() => onClickBundleDetails(bundle)}
          />
        ) : (
          <>
            <Paper variant="outlined" className={classes.imageThumbnail}>
              <img src={imageUrl} width={75} alt="image product" />
            </Paper>
            <Stack direction="column" mr={1.5}>
              <Typography className={classes.titleProduct}>
                {productTitle}
              </Typography>
              <Typography className={classes.priceProduct}>
                {qty} x {priceProduct}
              </Typography>
              <Typography className={classes.noteProduct}>{notes}</Typography>
            </Stack>
          </>
        )}
      </Grid>

      {!isMultipleShopCheckout && !isSplitedOrder && idx === 0 && (
        <>
          <Grid item md={2.2} className={classes.grandTotalSection}>
            <Typography className={classes.titleContent}>
              Grand Total
            </Typography>
            <Typography className={classes.contentGrandTotal}>
              {price_summary?.total_amount_string}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

function OrderCard({
  splittedOrder,
  orderData,
  onClickBundleDetails,
  onClickTransactionDetails,
  getOrderParams,
  category,
  setCategory,
  onClickCancelFormOpen,
  giveRatingAction,
  handlerOpenModalComplainOrder,
}) {
  const {
    id,
    // ref_code,
    items,
    // verification,
    shop,
    shops,
    status,
    user_payment,
    order_type,
    // sub_status,
    cancellation,
    processing,
    delivery,
    // has_review,
    // created_at,
    // status_history,
    bundles,
    // type: productType,
  } = orderData;

  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();
  const [expandProducts, setExpandProducts] = useState(false);
  const [openTotalSummary, setOpenTotalSummary] = useState(null);

  const getCurrentStatus =
    (status === "PROCESSING" ? processing?.processing_status : category) ||
    status;
  const products = [];
  const bundleList = [];
  const open = Boolean(openTotalSummary);
  const handleClickTotalSummary = (event) => {
    setOpenTotalSummary(event.currentTarget);
  };
  const handleCloseTotalSummary = () => {
    setOpenTotalSummary(null);
  };

  const postCompleteOrderState = useSelector(
    (state) => state.postCompleteOrder
  );

  const postCompleteOrderAction = () => {
    dispatch(postCompleteOrder({ order_id: id })).then(() =>
      dispatch(getOrders(getOrderParams)).then(() => {
        setCategory("ORDER_COMPLETE");
      })
    );
  };

  if (postCompleteOrderState.status === "succeeded") {
    dispatch(resetStatus());
    sendNotification({
      msg: "Your order has been complete!",
      variant: "success",
    });
  }

  shops?.map((shop) => shop?.items?.map((item) => products.push(item))) ||
    items?.map((item) => products.push(item));

  shops?.map((shop) =>
    shop?.bundles?.map((bundle) => bundleList.push(bundle))
  ) || bundles?.map((bundle) => bundleList.push(bundle));

  const isUsingNinjavan =
    Array.isArray(delivery?.senders) &&
    (delivery?.senders[0]?.delivery_service?.is_package_split ||
      delivery?.senders[0]?.delivery_service?.company_name === "ninjavan");

  const packageCount =
    delivery?.senders[0]?.delivery_service?.package_split_count;

  const isMultipleShopCheckout = shops?.length > 1;

  return (
    <Card
      key={id}
      className={`${classes.cardContainer} ${classes.cardElevation}`}
    >
      <CardContent>
        <Grid
          sx={12}
          className={`${classes.cardHeader} ${classes.cardHeaderDivider}`}
        >
          {!isMultipleShopCheckout && (
            <>
              <Stack direction="row" alignItems="center" spacing={0.7}>
                <Typography>
                  <StoreIcon />
                  <span className={classes.cardDate}>
                    {(shops && shops[0]?.name) || shop?.name}
                  </span>
                </Typography>
              </Stack>

              <Grid>
                {STATUS.find((item) =>
                  item.status.includes(getCurrentStatus)
                )?.renderColoredLabel({
                  status,
                  order_type,
                  coloredLabelProps: {
                    typographyStyles: { margin: "-3px 0" },
                  },
                })}
              </Grid>
            </>
          )}
        </Grid>

        {splittedOrder ? (
          <SplittedOrder
            category={category}
            orderData={orderData}
            totalDetailProps={{
              open,
              handleClickTotalSummary,
              handleCloseTotalSummary,
              openTotalSummary,
            }}
            postCompleteOrderAction={postCompleteOrderAction}
            openOrderDetail={(subOrderIdx = 0) =>
              onClickTransactionDetails({
                ...orderData,
                selectedSubOrderIdx: subOrderIdx,
              })
            }
            onClickCancelFormOpen={() => onClickCancelFormOpen(orderData)}
            giveRatingAction={() => giveRatingAction(orderData)}
            openModalComplainOrder={() =>
              handlerOpenModalComplainOrder(orderData)
            }
          />
        ) : (
          <>
            {isUsingNinjavan && packageCount > 1 && (
              <Paper
                variant="outlined"
                className={classes.noteInfo}
                component={Grid}
                md={6.1}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AlertIcon />
                  <Typography className={classes.noteMsg}>
                    This order has been split into {packageCount} package
                    because using
                    <span className={classes.ninjaVanText}> NinjaVan. </span>
                    {/* <LinkText underline="none">Learn More</LinkText> */}
                  </Typography>
                </Stack>
              </Paper>
            )}

            {/* UI for Single Bundle */}
            {bundleList?.length === 1 &&
              !(isUsingNinjavan && packageCount) &&
              renderItem(
                { bundle: bundleList?.[0] },
                orderData,
                0,
                {
                  open,
                  handleClickTotalSummary,
                  handleCloseTotalSummary,
                  openTotalSummary,
                  onClickBundleDetails,
                },
                {
                  // For Item Header
                  id,
                  status,
                  order_type,
                  category,
                  user_payment,
                  cancellation,
                  isSplitedOrder: false,
                }
              )}

            {/* UI for Multiple Bundle */}
            {bundleList?.length > 1 && (
              <MultipleBundlesOrder
                category={category}
                orderData={orderData}
                bundleList={bundleList}
                postCompleteOrderAction={postCompleteOrderAction}
                openOrderDetails={(subOrderIdx = 0) =>
                  onClickTransactionDetails({
                    ...orderData,
                    selectedSubOrderIdx: subOrderIdx,
                  })
                }
                onClickBundleDetails={onClickBundleDetails}
                onClickCancelFormOpen={() => onClickCancelFormOpen(orderData)}
                giveRatingAction={() => giveRatingAction(orderData)}
                openModalComplainOrder={() =>
                  handlerOpenModalComplainOrder(orderData)
                }
                // handleCloseActionMenu={handleCloseActionMenu}
              />
            )}

            {/* UI for Order without Bundle */}
            {(!bundleList?.length || (isUsingNinjavan && packageCount)) &&
              !isMultipleShopCheckout &&
              renderItem(
                products[0],
                orderData,
                0,
                {
                  open,
                  handleClickTotalSummary,
                  handleCloseTotalSummary,
                  openTotalSummary,
                },
                {
                  // For Item Header
                  id,
                  status,
                  order_type,
                  category,
                  user_payment,
                  cancellation,
                  isSplitedOrder: products.length > 1 ? true : false,
                }
              )}

            {/* Order Card For Multiple Shop Checkout */}
            {(!bundleList?.length || (isUsingNinjavan && packageCount)) &&
              isMultipleShopCheckout && (
                <Grid container gap={2}>
                  {status === "PENDING" &&
                    (order_type === "CHECKOUT" || category === "PENDING") && (
                      <>
                        <Grid container className={classes.cardNotification}>
                          <ErrorIcon sx={{ color: "#EA580C" }} />
                          <Typography
                            sx={{
                              color: "#333333",
                              fontWeight: "200",
                              fontSize: "11px",
                              lineHeight: "21px",
                            }}
                          >
                            {(order_type === "CHECKOUT" ||
                              category === "PENDING") &&
                              (isAfter(
                                new Date(),
                                parseISO(user_payment?.deadline_date)
                              )
                                ? ""
                                : "Please pay before")}
                          </Typography>

                          {(order_type === "CHECKOUT" ||
                            category === "PENDING") && (
                            <Typography
                              sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                fontSize: "11px",
                                lineHeight: "21px",
                              }}
                            >
                              {user_payment?.deadline_date &&
                                (isAfter(
                                  new Date(),
                                  parseISO(user_payment?.deadline_date)
                                )
                                  ? "Expired"
                                  : format(
                                      parseISO(user_payment?.deadline_date),
                                      "dd MMMM yyyy. HH:mm"
                                    ))}
                            </Typography>
                          )}
                        </Grid>
                      </>
                    )}

                  {/* Render Multiple Shop Checkout Product Page */}
                  {shops?.map((shop) => (
                    <MultipleShopOrderCard
                      key={shop.id}
                      shop={shop}
                      getCurrentStatus={getCurrentStatus}
                      renderItem={renderItem}
                      // Render Item Props
                      orderData={orderData}
                      handleClickTotalSummary={handleClickTotalSummary}
                      handleCloseTotalSummary={handleCloseTotalSummary}
                      openTotalSummary={openTotalSummary}
                      order_type={order_type}
                      products={products}
                      id={id}
                      status={status}
                      category={category}
                      user_payment={user_payment}
                      cancellation={cancellation}
                      shops={shops}
                    />
                  ))}

                  <Grid item md={2.2} className={classes.grandTotalSection}>
                    <Typography className={classes.titleContent}>
                      Grand Total
                    </Typography>
                    <Typography className={classes.contentGrandTotal}>
                      {orderData?.price_summary?.total_amount_string}
                    </Typography>
                  </Grid>
                </Grid>
              )}

            {/* Order Card For SINGLE Shop Checkout */}
            {(!bundleList?.length || (isUsingNinjavan && packageCount)) &&
              !isMultipleShopCheckout &&
              products.length > 1 && (
                <>
                  <Collapse in={expandProducts}>
                    {products.map(
                      (item, idx) =>
                        idx !== 0 &&
                        renderItem(
                          item,
                          orderData,
                          idx,
                          {
                            open,
                            handleClickTotalSummary,
                            handleCloseTotalSummary,
                            openTotalSummary,
                          },
                          {
                            id,
                            status,
                            order_type,
                            category,
                            user_payment,
                            cancellation,
                            isSplitedOrder: true,
                          }
                        )
                    )}
                  </Collapse>
                  <LinkText
                    sx={styles.expandProductsText}
                    underline="none"
                    onClick={() => setExpandProducts(!expandProducts)}
                  >
                    {expandProducts
                      ? "Show Less Products "
                      : "Show More Products "}
                    {expandProducts ? (
                      <ExpandLessIcon sx={{ fontSize: "18px", mx: 1 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "18px", mx: 1 }} />
                    )}
                  </LinkText>

                  <Grid item md={2.2} className={classes.grandTotalSection}>
                    <Typography className={classes.titleContent}>
                      Grand Total
                    </Typography>
                    <Typography className={classes.contentGrandTotal}>
                      {orderData?.price_summary?.total_amount_string}
                    </Typography>
                  </Grid>
                </>
              )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(OrderCard);
