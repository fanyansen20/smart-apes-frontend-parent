// React
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";

// MUI Components
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Components
import LinkText from "../../../../../components/link";
import BundleCard from "../BundleCard";

// Styles
import classes from "../_OrderList.module.scss";

// Constants
import { STATUS, getDeliveryServiceInfo } from "../constants";

// Libs
import { paramCase } from "change-case";
import { isAfter, parseISO } from "date-fns";
import numeral from "numeral";
import { OrderActionMenu } from "../lib";

const MultipleBundlesOrder = ({
  orderData,
  bundleList,
  category,
  giveRatingAction,
  onClickCancelFormOpen,
  postCompleteOrderAction,
  onClickBundleDetails,
  openOrderDetails,
  openModalComplainOrder,
}) => {
  const {
    id,
    shop,
    status,
    status_history,
    delivery_info,
    delivery,
    price_summary,
    order_type,
    processing,
    sub_orders,
    items,
    has_review,
    verification,
    user_payment,
    shipment,
  } = orderData;
  const postCompleteOrderState = useSelector(
    (state) => state.postCompleteOrder
  );
  const [openActionMenu, setActionMenu] = useState(null);
  const [openTotalSummary, setOpenTotalSummary] = useState(null);
  const getCurrentStatus =
    (status === "PROCESSING" ? processing?.processing_status : category) ||
    status;
  const { transactionStatus, splittedOrderActionMenuList } =
    STATUS.find((item) => item.status.includes(getCurrentStatus)) || {};
  const handleClickActionMenu = (event) => {
    setActionMenu(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setActionMenu(null);
  };
  const handleClickTotalSummary = (event) => {
    setOpenTotalSummary(event.currentTarget);
  };
  const handleCloseTotalSummary = () => {
    setOpenTotalSummary(null);
  };
  const orderAgainProps = {
    href: `${process.env.REACT_APP_MARKETPLACE_URL}/${paramCase(
      shop?.name || ""
    )}/${items?.[0]?.product?.slug}?id=${items?.[0]?.product?.id}&shop_id=${
      shop?.shop_id || items?.[0]?.product?.shop_id
    }`,
    target: "_blank",
  };

  const receiverAddress =
    delivery_info?.destination.address ||
    `${delivery?.receiver?.address_detail}, ${delivery?.receiver?.country_name}, ${delivery?.receiver?.postal_code}`;

  const isExpired =
    (verification?.deadline_date &&
      isAfter(new Date(), parseISO(verification?.deadline_date))) ||
    (user_payment?.deadline_date &&
      isAfter(new Date(), parseISO(user_payment?.deadline_date)));

  const paymentUrl =
    user_payment?.hitpay?.hitpay_payment_url ||
    user_payment?.paypal?.payment_url;

  const trackingCode =
    shipment?.tracking_number ||
    sub_orders?.[0]?.delivery_order?.tracking_number;

  return (
    <Stack direction="column" spacing={1.5}>
      {/* Delivery and Total Information */}
      <Card className={classes.cardBody} variant="outlined">
        <CardContent component={Grid} container spacing={3}>
          <Grid item md={3.5}>
            <Stack direction="column">
              <Typography className={classes.titleContent}>
                Delivery Address
              </Typography>
              <Typography className={classes.bodyContent}>
                {receiverAddress}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2.5}>
            <Stack direction="column">
              <Typography className={classes.titleContent}>
                Delivery Services
              </Typography>
              <Typography className={classes.bodyContent}>
                {getDeliveryServiceInfo({
                  is_using_shop_fleet:
                    delivery_info?.is_using_shop_fleet ||
                    delivery?.senders?.[0].is_using_shop_fleet,
                  seller_fleet_name:
                    delivery?.senders?.[0]?.shop_fleet?.shop_fleet_delivery_fee
                      ?.name || delivery_info?.delivery_service_level,
                  delivery_service_name:
                    sub_orders?.[0]?.delivery_order?.delivery_type
                      ?.delivery_service?.code ||
                    delivery?.senders?.[0]?.delivery_service?.code,
                })}
                <br />
                {`Delivery Fee 
                    ${
                      delivery_info?.total_delivery_fee_string ||
                      `S${numeral(
                        delivery?.senders?.[0]?.total_delivery_fee
                      ).format("$0,0.00")}`
                    }`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3}>
            {trackingCode && (
              <Stack direction="column">
                <Typography className={classes.titleContent}>
                  Tracking Code
                </Typography>
                <Typography className={classes.bodyContent}>
                  {trackingCode}
                </Typography>
              </Stack>
            )}
          </Grid>
          <Grid item md={3} className={classes.grandTotalSection}>
            <Typography className={classes.titleContent}>
              Grand Total
            </Typography>
            <Typography className={classes.contentGrandTotal}>
              {price_summary?.total_amount_string}
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickTotalSummary}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={openTotalSummary}
                open={Boolean(openTotalSummary)}
                onClose={handleCloseTotalSummary}
                PaperProps={{
                  style: {
                    width: "26ch",
                    "& ul": {
                      padding: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    padding: 0,
                  }}
                >
                  <ListItem>
                    <Typography
                      className={classes.totalPriceHeader}
                      variant="h6"
                    >
                      Total Details
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.totalPriceItem}>
                    <Typography
                      className={classes.totalPriceLabel}
                      variant="body1"
                    >
                      Product Total
                    </Typography>
                    <Typography
                      className={classes.totalPriceValue}
                      variant="body1"
                    >
                      {price_summary?.total_item_price_string}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem className={classes.totalPriceItem}>
                    <Typography
                      className={classes.totalPriceLabel}
                      variant="body1"
                    >
                      Shipping Cost
                    </Typography>
                    <Typography
                      className={classes.totalPriceValue}
                      variant="body1"
                    >
                      {delivery_info?.total_delivery_fee_string ||
                        `S${numeral(
                          delivery?.senders?.[0]?.total_delivery_fee
                        ).format("$0,0.00")}`}
                    </Typography>
                  </ListItem>
                </List>
              </Menu>
            </Typography>
          </Grid>
        </CardContent>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Stack className={classes.footerCard} direction="row" spacing={0.5}>
              <OrderActionMenu
                orderId={id}
                orderStatus={
                  transactionStatus &&
                  transactionStatus({ order_type })?.toLowerCase()
                }
                openActionMenu={openActionMenu}
                openOrderDetails={openOrderDetails}
                handleClickActionMenu={handleClickActionMenu}
                handleCloseActionMenu={handleCloseActionMenu}
                onClickCancelFormOpen={onClickCancelFormOpen}
                menuList={[
                  {
                    label: "See Order Details",
                    onClick: () => {
                      openOrderDetails();
                      handleCloseActionMenu();
                    },
                  },
                  ...(splittedOrderActionMenuList
                    ? splittedOrderActionMenuList({
                        orderId: id,
                        order_type,
                        status_history,
                        onClickCancelFormOpen,
                        handleCloseActionMenu,
                        openModalComplainOrder,
                        isMultipleBundle: bundleList?.length > 0,
                      })
                    : []),
                ]}
              />
              {order_type === "CHECKOUT" && (
                <Button
                  sx={
                    isExpired && {
                      backgroundColor: "#D3D3D3 !important",
                    }
                  }
                  href={paymentUrl}
                  target="_blank"
                  className={classes.buttonPayNow}
                  disabled={isExpired}
                >
                  <Typography>Pay Now</Typography>
                </Button>
              )}
              {status === "ORDER_COMPLETE" && (
                <Button
                  sx={{
                    width: "8vw !important",
                  }}
                  className={classes.buttonPayNow}
                  onClick={!has_review && giveRatingAction}
                  {...(has_review ? orderAgainProps : {})}
                >
                  <Typography>
                    {has_review ? "Order Again" : "Give Ratings"}
                  </Typography>
                </Button>
              )}
              {status === "DELIVERED" && (
                <LoadingButton
                  sx={{
                    width: "11vw !important",
                    gap: "10px",
                    "& .MuiLoadingButton-loadingIndicator": {
                      position: "relative",
                      left: 0,
                    },
                  }}
                  loading={
                    postCompleteOrderState.status === "loading" &&
                    postCompleteOrderState.currentId === id
                  }
                  loadingPosition="start"
                  className={classes.buttonPayNow}
                  onClick={postCompleteOrderAction}
                >
                  <Typography>Acknowledge Order</Typography>
                </LoadingButton>
              )}
            </Stack>
            {status === "ORDER_COMPLETE" && !has_review && (
              <LinkText
                {...orderAgainProps}
                right="1.75vw"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                Order Again
              </LinkText>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Bundles List */}
      <Grid container spacing={1.2}>
        {bundleList?.map((bundle) => (
          <Grid item key={bundle?.bundle_id} md={4}>
            <BundleCard
              key={bundle?.bundle_id}
              bundleTitle={bundle?.name}
              bundleItems={bundle?.items}
              onClickBundleDetails={() => onClickBundleDetails(bundle)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default memo(MultipleBundlesOrder);
